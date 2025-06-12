import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";


export default function Index() {

  const router = useRouter();


  const handleGetStarted = () => {
    // Navigate to the sign-in page
    router.push("/signin");
  };

  return (
  <SafeAreaView className="flex-1 bg-white">
      {/* Background Image with overlay */}
      <ImageBackground
        source={require("../assets/images/modern.jpg")} // your hero image here
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        {/* Overlay section */}
        <View className="bg-white rounded-t-3xl px-6 py-10 items-center">
          {/* Logo inside box */}
            {/* <Image
              source={require("../assets/images/icon.png")}
              className="w-24 h-24"
              resizeMode="contain"
            /> */}

          {/* Brand name */}
          <Text className="text-4xl font-bold text-[#1E3A8A]">Easy Rent</Text>

          {/* Tagline */}
          <Text className="text-gray-600 text-center text-2xl mt-2">
            Find and rent your dream space in minutes
          </Text>

          {/* Get Started button */}
          <TouchableOpacity className="mt-6 bg-[#F97316] px-10 py-4 rounded-full" onPress={handleGetStarted}>
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
