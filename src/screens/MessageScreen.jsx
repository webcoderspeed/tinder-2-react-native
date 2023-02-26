import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import getMatchedUserInfo from '../utils/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ReceiverMessage from '../components/ReceiverMessage';
import SenderMessage from '../components/SenderMessage';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const MessageScreen = () => {
  const { user } = useAuth();

  const { params } = useRoute();

  const { matchDetails } = params;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', matchDetails.id, 'messages'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  function sendMessage() {
    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message,
    });

    setMessage('');
  }

  return (
    <SafeAreaView className='py-12 flex-1'>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid)?.displayName}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted={-1}
            data={messages}
            className='pl-4'
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.userId === user.uid ? (
                <SenderMessage
                  key={item.id}
                  message={item}
                />
              ) : (
                <ReceiverMessage
                  key={item.id}
                  message={item}
                />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className='flex-row justify-between items-center border-t border-gray-200 px-5 py-2'>
          <TextInput
            className='h-10 text-lg'
            placeholder='Send Message...'
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={sendMessage}
          />
          {message?.trim() !== '' && (
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons
                name='send-sharp'
                size={24}
                color='#ff5864'
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
