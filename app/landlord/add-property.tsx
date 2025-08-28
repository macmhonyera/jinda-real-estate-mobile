import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { usePropertyStore } from '../store/useAddProperty'; // Zustand store

const darkBlue = '#1D3457';
const orange = '#F97316';

export default function AddProperty() {
  const router = useRouter();
  const { form, setField, submitForm, resetForm } = usePropertyStore((state) => state);

  const [image, setImage] = useState<string | null>(null); // Store the selected image URI

  const handleSubmit = () => {
    submitForm(); // Trigger form submission through Zustand store
  };

  const pickImageAsync = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant access to the media library to upload an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);
        setField('imagePaths', [imageUri]);
      } else {
      alert("You didi not select any image")
    }
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
          value={form.title}
          onChangeText={(text) => setField('title', text)}
        />

        {/* Image Picker */}
        <TouchableOpacity onPress={pickImageAsync}>
          <View className="h-40 border-2 border-dashed border-gray-300 rounded-xl mb-4 items-center justify-center">
            {image ? (
              <Image
                source={{ uri: image }} // Display selected image
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
              />
            ) : (
              <>
                <Ionicons name="image-outline" size={32} color={darkBlue} />
                <Text className="text-gray-500 mt-2">Tap to upload or drag image</Text>
              </>
            )}
          </View>
        </TouchableOpacity>

        {/* Price */}
        <Text className="text-sm text-gray-600 mb-1">Price</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="$ e.g. 500"
          keyboardType="numeric"
          value={form.price.toString()}
          onChangeText={(text) => setField('price', text)}
        />

        {/* Location */}
        <Text className="text-sm text-gray-600 mb-1">Location</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="e.g. Avondale, Harare"
          value={form.address}
          onChangeText={(text) => setField('address', text)}
        />

        {/* Size */}
        <Text className="text-sm text-gray-600 mb-1">Size (sqm)</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="e.g. 120"
          keyboardType="numeric"
          value={form.squareMeters.toString()}
          onChangeText={(text) => setField('squareMeters', text)}
        />

        {/* Description */}
        <Text className="text-sm text-gray-600 mb-1">Description</Text>
        <TextInput
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800 text-sm"
          placeholder="Brief description of the property"
          value={form.description}
          onChangeText={(text) => setField('description', text)}
        />

        {/* Amenities */}
        <Text className="text-sm text-gray-600 mb-1">Amenities (comma separated)</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-800"
          placeholder="e.g. WiFi, Balcony, Furnished"
          value={form.amenities ? form.amenities.join(', ') : ''}  // Handle empty or undefined amenities safely
          onChangeText={(text) => setField('amenities', text.split(',').map(item => item.trim()))}  // Split and trim input
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
