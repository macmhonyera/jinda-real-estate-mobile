import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    TextInput,
    ImageSourcePropType,
    SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';

const darkBlue = '#1D3457';
const orange = '#F97316';

const taglines = [
    {
        title: 'Your next home is just a tap away',
        subtitle: 'Find cozy apartments, prime locations, great prices',
    },
    {
        title: 'Move in without the hassle',
        subtitle: 'Rent smarter, live better, right from your phone',
    },
    {
        title: 'Find a space that fits your life',
        subtitle: 'Discover apartments tailored to your lifestyle',
    },
    {
        title: 'Feel at home, anywhere',
        subtitle: 'Your dream apartment is waiting for you',
    },
    {
        title: 'Rent easy. Live freely.',
        subtitle: 'Explore listings, find comfort, love where you live',
    },
];

const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];

type Property = {
    id: string;
    title: string;
    image: ImageSourcePropType;
    price: string;
    location: string;
    isLiked: boolean;
    bedrooms: number;
    bathrooms: number;
    size: string;
    amenities: string[];
};

const MOCK_PROPERTIES: Property[] = [
    {
        id: '1',
        title: '2 Bed Apartment in Avondale',
        image: require('../../assets/images/properties/1.jpg'),
        price: '$500/month',
        location: 'Avondale, Harare',
        isLiked: false,
        bedrooms: 2,
        bathrooms: 1,
        size: '90 sqm',
        amenities: ['WiFi', 'Balcony', 'Furnished'],
    },
    {
        id: '2',
        title: 'Modern Studio in CBD',
        image: require('../../assets/images/properties/2.jpg'),
        price: '$300/month',
        location: 'CBD, Harare',
        isLiked: false,
        bedrooms: 1,
        bathrooms: 1,
        size: '40 sqm',
        amenities: ['Air Conditioning', 'WiFi'],
    },
    {
        id: '3',
        title: '3 Bedroom House in Borrowdale',
        image: require('../../assets/images/properties/3.jpg'),
        price: '$800/month',
        location: 'Borrowdale, Harare',
        isLiked: false,
        bedrooms: 3,
        bathrooms: 2,
        size: '120 sqm',
        amenities: ['WiFi', 'Generator', 'Garden'],
    },
];

export default function Home() {
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setProperties(MOCK_PROPERTIES);
            setLoading(false);
        }, 1000);
    }, []);

    const toggleLike = (id: string) => {
        setProperties((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked } : p))
        );
    };

    const renderPropertyCard = ({ item }: { item: Property }) => (
        <Animated.View entering={FadeInLeft.duration(500)}>
            <TouchableOpacity
                className="w-64 mr-4 bg-white rounded-xl overflow-hidden shadow-md"
                onPress={() => router.push(`/property/${item.id}`)}
            >
                <Image source={item.image} className="w-full h-32" />
                <TouchableOpacity
                    className="absolute top-2 right-2"
                    onPress={() => toggleLike(item.id)}
                >
                    <Ionicons
                        name={item.isLiked ? 'heart' : 'heart-outline'}
                        size={24}
                        color={orange}
                    />
                </TouchableOpacity>
                <View className="p-3">
                    <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
                    <Text className="text-sm text-gray-600">{item.price}</Text>
                    <Text className="text-xs text-gray-500">
                        {item.size} • {item.bedrooms} Bed • {item.bathrooms} Bath
                    </Text>
                    <Text className="text-xs text-gray-400">{item.location}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: darkBlue }}>
            <View className="flex-1">
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profile Header */}
                    <View className="flex-row justify-between items-center mt-6 mb-4 px-4">
                        <View className="flex-row items-center">
                            <Image
                                source={{
                                    uri: 'https://ui-avatars.com/api/?name=Macmillan+Mhonyera',
                                }}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <View>
                                <Text className="text-white text-sm">Good Morning</Text>
                                <Text className="text-white font-bold text-base">
                                    Macmillan Mhonyera
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Tagline */}
                    <Animated.View
                        entering={FadeInDown.duration(600)}
                        className="mt-4 px-4 mb-6"
                    >
                        <Text className="text-3xl font-bold text-white">
                            {randomTagline.title}
                        </Text>
                        <Text className="text-md text-orange-600 mt-1">
                            {randomTagline.subtitle}
                        </Text>
                    </Animated.View>

                    {/* Search Bar */}
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(500)}
                        className="flex-row items-center bg-white rounded-xl px-4 py-2 mb-4 shadow-md mx-4"
                    >
                        <Ionicons name="search-outline" size={20} color="#999" />
                        <TextInput
                            className="ml-2 flex-1 text-gray-800"
                            placeholder="Search by location..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity>
                            <Ionicons name="options-outline" size={20} color={darkBlue} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Category Filter */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-6 px-4"
                        contentContainerStyle={{ paddingVertical: 4 }}
                    >
                        {['All', 'Apartment', 'Studio', 'Cottage'].map((cat, i) => (
                            <Animated.View
                                entering={FadeInRight.delay(i * 100).duration(400)}
                                key={i}
                                className="mr-3"
                            >
                                <TouchableOpacity className="bg-orange-100 px-4 h-9 rounded-full justify-center items-center">
                                    <Text className="text-orange-800 text-sm font-medium">{cat}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </ScrollView>

                    {/* Featured */}
                    <View className="px-4">
                        <Text className="text-lg text-darkBlue font-semibold mb-3">Featured</Text>
                        {loading ? (
                            <ActivityIndicator size="large" color={orange} />
                        ) : (
                            <FlatList
                                data={properties}
                                renderItem={renderPropertyCard}
                                horizontal
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        )}
                    </View>

                    {/* Recently Added */}
                    <View className="px-4 mt-6">
                        <Text className="text-lg text-darkBlue font-semibold mb-3">
                            Recently Added
                        </Text>
                        {loading ? (
                            <ActivityIndicator size="large" color={orange} />
                        ) : (
                            properties.map((p, idx) => (
                                <Animated.View
                                    key={p.id}
                                    entering={FadeInDown.delay(idx * 100).duration(400)}
                                >
                                    <TouchableOpacity
                                        className="mb-4 bg-white rounded-xl overflow-hidden shadow-md"
                                        onPress={() => router.push(`/property/${p.id}`)}
                                    >
                                        <Image source={p.image} className="w-full h-44" />
                                        <View className="p-4">
                                            <View className="flex-row justify-between items-start">
                                                <View className="flex-1 pr-3">
                                                    <Text className="text-base font-semibold text-gray-800">
                                                        {p.title}
                                                    </Text>
                                                    <Text className="text-sm text-gray-700">{p.price}</Text>
                                                    <Text className="text-xs text-gray-500">
                                                        {p.size} • {p.bedrooms} Bed • {p.bathrooms} Bath
                                                    </Text>
                                                    <Text className="text-xs text-gray-400">{p.location}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => toggleLike(p.id)}>
                                                    <Ionicons
                                                        name={p.isLiked ? 'heart' : 'heart-outline'}
                                                        size={20}
                                                        color={orange}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View className="flex-row flex-wrap mt-2">
                                                {p.amenities.map((a, idx) => (
                                                    <View
                                                        key={idx}
                                                        className="bg-orange-100 px-2 py-1 mr-2 mb-2 rounded-full"
                                                    >
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

                {/* Floating Add Button */}
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