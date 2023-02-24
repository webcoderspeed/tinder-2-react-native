import { View, Text } from 'react-native';
import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth';
import { auth } from '../firebase';

WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext({});

const config = {
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
  iosClientId:
    '41150372680-ij60jo10mq37j2tjj63fbenbhfu11utm.apps.googleusercontent.com',
  androidClientId:
    '41150372680-rgsdjogq34laqovg34m8sbbbn76t70u8.apps.googleusercontent.com',
  expoClientId:
    '41150372680-a7d9fstohqohsno8c51799s51q60i1u6.apps.googleusercontent.com',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const [googleRequest, googleResponse, signInWithGoogle] =
    Google.useIdTokenAuthRequest({
      iosClientId: config.iosClientId,
      androidClientId: config.androidClientId,
      scopes: config.scopes,
      expoClientId: config.expoClientId,
    });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
    }

  }, [googleResponse]);

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );


  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      user,
      error,
      loading,
      logout,
    }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
