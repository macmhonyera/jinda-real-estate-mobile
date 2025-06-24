import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MultiStepSignupForm() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: 'tenant',
        fullName: '',
        phone: '',
        nationalId: '',
        address: '',
        city: '',
        profilePictureUrl: ''
    });

    const handleChange = (key: keyof typeof form, value: string | undefined) => {
        setForm({ ...form, [key]: value });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['photo'] as any, // ✅ No quotes, use enum value
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            handleChange('profilePictureUrl', result.assets[0].uri);
        }
    };


    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View className="space-y-4">
                        <TextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            value={form.email}
                            onChangeText={(text) => handleChange('email', text)}
                            className="bg-white p-4 rounded-xl mb-5"
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={form.password}
                            onChangeText={(text) => handleChange('password', text)}
                            className="bg-white p-4 rounded-xl mb-5"
                        />

                        <View className="flex-row justify-between space-x-4 gap-4">
                            <TouchableOpacity
                                onPress={() => handleChange('role', 'tenant')}
                                className={`flex-1 px-3 py-2 rounded-xl ${form.role === 'tenant' ? 'bg-orange-500' : 'bg-gray-200'}`}
                            >
                                <Text className="text-center text-white">Tenant</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleChange('role', 'landlord')}
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
                        <TextInput placeholder="Full Name" value={form.fullName} onChangeText={(text) => handleChange('fullName', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <TextInput placeholder="Phone Number" keyboardType="phone-pad" value={form.phone} onChangeText={(text) => handleChange('phone', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <TextInput placeholder="National ID" value={form.nationalId} onChangeText={(text) => handleChange('nationalId', text)} className="bg-white p-4 rounded-xl" />
                    </View>
                );
            case 3:
                return (
                    <View className="space-y-4">
                        <TextInput placeholder="Address" value={form.address} onChangeText={(text) => handleChange('address', text)} className="bg-white p-4 rounded-xl mb-5" />
                        <TextInput placeholder="City" value={form.city} onChangeText={(text) => handleChange('city', text)} className="bg-white p-4 rounded-xl" />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/sky.jpg")} // use a house/city themed image
            resizeMode="cover"
            className="flex-1"
        >
            <SafeAreaView className="flex-1 bg-black/10 px-6 pt-10">
                <View className="flex-1 px-6 pt-6 pb-2 justify-between">

                    {/* Form Section (scrollable if needed) */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text className="text-2xl font-bold text-center mb-6">Signup - Step {step} of 3</Text>

                        {/* Fields - ensure spacing between inputs */}
                        <View className="space-y-4">
                            {renderStep()}
                        </View>
                    </ScrollView>

                    {/* Footer navigation */}
                    <View className="mt-6">
                        {/* Step 1 or 2: Show Back & Next */}
                        {(step === 1 || step === 2) && (
                            <View className="flex-row justify-between space-x-4 gap-4">
                                {step > 1 && (
                                    <TouchableOpacity
                                        onPress={() => setStep(step - 1)}
                                        className="flex-1 bg-gray-500 py-4 rounded-xl"
                                    >
                                        <Text className="text-white text-center font-semibold text-lg">Back</Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    onPress={() => setStep(step + 1)}
                                    className="flex-1 bg-[#1E3A8A] py-4 rounded-xl"
                                >
                                    <Text className="text-white text-center font-semibold text-lg">Next</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Step 3: Submit only */}
                        {step === 3 && (
                            <TouchableOpacity
                                onPress={() => console.log('Form submitted', form)}
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
