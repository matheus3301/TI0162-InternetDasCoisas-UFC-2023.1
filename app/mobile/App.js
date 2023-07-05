import { StatusBar } from 'expo-status-bar';
import ConfirmModal from './components/ConfirmModal';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigators/BottomTabNavigator';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style='auto'/>
        <BottomTabNavigator/>
      </NavigationContainer>
      <ConfirmModal/>
    </>
  );
}