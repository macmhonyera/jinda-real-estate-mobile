import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://192.168.100.232:4000';

/** ----- API & UI types ----- */
type ApiProperty = {
  _id: string;
  title: string;
  description?: string;
  price?: string;
  address?: string;
  imagePaths?: string[];
  amenities?: string[];
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  squareMeters?: string;
};

export type Property = {
  id: string;
  title: string;
  description?: string;
  price?: number;
  address?: string;
  imageUrls: string[];
  amenities: string[];
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
  squareMeters?: string;
};

interface PropertyForm {
  title: string;
  price: string;
  description: string;
  address: string;
  squareMeters: string;
  amenities: string[];
  imagePaths: string[]; // relative paths your API expects on create
}

/** ----- Store ----- */
interface PropertyStore {
  // Auth
  accessToken: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  loadToken: () => void;
  isTokenValid: () => boolean;

  // Form (create)
  form: PropertyForm;
  setField: (key: keyof PropertyForm, value: string | number | string[]) => void;
  resetForm: () => void;
  submitForm: () => void;

  // Listing (read)
  properties: Property[];
  loading: boolean;
  error: string | null;
  /**
   * Fetch properties. Default: only the logged-in user's properties (mineOnly = true).
   * Pass { mineOnly: false } to fetch all.
   */
  fetchProperties: (opts?: { mineOnly?: boolean }) => Promise<void>;
}

/** ----- Helpers ----- */
const toAbsoluteUrl = (p: string) => `${BASE_URL}/${p.replace(/^\/+/, '')}`;

const normalize = (a: ApiProperty): Property => ({
  id: a._id,
  title: a.title,
  description: a.description,
  price: a.price != null && a.price !== '' ? Number(a.price) : undefined,
  address: a.address,
  imageUrls: Array.isArray(a.imagePaths) ? a.imagePaths.map(toAbsoluteUrl) : [],
  amenities: Array.isArray(a.amenities) ? a.amenities : [],
  ownerId: a.ownerId,
  createdAt: a.createdAt,
  updatedAt: a.updatedAt,
  squareMeters: a.squareMeters,
});

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  /** ---- Auth ---- */
  accessToken: null,

  setToken: async (token) => {
    set({ accessToken: token });
    await AsyncStorage.setItem('access_token', token);
  },

  clearToken: async () => {
    set({ accessToken: null });
    await AsyncStorage.removeItem('access_token');
  },

  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) set({ accessToken: token });
    } catch (error) {
      console.error('Error loading token:', error);
    }
  },

  isTokenValid: () => {
    const token = get().accessToken;
    if (!token) return false;
    try {
      const decoded = jwtDecode<{ exp?: number }>(token);
      if (!decoded?.exp) return false;
      return Date.now() < decoded.exp * 1000;
    } catch {
      return false;
    }
  },

  /** ---- Form ---- */
  form: {
    title: '',
    price: '',
    description: '',
    address: '',
    squareMeters: '',
    amenities: [],
    imagePaths: [],
  },

  setField: (key, value) =>
    set((state) => ({ form: { ...state.form, [key]: value as any } })),

  resetForm: () =>
    set({
      form: {
        title: '',
        price: '',
        description: '',
        address: '',
        squareMeters: '',
        amenities: [],
        imagePaths: [],
      },
    }),

  submitForm: async () => {
    const { title, price, description, address, squareMeters, amenities, imagePaths } = get().form;
    let token = get().accessToken;

    // Pull token from storage if not in memory
    if (!token) {
      await get().loadToken();
      token = get().accessToken;
    }

    if (!token || !get().isTokenValid()) {
      console.error('Unauthorized: No valid token');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, price, description, address, squareMeters, amenities, imagePaths }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error('Property creation failed:', (result as any)?.message ?? res.statusText);
        return;
      }

      // Optional: optimistically refresh list
      try { await get().fetchProperties(); } catch {}

      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  },

  /** ---- Listing ---- */
  properties: [],
  loading: false,
  error: null,

  fetchProperties: async (opts) => {
    const mineOnly = opts?.mineOnly ?? true;
    set({ loading: true, error: null });

    try {
      let token = get().accessToken;

      // Ensure token is loaded
      if (!token) {
        await get().loadToken();
        token = get().accessToken;
      }
      if (!token || !get().isTokenValid()) {
        throw new Error('Not authenticated');
      }

      // If you want to scope by *this* user, read sub from JWT
      let url = `${BASE_URL}/properties`;
      if (mineOnly) {
        try {
          const { sub } = jwtDecode<{ sub?: string }>(token) || {};
          if (sub) {
            const qs = new URLSearchParams({ ownerId: sub });
            url = `${BASE_URL}/properties?${qs.toString()}`;
          }
        } catch {
          // if decode fails, fallback to all and let backend infer from token if it does
        }
      }

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) throw new Error('Unauthorized (401). Please log in again.');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json: ApiProperty[] | { data: ApiProperty[] } = await res.json();
      const list = Array.isArray(json) ? json : (json as any)?.data ?? [];
      const normalized = list.map(normalize);

      set({ properties: normalized, loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? 'Failed to load properties', loading: false });
    }
  },
}));
