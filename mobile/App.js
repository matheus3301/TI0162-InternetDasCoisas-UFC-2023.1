import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigators/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto'/>
      <BottomTabNavigator/>
    </NavigationContainer>
    
  );
}