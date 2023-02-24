import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  const navigation = useNavigation();

  const { logout } = useAuth();

  return (
    <View className='flex items-center justify-center flex-1 bg-blue-400'>
      <Text className='text-2xl text-white'>HomeScreen</Text>
      <Button
        title='Go to Chat Screen'
        onPress={() => navigation.navigate('Chat')}
      />

      <Button
        title='Logout'
        onPress={() => logout()}
      />
    </View>
  );
};

export default HomeScreen;
