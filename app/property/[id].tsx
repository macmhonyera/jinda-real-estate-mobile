import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const darkBlue = '#1D3557';
const orange = '#F4A261';

const MOCK_PROPERTY = {
  id: '1',
  title: '2 Bed Apartment in Avondale',
  image: require('../../assets/images/properties/1.jpg'),
  price: '$500/month',
  location: 'Avondale, Harare',
  bedrooms: 2,
  bathrooms: 1,
  size: '90 sqm',
  amenities: ['WiFi', 'Balcony', 'Furnished'],
  description:
    'This cozy apartment in the heart of Avondale offers comfort and convenience. Located close to shops, transport, and schools.',
};

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const p = MOCK_PROPERTY;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-white shadow-sm z-10">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color={darkBlue} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-[darkblue]">Property Details</Text>
        <View style={{ width: 24 }} /> {/* Spacer to balance layout */}
      </View>

      <ScrollView>
        {/* Image */}
        <Image source={p.image} className="w-full h-64" resizeMode="cover" />

        {/* Content */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-900">{p.title}</Text>
          <Text className="text-sm text-gray-500 mt-1">{p.location}</Text>

          <View className="flex-row justify-between mt-4">
            <Text className="text-lg font-semibold text-[darkblue]">{p.price}</Text>
            <Text className="text-sm text-gray-600">{p.size}</Text>
          </View>

          {/* Rooms */}
          <View className="flex-row mt-3 space-x-4">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="bed-outline" size={18} color={darkBlue} />
              <Text className="text-gray-700 text-sm">{p.bedrooms} Beds</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Ionicons name="water-outline" size={18} color={darkBlue} />
              <Text className="text-gray-700 text-sm">{p.bathrooms} Baths</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="mt-4 text-sm text-gray-800">{p.description}</Text>

          {/* Amenities */}
          <Text className="mt-4 font-semibold text-gray-700">Amenities</Text>
          <View className="flex-row flex-wrap mt-2">
            {p.amenities.map((item, i) => (
              <View
                key={i}
                className="bg-orange-100 px-3 py-1 rounded-full mr-2 mb-2"
              >
                <Text className="text-xs text-orange-800">{item}</Text>
              </View>
            ))}
          </View>

          {/* Contact Button */}
          <TouchableOpacity
            onPress={() => router.push('/messages')}
            className="mt-6 py-3 rounded-xl items-center"
            style={{ backgroundColor: orange }}
          >
            <Text className="text-white font-semibold">Contact Agent</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
