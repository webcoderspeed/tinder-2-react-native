import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../utils/getMatchedUserInfo';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', matchDetails.id, 'messages'),
          orderBy('timestamp', 'desc'),
          limit(1)
        ),
        (snapshot) =>
          setLastMessage(
            snapshot.docs[0]?.data()?.message
          )
      ),

    [matchDetails, db]
  );



  return (
    <TouchableOpacity
      className='flex-row items-center py-3 px-5 mx-3 my-1 rounded-lg bg-white'
      style={styles.cardShadow}
      onPress={() =>
        navigation.navigate('Message', {
          matchDetails,
        })
      }
    >
      <Image
        className='rounded-full h-16 w-16 mr-4'
        source={{
          uri:
            matchedUserInfo?.photoURL ??
            'https://mediaindia.eu/wp-content/uploads/2018/11/512x512bb.jpg',
        }}
      />

      <View>
        <Text className='text-lg font-semibold capitalize'>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage ?? 'Say Hi!'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

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
