import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const response = await fetch('http://192.168.100.231:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log('Login response:', result);
      if (result.access_token) {
        await AsyncStorage.setItem('token', result.access_token);
        set({ accessToken: result.access_token });
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
