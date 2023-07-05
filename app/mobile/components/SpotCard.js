import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useStore from '../dataStore';
import Paho from 'paho-mqtt';

const SpotCard = props => {
  const client = useStore((state) => state.client);

  function CancelReserve(client, device, user) {
    const message = new Paho.Message(user.toString());
    message.destinationName = "devices/"+device+"/reserve";
    client.send(message);
  }

  return (
    <View style={styles.spotCard}>
        <View style={styles.info}>
          <View style={styles.icon}>
              <Ionicons name="location-sharp" size={36} color={"#9222F2"} />
          </View>
          <View style={styles.location}>
            <Text style={styles.locationText}>{props.location}</Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => CancelReserve(client, props.device, props.user)}>
              <Text style={{color: "green"}}>Liberar Vaga</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.status, {backgroundColor: props.status ? "#9222F2":"#4691ef"}]}>
          <Text style={styles.statusText}>{props.status ? "Estacionado":"Reservada"}</Text>
        </View>
    </View>
    );
};

export default SpotCard

const styles = StyleSheet.create({
    spotCard: {
      height: 200,
      margin: 20,
      flexDirection: "row",
      marginBottom: 0,
      borderWidth: 2,
      borderColor: "#f0f0f0",
      borderRadius: 15,
      backgroundColor: "white"
    },
    info: {
      flex: 3,
    },
    icon: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    location: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    locationText: {
      fontSize: 18, 
      fontWeight: "bold", 
      flexWrap: "wrap",
      margin: 5,
      marginTop: 0,
    },
    statusContainer: {
      flex: 2,
    },
    status: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      marginRight:15,
      marginTop: 35,
      marginBottom: 35,
      borderRadius: 15,
      padding: 5
    },
    statusText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "bold",
    },
    cancelButton: {
      flex: 1,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginHorizontal:15,
      marginBottom: 10,
      borderColor: "#f0f0f0"
    }

  });