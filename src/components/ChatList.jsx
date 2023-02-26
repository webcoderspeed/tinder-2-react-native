import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import ChatRow from './ChatRow';

const ChatList = () => {
  const { user } = useAuth();

  const [matches, setMatches] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches'),
          where('usersMatched', 'array-contains', user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user, db]
  );

  return matches.length ? (
    <FlatList
      className='h-full'
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View className='p-5'>
      <Text className='text-center text-lg'>No matches at the moment 🥲</Text>
    </View>
  );
};

export default ChatList;
