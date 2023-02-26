import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View className='p-2 flex-row  items-center justify-between'>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='chevron-back-outline'
            size={34}
            color='#ff5864'
          />
        </TouchableOpacity>
        <Text className='text-2xl font-bold '>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
