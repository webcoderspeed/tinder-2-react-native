// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4rEo0XEaVeSMg14ukXvecOAq8tqvxFOs',
  authDomain: 'tinder-2-8512b.firebaseapp.com',
  projectId: 'tinder-2-8512b',
  storageBucket: 'tinder-2-8512b.appspot.com',
  messagingSenderId: '41150372680',
  appId: '1:41150372680:web:10359a19dc0cf78966717d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore();

export { auth, db };
