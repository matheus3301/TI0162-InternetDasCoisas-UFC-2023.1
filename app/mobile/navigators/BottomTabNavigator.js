import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/Map';
import ProfileStackNavigator from './ProfileNavigator'
import SpotsScreen from '../screens/Spots';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mapa') {
            iconName = focused
              ? 'map'
              : 'map-outline';
          } else if (route.name === 'ProfileNavigator') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Minhas vagas') {
            return <MaterialIcons name={'local-parking'} size={size} color={color} />;
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#9222F2"
      })}
      >
        <Tab.Screen name="Mapa" component={MapScreen} options={{headerShown: false}} />
        <Tab.Screen name="Minhas vagas" component={SpotsScreen} />
        <Tab.Screen 
        name="ProfileNavigator" 
        component={ProfileStackNavigator} 
        options={{
          headerShown: false, 
          tabBarLabel: "Perfil"
          }} />
      </Tab.Navigator>
    );
  }

export default BottomTabNavigator;