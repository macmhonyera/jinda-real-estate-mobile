import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';

export default function MultiStepSignupForm() {
    const [step, setStep] = useState(1);
    const navigation = useNavigation();
    const { form, setField, submitForm } = useAuthStore();

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View className="space-y-4">
                        <TextInput placeholder="Email" value={form.email} onChangeText={(text) => setField('email', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <TextInput placeholder="Password" secureTextEntry value={form.password} onChangeText={(text) => setField('password', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <View className="flex-row justify-between space-x-4 gap-4">
                            <TouchableOpacity
                                onPress={() => setField('role', 'tenant')}
                                className={`flex-1 px-3 py-2 rounded-xl ${form.role === 'tenant' ? 'bg-orange-500' : 'bg-gray-200'}`}
                            >
                                <Text className="text-center text-white">Tenant</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setField('role', 'landlord')}
                                className={`flex-1 px-3 py-2 rounded-xl ${form.role === 'landlord' ? 'bg-orange-500' : 'bg-gray-200'}`}
                            >
                                <Text className="text-center text-white">Landlord</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View className="space-y-4">
                        <TextInput placeholder="Full Name" value={form.fullName} onChangeText={(text) => setField('fullName', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <TextInput placeholder="Phone" keyboardType="phone-pad" value={form.phone} onChangeText={(text) => setField('phone', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <TextInput placeholder="National ID" value={form.nationalId} onChangeText={(text) => setField('nationalId', text)} className="bg-white p-4 rounded-xl" />
                    </View>
                );
            case 3:
                return (
                    <View className="space-y-4">
                        <TextInput placeholder="Address" value={form.address} onChangeText={(text) => setField('address', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <TextInput placeholder="City" value={form.city} onChangeText={(text) => setField('city', text)} className="bg-white p-4 rounded-xl" />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/sky.jpg")}
            resizeMode="cover"
            className="flex-1"
        >
            <SafeAreaView className="flex-1 bg-black/10 px-6 pt-10">
                <View className="flex-1 px-6 pt-6 pb-2 justify-between">
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text className="text-2xl font-bold text-center mb-6">Signup - Step {step} of 3</Text>
                        <View className="space-y-4">
                            {renderStep()}
                        </View>
                    </ScrollView>

                    <View className="mt-6">
                        {(step === 1 || step === 2) && (
                            <View className="flex-row justify-between space-x-4 gap-4">
                                {step > 1 && (
                                    <TouchableOpacity onPress={() => setStep(step - 1)} className="flex-1 bg-gray-500 py-4 rounded-xl">
                                        <Text className="text-white text-center font-semibold text-lg">Back</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={() => setStep(step + 1)} className="flex-1 bg-[#1E3A8A] py-4 rounded-xl">
                                    <Text className="text-white text-center font-semibold text-lg">Next</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {step === 3 && (
                            <TouchableOpacity
                                onPress={() => submitForm()}
                                className="bg-orange-500 py-4 rounded-xl"
                            >
                                <Text className="text-white text-center font-semibold text-lg">Submit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
