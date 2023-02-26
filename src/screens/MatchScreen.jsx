import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  function handleMessageBtnPress() {
    navigation.goBack();
    navigation.navigate('Chat');
  }

  return (
    <View className='h-full bg-red-500 pt-20 opacity-[0.89]'>
      <View className='justify-center px-10 pt-20'>
        <Image
          source={{ uri: 'https://links.papareact.com/mg9' }}
          className='h-20 w-full rounded-full'
        />
      </View>

      <Text className='text-white text-center mt-5'>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View className='flex-row justify-evenly mt-5'>
        <Image
          className='h-32 w-32 rounded-full'
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          className='h-32 w-32 rounded-full'
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <TouchableOpacity
        className='bg-white m-5 px-8 py-4 rounded-full mt-20'
        onPress={handleMessageBtnPress}
      >
        <Text className='text-center font-semibold'>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
