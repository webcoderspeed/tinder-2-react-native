import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/StackNavigator';
import { AuthProvider } from './src/hooks/useAuth';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

const App = () => {

  

  return (
    <NavigationContainer>
      <AuthProvider>

      <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
