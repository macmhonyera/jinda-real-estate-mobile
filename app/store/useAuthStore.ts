import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

type Role = 'tenant' | 'landlord';

interface SignupForm {
  email: string;
  password: string;
  role: Role;
  fullName: string;
  phone: string;
  nationalId: string;
  address: string;
  city: string;
}

interface JwtPayload {
  isEmailVerified?: boolean;
  [key: string]: any;
}

interface AuthStore {
  form: SignupForm;
  accessToken: string | null;
  isEmailVerified: boolean;
  setField: (key: keyof SignupForm, value: string) => void;
  resetForm: () => void;
  setToken: (token: string) => void;
  submitForm: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  form: {
    email: '',
    password: '',
    role: 'tenant',
    fullName: '',
    phone: '',
    nationalId: '',
    address: '',
    city: '',
  },
  accessToken: null,
  isEmailVerified: false,

  setField: (key, value) => {
    set((state) => ({
      form: { ...state.form, [key]: value },
    }));
  },

  resetForm: () => {
    set({
      form: {
        email: '',
        password: '',
        role: 'tenant',
        fullName: '',
        phone: '',
        nationalId: '',
        address: '',
        city: '',
      },
    });
  },

  setToken: (token) => {
    set({ accessToken: token });
    AsyncStorage.setItem('token', token);
  },

  submitForm: async () => {
    const form = get().form;
    try {
      const response = await fetch('http://192.168.100.231:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log('User created:', result);

      if (result.access_token) {
        get().setToken(result.access_token);

        const decoded: JwtPayload = jwtDecode(result.access_token);
        const isVerified = decoded?.isEmailVerified ?? false;

        set({ isEmailVerified: isVerified });

        if (isVerified) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/CheckEmail');
        }
      } else if (result.message?.includes('check your email')) {
        router.replace('/CheckEmail');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  },
}));
