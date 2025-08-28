import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

interface PropertyForm {
  title: string;
  price: string;
  description: string;
  address: string;
  squareMeters: string;
  amenities: string[];
  imagePaths: string[];
}

interface PropertyStore {
  form: PropertyForm;
  accessToken: string | null;
  setField: (key: keyof PropertyForm, value: string | number | string[]) => void;
  resetForm: () => void;
  setToken: (token: string) => void;
  submitForm: () => void;
  clearToken: () => void;
  loadToken: () => void;
  isTokenValid: () => boolean;  // Check token validity
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  form: {
    title: '',
    price: '',
    description: '',
    address: '',
    squareMeters: '',
    amenities: [],
    imagePaths: [],
  },
  accessToken: null,

  setField: (key, value) => {
    set((state) => ({
      form: { ...state.form, [key]: value },
    }));
  },

  resetForm: () => {
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
    });
  },

  setToken: async (token) => {
    console.log("Setting token:", token); // Debugging log
    set({ accessToken: token });
    await AsyncStorage.setItem('access_token', token);  // Store token in AsyncStorage
    console.log("Token saved in AsyncStorage successfully!"); // Debugging log
  },

  clearToken: async () => {
    set({ accessToken: null });
    await AsyncStorage.removeItem('access_token');
    console.log("Token cleared from AsyncStorage.");  // Debugging log
  },

  // Load the token from AsyncStorage
  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');  // Load token from AsyncStorage
      console.log("Loaded token from AsyncStorage:", token);  // Debugging log
      if (token) {
        set({ accessToken: token });  // Set the token in Zustand store
      }
    } catch (error) {
      console.error("Error loading token:", error);  // Debugging log
    }
  },

  // Check if the token is expired
  isTokenValid: () => {
    const token = get().accessToken;
    console.log("Checking token validity:", token);  // Debugging log
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<any>(token);
      const expirationTime = decodedToken.exp * 1000;  // JWT expiration time is in seconds, convert to ms
      const currentTime = Date.now();
      console.log("Token expiration time:", expirationTime);  // Debugging log
      console.log("Current time:", currentTime);  // Debugging log
      return currentTime < expirationTime;  // Return true if the token is not expired
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  },

  submitForm: async () => {
    const { title, price, description, address, squareMeters, amenities, imagePaths } = get().form;
    const token = get().accessToken;

    console.log("Submitting form with token:", token);  // Debugging log

    // Check if the token is valid
    if (!token || !get().isTokenValid()) {
      console.error('Unauthorized: No valid token');
      return;
    }

    try {
      const response = await fetch('http://192.168.122.1:4000/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          price,
          description,
          address,
          squareMeters,
          amenities,
          imagePaths,
        }),
      });
      const result = await response.json();
      console.log('Property created:', result);

      if (response.ok) {
        router.replace('/(tabs)/home'); // Redirect to home if successful
      } else {
        console.error('Property creation failed:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  },
}));
