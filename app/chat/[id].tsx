import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const darkBlue = '#1D3557';
const orange = '#F4A261';

const initialMessages = [
  {
    id: '1',
    from: 'agent',
    text: '🏠 The apartment in Avondale is still available.',
  },
  {
    id: '2',
    from: 'user',
    text: 'Great! Can I come for a viewing tomorrow? 😊',
  },
  {
    id: '3',
    from: 'agent',
    text: `📅 Yes, 10AM works. I'll be waiting at the gate.`,
  },
];

export default function ChatThread() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), from: 'user', text: input.trim() },
      ]);
      setInput('');
    }
  };

  const renderItem = ({ item }: any) => (
    <View className={`my-2 px-4 flex ${item.from === 'user' ? 'items-end' : 'items-start'}`}>
      <View className={`px-4 py-2 rounded-xl max-w-[80%] ${item.from === 'user' ? 'bg-orange-100' : 'bg-white'}`}>
        <Text className="text-gray-800 text-sm">{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 bg-white shadow-sm justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={darkBlue} />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Image
              source={{ uri: `https://ui-avatars.com/api/?name=Agent+${id}` }}
              className="w-8 h-8 rounded-full mr-2"
            />
            <Text className="font-semibold text-gray-800">Agent {id}</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={20} color="#888" />
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        {/* Input */}
        <View className="flex-row items-center bg-white px-4 py-3 border-t border-gray-200">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-800"
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage} className="ml-3">
            <Ionicons name="send" size={22} color={orange} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
