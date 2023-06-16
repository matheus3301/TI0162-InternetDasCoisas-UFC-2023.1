import { createStackNavigator } from '@react-navigation/stack';
import ProfileCars from '../screens/profile/ProfileCars';
import ProfileNotifications from '../screens/profile/ProfileNotifications';
import ProfileWallet from '../screens/profile/ProfileWallet';
import ProfileSettings from '../screens/profile/ProfileSettings';
import ProfileScreen from '../screens/profile/Profile';

const Stack = createStackNavigator();

function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Carteira" component={ProfileWallet} />
      <Stack.Screen name="Meus carros" component={ProfileCars} />
      <Stack.Screen name="Notificações" component={ProfileNotifications} />
      <Stack.Screen name="Ajustes" component={ProfileSettings} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;