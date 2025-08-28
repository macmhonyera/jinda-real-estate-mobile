import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { usePropertyStore } from '../store/useAddProperty'; // Import usePropertyStore

interface LoginForm {
  email: string;
  password: string;
}

interface AuthStore {
  loginForm: LoginForm;
  accessToken: string | null;
  setLoginField: (key: keyof LoginForm, value: string) => void;
  resetLoginForm: () => void;
  login: (router: any) => Promise<void>;
}

export const useSignInStore = create<AuthStore>((set, get) => ({
  loginForm: {
    email: '',
    password: '',
  },
  accessToken: null,

  setLoginField: (key, value) => {
    set((state) => ({
      loginForm: { ...state.loginForm, [key]: value },
    }));
  },

  resetLoginForm: () => {
    set({ loginForm: { email: '', password: '' } });
  },

  login: async (router) => {
    const form = get().loginForm;

    try {
      const response = await fetch('http://192.168.122.1:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log('Login response:', result);

      if (result.access_token) {
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('access_token', result.access_token);
        // Set the token in Zustand
        set({ accessToken: result.access_token });
        
        // Load the token into Zustand after login
        usePropertyStore.getState().loadToken();  // Calling loadToken from usePropertyStore

        // Reset login form and navigate to home
        get().resetLoginForm();
        router.replace('/(tabs)/home');
      } else {
        console.warn('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  },
}));
