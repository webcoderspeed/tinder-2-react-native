import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';

const DUMMY_DATA = [
  {
    id: '1',
    firstName: 'Sanjeev',
    lastName: 'Sharma',
    occupation: 'Developer',
    age: 25,
    photoURL:
      'https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg',
  },
  {
    id: '2',
    firstName: 'Vikas',
    lastName: 'Saxena',
    occupation: 'Developer',
    age: 25,
    photoURL:
      'https://preview.redd.it/xqsq161goyn91.png?width=640&crop=smart&auto=webp&s=b42b7e1ad0ac727207419b521050aa7688e59f0f',
  },
  {
    id: '3',
    firstName: 'Rahul',
    lastName: 'Sharma',
    occupation: 'Developer',
    age: 25,
    photoURL:
      'https://wallpapers.com/images/hd/skull-gaming-profile-7bxs83gp6ktrcuku.jpg',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const swipeRef = useRef(null);

  return (
    <SafeAreaView className='pt-8 flex-1'>
      <View className='flex-row items-center justify-between px-4'>
        <TouchableOpacity>
          <Image
            source={{ uri: user.photoURL }}
            className='h-10 w-10 rounded-full'
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_GVGj8I4M7GmSgSMuCOW0Py27HuYy3Bp2nzOtgYB6nqBW82akJD8QSwN05TQyu_Nq_8&usqp=CAU',
            }}
            className='h-10 w-10 rounded-full'
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons
            name='chatbubble-sharp'
            size={30}
            color='#ff5864'
          />
        </TouchableOpacity>
      </View>
      <View className='flex-1 items-center justify-center -mt-6'>
        <Swiper
          ref={swipeRef}
          cards={DUMMY_DATA}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log('Swipe PASS');
          }}
          onSwipedRight={() => {
            console.log('Swipe MATCH');
          }}
          backgroundColor='#4fd0e9'
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#4DED30',
                },
              },
            },
          }}
          renderCard={(card) => {
            return (
              <View
                className='h-3/4 items-center justify-center rounded-xl overflow-hidden relative'
                key={card.id}
                style={styles.cardShadow}
              >
                <Image
                  source={{ uri: card.photoURL }}
                  className='absolute top-0 w-full h-full rounded-xl object-cover'
                />

                <View className='absolute bottom-0 h-20 bg-white w-full justify-between items-center flex-row px-6 py-2 rounded-b-xl'>
                  <View>
                    <Text className='text-xl font-bold'>
                      {card.firstName} {card.lastName}
                    </Text>
                    <Text>{card.occupation}</Text>
                  </View>
                  <Text className='text-2xl font-bold'>{card.age}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View className='flex items-center justify-evenly flex-row'>
        <TouchableOpacity className='items-center justify-center rounded-full w-16 h-16 bg-red-200'
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo
            name='cross'
            size={24}
            color='red'
          />
        </TouchableOpacity>

        <TouchableOpacity className='items-center justify-center rounded-full w-16 h-16 bg-green-200'
          onPress={() => swipeRef.current.swipeRight()}
        >
          <Entypo
            name='heart'
            size={24}
            color='green'
          />
        </TouchableOpacity>
      </View>

      {/* <Button
        title='Go to Chat Screen'
        onPress={() => navigation.navigate('Chat')}
      />

      <Button
        title='Logout'
        onPress={() => logout()}
      /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
