import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const darkBlue = '#1D3457';
const orange = '#F97316';

export default function AddProperty() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [squareMeters, setSquareMeters] = useState('');
  const [amenities, setAmenities] = useState('');

  const handleSubmit = () => {
    console.log({ title, price, location, description, squareMeters, amenities });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 pt-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={24} color={darkBlue} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">Add Property</Text>
          <View className="w-6" />
        </View>

        {/* Title */}
        <Text className="text-sm text-gray-600 mb-1">Property Title</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="e.g. 2 Bed Apartment in Avondale"
          value={title}
          onChangeText={setTitle}
        />

        {/* Image Placeholder */}
        <View className="h-40 border-2 border-dashed border-gray-300 rounded-xl mb-4 items-center justify-center">
          <Ionicons name="image-outline" size={32} color={darkBlue} />
          <Text className="text-gray-500 mt-2">Tap to upload or drag image</Text>
        </View>

        {/* Price */}
        <Text className="text-sm text-gray-600 mb-1">Price</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="$ e.g. 500"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Location */}
        <Text className="text-sm text-gray-600 mb-1">Location</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="e.g. Avondale, Harare"
          value={location}
          onChangeText={setLocation}
        />

        {/* Size */}
        <Text className="text-sm text-gray-600 mb-1">Size (sqm)</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="e.g. 120"
          keyboardType="numeric"
          value={squareMeters}
          onChangeText={setSquareMeters}
        />

        {/* Description */}
        <Text className="text-sm text-gray-600 mb-1">Description</Text>
        <TextInput
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800 text-sm"
          placeholder="Brief description of the property"
          value={description}
          onChangeText={setDescription}
        />

        {/* Amenities */}
        <Text className="text-sm text-gray-600 mb-1">Amenities (comma separated)</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-800"
          placeholder="e.g. WiFi, Balcony, Furnished"
          value={amenities}
          onChangeText={setAmenities}
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-[#F97316] py-3 rounded-xl items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold">Publish Property</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
