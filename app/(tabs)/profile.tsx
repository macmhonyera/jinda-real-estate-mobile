import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const darkBlue = '#1D3557';
const orange = '#F4A261';

const profileOptions = [
  { icon: 'person-outline' as const, label: 'My Account' },
  { icon: 'home-outline' as const, label: 'My Listings' },
  { icon: 'heart-outline' as const, label: 'Saved Properties' },
  { icon: 'notifications-outline' as const, label: 'Notifications' },
  { icon: 'settings-outline' as const, label: 'Settings' },
];

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-[#1D3557]">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-white'>
        {/* Header */}
        <View className="bg-[#1D3557] px-6 py-8 rounded-b-3xl">
          <View className="items-center">
            <Image
              source={{ uri: 'https://ui-avatars.com/api/?name=Macmillan+Mhonyera&size=256' }}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <Text className="text-white text-xl font-bold mt-3">Macmillan Mhonyera</Text>
            <Text className="text-orange-300 text-sm">macmillan@example.com</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View className="mt-6 px-4">
          {profileOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between py-4 border-b border-gray-200"
            >
              <View className="flex-row items-center">
                <Ionicons name={item.icon} size={22} color={darkBlue} style={{ marginRight: 16 }} />
                <Text className="text-base text-gray-800">{item.label}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity className="mt-8 mx-4 py-3 bg-orange-500 rounded-xl items-center">
          <Text className="text-white font-semibold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
