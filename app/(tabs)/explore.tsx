import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Explore() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const properties = [
    {
      id: '1',
      title: 'Cozy 1 Bedroom in CBD',
      location: 'CBD, Harare',
      price: '$400/month',
      image: require('../../assets/images/properties/1.jpg'),
      category: 'Apartment',
    },
    {
      id: '2',
      title: '2 Bed Apartment in Avondale',
      location: 'Avondale, Harare',
      price: '$550/month',
      image: require('../../assets/images/properties/2.jpg'),
      category: 'Cottage',
    },
  ];

  const categories = ['All', 'Apartment', 'Studio', 'Cottage'];

  // Optionally filter properties by category
  const filteredProperties =
    selectedCategory === 'All'
      ? properties
      : properties.filter(p => p.category === selectedCategory);

  return (
    <SafeAreaView className="flex-1 bg-[#1D3557]">
      <ScrollView className="pt-12 px-4 bg-white">
        <Text className="text-xl font-bold mb-4">🔍 Explore Listings</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-4">
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            className="ml-2 flex-1 text-gray-800"
            placeholder="Search by location..."
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {categories.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(cat)}
                className={`px-4 py-2 mr-3 rounded-full ${
                  isActive
                    ? 'bg-[#F4A261]'
                    : 'bg-gray-200'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isActive ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Listings */}
        {filteredProperties.map((p) => (
          <TouchableOpacity
            key={p.id}
            className="mb-4 bg-gray-50 rounded-xl overflow-hidden"
            onPress={() => router.push('/explore')}
          >
            <Image source={p.image} className="w-full h-40" />
            <View className="p-4">
              <Text className="text-base font-semibold">{p.title}</Text>
              <Text className="text-sm text-gray-600">{p.location}</Text>
              <Text className="text-sm text-gray-800 mt-1">{p.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
