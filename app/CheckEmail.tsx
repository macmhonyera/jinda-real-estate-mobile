import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function CheckEmail() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Text className="text-3xl font-bold text-center text-[#1E3A8A] mb-4">Verify Your Email</Text>

      <Text className="text-center text-gray-700 mb-8">
        We&apos;ve sent a verification link to your email. Please click the link to verify your account before logging in.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace('/(auth)/signin')}
        className="bg-[#F97316] px-6 py-3 rounded-xl"
      >
        <Text className="text-white text-lg font-semibold">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
