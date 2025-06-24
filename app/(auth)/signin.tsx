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


export default function SignInPage() {

  const router = useRouter();
  
  
    const handleSignUp = () => {
      // Navigate to the sign-in page
      router.push("/signup");
    };

  return (

    <ImageBackground
      source={require("../../assets/images/sky.jpg")} // use a house/city themed image
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-black/50 px-6 pt-10">
        {/* Logo */}
        <View className="items-center mb-8">
          <Image
            source={require("../../assets/images/icons.png")}
            className="w-90 h-60"
            resizeMode="contain"
          />
        </View>

        {/* Header */}

        {/* Form */}
        <View className="items-center px-4">
          <View className="w-full max-w-md">
            {/* Username */}
            <View className="flex-row items-center bg-gray-200 px-4 py-3 rounded-xl mb-8">
              <FontAwesome name="envelope" size={30} color="#9CA3AF" className="mr-2" />
              <TextInput
                placeholder="Email Address"
                className="flex-1 text-gray-800"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Password */}
            <View className="flex-row items-center bg-gray-200 px-4 py-3 rounded-xl mb-4">
              <MaterialIcons name="lock-outline" size={30} color="#9CA3AF" className="mr-2" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="flex-1 text-gray-800"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="mb-4 self-end">
              <Text className="text-sm text-[#F97316] font-medium">Forget password</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity className="bg-[#F97316] px-10 py-4 rounded-xl" onPress={() => router.push("/home")}>
              <Text className="flex items-center text-center text-white font-bold text-lg">Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Or Divider */}
        <View className="flex-row items-center justify-center px-4 my-6 w-full max-w-md self-center">
          <View className="flex-1 h-px bg-white/40" />
          <Text className="mx-4 text-white/70 font-medium">Or continue with</Text>
          <View className="flex-1 h-px bg-white/40" />
        </View>


        {/* Social Logins */}
        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity className="flex-row items-center px-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm">
            <FontAwesome name="google" size={20} color="#EA4335" />
            <Text className="ml-2 text-gray-700">Google</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
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
