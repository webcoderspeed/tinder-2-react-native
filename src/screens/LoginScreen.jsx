import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className='flex-1'>
      <ImageBackground
        source={{
          uri: 'https://tinder.com/static/tinder.png',
        }}
        resizeMode='cover'
        className='flex-1'
      >
        <View className='flex-1 items-center justify-center'>
          <TouchableOpacity
            className='absolute bottom-40 bg-white flex items-center justify-center rounded-2xl p-4'
            onPress={() => signInWithGoogle()}
          >
            <Text>Sign in & get Swiping</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
