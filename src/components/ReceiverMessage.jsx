import { View, Text, Image,  } from 'react-native';
import React from 'react';

const ReceiverMessage = ({ message }) => {
  return (
    <View className='flex-row items-center justify-start'>
      <Image
        className='h-12 w-12 rounded-full '
        source={{ uri: message.photoURL }}
      />
      <View className='bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 items-start mr-auto'>
        <Text className='text-white'>{message.message}</Text>
      </View>
    </View>
  );
};

export default ReceiverMessage;
