import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const darkBlue = '#1D3557';
const orange = '#F4A261';

const messages = [
    {
        id: '1',
        name: 'Agent Tawanda',
        message: '🏠 The apartment in Avondale is still available. 😊',
        time: '2h ago',
        avatar: 'https://ui-avatars.com/api/?name=Agent+Tawanda',
        unread: true,
    },
    {
        id: '2',
        name: 'Landlord Sarah',
        message: '📅 Let me know if you want to schedule a visit.',
        time: '1d ago',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Landlord',
        unread: false,
    },
];

export default function Messages() {
    const router = useRouter();

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            className="flex-row items-center px-4 py-3 border-b border-gray-200 bg-white"
            onPress={() => router.push(`/chat/${item.id}`)}
        >
            <Image
                source={{ uri: item.avatar }}
                className="w-10 h-10 rounded-full mr-3"
            />
            <View className="flex-1">
                <Text className="font-semibold text-gray-800">{item.name}</Text>
                <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500 truncate w-40">{item.message}</Text>
                    {item.unread && (
                        <View className="w-2 h-2 bg-orange-500 rounded-full ml-2" />
                    )}
                </View>
            </View>
            <Text className="text-xs text-gray-400 ml-2">{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1">
                {/* Header */}
                <View className="bg-white px-4 py-4 flex-row items-center justify-between shadow-sm">
                    <Text className="text-xl font-bold text-[darkblue]">Messages</Text>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color={orange} />
                </View>

                {/* Search */}
                <View className="px-4 py-2 bg-white">
                    <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-xl">
                        <Ionicons name="search" size={18} color="#888" />
                        <TextInput
                            placeholder="Search messages"
                            className="ml-2 flex-1 text-sm text-gray-800"
                        />
                    </View>
                </View>

                {/* Message List */}
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: 10 }}
                />
            </View>
        </SafeAreaView>
    );
}
