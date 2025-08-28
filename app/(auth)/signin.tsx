/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignInStore } from "../store/useSignInStore"; // Update path as needed
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';



export default function SignInPage() {
  const router = useRouter();
  const { loginForm, setLoginField, login } = useSignInStore();

const handleGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();

    console.log('Google Sign-In successful:', result);

    const { idToken, user } = result.data;
    const { name, email, photo } = user;

    // Optional: save to Zustand or AsyncStorage
    // setUser({ name, email, photo });

    // Navigate to home screen
    router.replace({
      pathname: '/(tabs)/home',
      params: {
        name,
        email,
        photo,
      },
    });

  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.warn('Sign-in cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.warn('Sign-in in progress');
    } else {
      console.error('Google Sign-In error:', error);
    }
  }
};



  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/sky.jpg")}
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-black/50 px-6 pt-10">
        <View className="items-center mb-8">
          <Image
            source={require("../../assets/images/icons.png")}
            className="w-90 h-60"
            resizeMode="contain"
          />
        </View>

        <View className="items-center px-4">
          <View className="w-full max-w-md">
            <View className="flex-row items-center bg-gray-200 px-4 py-3 rounded-xl mb-8">
              <FontAwesome name="envelope" size={30} color="#9CA3AF" />
              <TextInput
                placeholder="Email Address"
                value={loginForm.email}
                onChangeText={(text) => setLoginField('email', text)}
                className="flex-1 text-gray-800 ml-2"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="flex-row items-center bg-gray-200 px-4 py-3 rounded-xl mb-4">
              <MaterialIcons name="lock-outline" size={30} color="#9CA3AF" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={loginForm.password}
                onChangeText={(text) => setLoginField('password', text)}
                className="flex-1 text-gray-800 ml-2"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity className="mb-4 self-end">
              <Text className="text-sm text-[#F97316] font-medium">Forget password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#F97316] px-10 py-4 rounded-xl"
              onPress={() => login(router)}
            >
              <Text className="text-white text-center font-bold text-lg">Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-center px-4 my-6 w-full max-w-md self-center">
          <View className="flex-1 h-px bg-white/40" />
          <Text className="mx-4 text-white/70 font-medium">Or continue with</Text>
          <View className="flex-1 h-px bg-white/40" />
        </View>

        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity className="flex-row items-center px-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm" onPress={handleGoogleSignIn}>
            <FontAwesome name="google" size={20} color="#EA4335" />
            <Text className="ml-2 text-gray-700">Sign In With Google</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-200">Haven’t any account?</Text>
          <TouchableOpacity onPress={handleSignUp} className="ml-1">
            <Text className="text-[#F97316] font-bold ml-1">Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
