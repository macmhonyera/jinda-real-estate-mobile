import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, FlatList,
  ActivityIndicator, TextInput, ImageSourcePropType, SafeAreaView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { usePropertyStore } from '../store/usePropertyStore'; // adjust path if needed

const darkBlue = '#1D3457';
const orange = '#F97316';

const taglines = [
  { title: 'Your next home is just a tap away', subtitle: 'Find cozy apartments, prime locations, great prices' },
  { title: 'Move in without the hassle', subtitle: 'Rent smarter, live better, right from your phone' },
  { title: 'Find a space that fits your life', subtitle: 'Discover apartments tailored to your lifestyle' },
  { title: 'Feel at home, anywhere', subtitle: 'Your dream apartment is waiting for you' },
  { title: 'Rent easy. Live freely.', subtitle: 'Explore listings, find comfort, love where you live' },
];
const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];

type UIProperty = {
  id: string;
  title: string;
  image: ImageSourcePropType; // we’ll supply { uri: ... }
  price?: string;
  location?: string;
  isLiked: boolean;
  size?: string;
  amenities: string[];
};

const currency = (n?: number) => (typeof n === 'number' ? `$${n.toLocaleString()}` : undefined);
const PLACEHOLDER = 'https://placehold.co/640x360?text=No+Image';

export default function Home() {
  const router = useRouter();
  const { name, photo } = useLocalSearchParams();
  const displayName = Array.isArray(name) ? name[0] : name || 'Guest';
  const displayPhoto = Array.isArray(photo) ? photo[0] : photo;

  // Pull from Zustand store
  const { properties: apiProps, loading, error, fetchProperties } = usePropertyStore();

  // Local liked-state (by id) so we don’t mutate store data
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // default: fetch current user's properties (as your store is set up)
    fetchProperties();
  }, [fetchProperties]);

  // ---- Helpers to map API → UI ----
  const toUI = (p: typeof apiProps[number]): UIProperty => ({
    id: p.id,
    title: p.title ?? 'Untitled property',
    // ✅ only one image: the first image url (fallback to placeholder)
    image: { uri: p.imageUrls?.[0] ?? PLACEHOLDER },
    price: currency(p.price),
    location: p.address,
    isLiked: !!liked[p.id],
    // size: p.squareMeters ? `${p.squareMeters} sqm` : undefined,
    amenities: p.amenities ?? [],
  });

  const byDateDesc = (a: typeof apiProps[number], b: typeof apiProps[number]) => {
    const da = new Date(a.createdAt ?? a.updatedAt ?? 0).getTime();
    const db = new Date(b.createdAt ?? b.updatedAt ?? 0).getTime();
    return db - da; // newest first
  };

  // ---- Featured & Recents ----
  // Featured rule: items that have at least one image (tweak as needed) and take top 10
  const featured: UIProperty[] = useMemo(() => {
    return apiProps
      .filter(p => (p.imageUrls?.length ?? 0) > 0)
      .slice(0, 10)
      .map(toUI);
  }, [apiProps, liked]);

  // Recently Added: sort by createdAt/updatedAt desc and take top 20
  const recents: UIProperty[] = useMemo(() => {
    return [...apiProps]
      .sort(byDateDesc)
      .slice(0, 20)
      .map(toUI);
  }, [apiProps, liked]);

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderPropertyCard = ({ item }: { item: UIProperty }) => (
    <Animated.View entering={FadeInLeft.duration(500)}>
      <TouchableOpacity
        className="w-64 mr-4 bg-white rounded-xl overflow-hidden shadow-md"
        onPress={() => router.push(`/property/${item.id}`)}
      >
        <Image source={item.image} className="w-full h-32" />
        <TouchableOpacity className="absolute top-2 right-2" onPress={() => toggleLike(item.id)}>
          <Ionicons name={item.isLiked ? 'heart' : 'heart-outline'} size={24} color={orange} />
        </TouchableOpacity>
        <View className="p-3">
          <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
          {item.price ? <Text className="text-sm text-gray-600">{item.price}</Text> : null}
          {/* <Text className="text-xs text-gray-500">
            {item.size ?? '—'} • {item.bedrooms ?? '—'} Bed • {item.bathrooms ?? '—'} Bath
          </Text> */}
          {item.location ? <Text className="text-xs text-gray-400">{item.location}</Text> : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: darkBlue }}>
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row justify-between items-center mt-6 mb-4 px-4">
            <View className="flex-row items-center">
              <Image
                source={{ uri: displayPhoto || 'https://ui-avatars.com/api/?name=Guest' }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <View>
                <Text className="text-white text-sm">Good Morning</Text>
                <Text className="text-white font-bold text-base">{displayName}</Text>
              </View>
            </View>
            <TouchableOpacity><Ionicons name="notifications-outline" size={24} color="white" /></TouchableOpacity>
          </View>

          {/* Tagline */}
          <Animated.View entering={FadeInDown.duration(600)} className="mt-4 px-4 mb-6">
            <Text className="text-3xl font-bold text-white">{randomTagline.title}</Text>
            <Text className="text-md text-orange-600 mt-1">{randomTagline.subtitle}</Text>
          </Animated.View>

          {/* Search */}
          <Animated.View entering={FadeInDown.delay(200).duration(500)} className="flex-row items-center bg-white rounded-xl px-4 py-2 mb-4 shadow-md mx-4">
            <Ionicons name="search-outline" size={20} color="#999" />
            <TextInput className="ml-2 flex-1 text-gray-800" placeholder="Search by location..." />
            <TouchableOpacity><Ionicons name="options-outline" size={20} color={darkBlue} /></TouchableOpacity>
          </Animated.View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 px-4" contentContainerStyle={{ paddingVertical: 4 }}>
            {['All', 'Apartment', 'Studio', 'Cottage'].map((cat, i) => (
              <Animated.View entering={FadeInRight.delay(i * 100).duration(400)} key={i} className="mr-3">
                <TouchableOpacity className="bg-orange-100 px-4 h-9 rounded-full justify-center items-center">
                  <Text className="text-orange-800 text-sm font-medium">{cat}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>

          {/* Featured */}
          <View className="px-4">
            <Text className="text-lg text-white font-semibold mb-3">Featured</Text>
            {loading ? (
              <ActivityIndicator size="large" color={orange} />
            ) : error ? (
              <Text className="text-orange-200">Failed to load: {error}</Text>
            ) : (
              <FlatList
                data={featured}
                renderItem={renderPropertyCard}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<Text className="text-orange-200">No featured properties yet.</Text>}
              />
            )}
          </View>

          {/* Recently Added */}
          <View className="px-4 mt-6">
            <Text className="text-lg text-white font-semibold mb-3">Recently Added</Text>
            {loading ? (
              <ActivityIndicator size="large" color={orange} />
            ) : error ? (
              <Text className="text-orange-200">Failed to load: {error}</Text>
            ) : recents.length === 0 ? (
              <Text className="text-orange-200">No recent properties yet.</Text>
            ) : (
              recents.map((p, idx) => (
                <Animated.View key={p.id} entering={FadeInDown.delay(idx * 100).duration(400)}>
                  <TouchableOpacity
                    className="mb-4 bg-white rounded-xl overflow-hidden shadow-md"
                    onPress={() => router.push(`/property/${p.id}`)}
                  >
                    <Image source={p.image} className="w-full h-44" />
                    <View className="p-4">
                      <View className="flex-row justify-between items-start">
                        <View className="flex-1 pr-3">
                          <Text className="text-base font-semibold text-gray-800">{p.title}</Text>
                          {p.price ? <Text className="text-sm text-gray-700">{p.price}</Text> : null}
                          {p.location ? <Text className="text-xs text-gray-400">{p.location}</Text> : null}
                        </View>
                        <TouchableOpacity onPress={() => toggleLike(p.id)}>
                          <Ionicons name={p.isLiked ? 'heart' : 'heart-outline'} size={20} color={orange} />
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row flex-wrap mt-2">
                        {p.amenities.map((a, i) => (
                          <View key={i} className="bg-orange-100 px-2 py-1 mr-2 mb-2 rounded-full">
                            <Text className="text-xs text-orange-700">{a}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))
            )}
          </View>
        </ScrollView>

        {/* Add Property */}
        <TouchableOpacity
          onPress={() => router.push('/landlord/add-property')}
          className="absolute bottom-14 right-3 bg-[orange] w-14 h-14 rounded-full items-center justify-center shadow-lg z-50"
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
