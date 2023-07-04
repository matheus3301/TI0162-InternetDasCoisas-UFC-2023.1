import { SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native';
import SpotCard from '../components/SpotCard';
import useStore from '../dataStore';
import * as Notifications from 'expo-notifications';

function SpotsScreen() {
  const data = useStore((state) => state.data);
  const userSpots = data.filter((spot) => spot.requestedBy === "12345")

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  const spotComponent = userSpots.map((spot) => 
    <SpotCard 
    key={spot.name} 
    location={spot.name} 
    status={spot.isOcuppied} 
    device={spot.deviceName}
    user={"12345"}
    />
  );  

  return (
    <SafeAreaView style={styles.container}> 
        {userSpots.length !== 0 ? 
          <ScrollView>
            {spotComponent}
          </ScrollView>: 
          <View style={{justifyContent: "center", alignItems:"center", flex:1}}>
            <Text style={{color:"gray", alignSelf:"center"}}>Não há nenhuma vaga ativa para o usuário</Text>
          </View>
        }
    </SafeAreaView>
  );
  }

export default SpotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc"
  }
});