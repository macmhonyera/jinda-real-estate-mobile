import { Stack } from "expo-router";
import '../global.css';
import { useEffect } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { usePropertyStore } from './store/useAddProperty'

export default function RootLayout() {

 
  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      iosClientId: '464974124819-ltm8cbsp7k44ga0ei4q07tmp9s9rpl9c.apps.googleusercontent.com',
      webClientId: '464974124819-brppfbomc1mthopjt9drbbpmr918r9r6.apps.googleusercontent.com',
      profileImageSize: 150,
    });

  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
