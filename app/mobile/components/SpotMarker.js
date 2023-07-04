import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform} from 'react-native';
import { Callout, Marker, CalloutSubview } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import Paho from 'paho-mqtt';
import { useRef } from 'react/cjs/react.production.min';


const SpotMarker = props => {
  let iconName=""
  let iconColor=""
  
  if (props.weather==="sunny") {
    iconName="sunny"
    iconColor="#FFD01C"
  } else {
    iconName="cloud"
    iconColor="gray"
  }

  function ReserveSpot(client, device, user, requested, status) {
    if ((requested===null &&  status===false) || (requested===useRef)) {
      client.subscribe("devices/"+device+"/ask", ()=>{
        console.log("ask received at: devices/"+device+"/ask")
      })
      const message = new Paho.Message(user);
      message.destinationName = "devices/"+device+"/reserve";
      client.send(message);
      console.log("trying to send:"+ message+" to: devices/"+device+"/reserve")
    }
    else if (status) {
      Alert.alert("Vaga já ocupada", "Não foi possível reservar a essa vaga pois já está ocupada");
    }
  }
  
  return (
    <Marker
      coordinate={props.location}
    >
      <View style={{ width: 50, height: 50 }}>
        <Image
          source={
            (props.status === true && props.requested === null)
              ? require('../assets/marker-occupied-bad.png')
              : (props.status === false && props.requested === null)
              ? require('../assets/marker-free.png')
              : (props.status === false && props.requested)
              ? require('../assets/marker-reserved.png')
              : (props.status === true && props.requested)
              ? require('../assets/marker-occupied.png')
              : null
          } 
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Callout tooltip 
      {...(Platform.OS === 'android' && { onPress: () => ReserveSpot(props.client, props.deviceName, props.user, props.requested, props.status) })}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{props.name}</Text>
            </View>
            <View style={styles.icon}>
              <Ionicons name={iconName} size={30} color={iconColor}/>
            </View>
          </View>
          {Platform.OS === 'ios' ? (
            <CalloutSubview
            style={[
              styles.status, 
              (props.status === true && props.requested === null) ? styles.occupiedBad : null, 
              (props.status === false && props.requested === null) ? styles.free : null, 
              (props.status === false && props.requested) ? styles.reserved : null,
              (props.status === true && props.requested) ? styles.occupied : null,  
            ]} 
            onPress={() => ReserveSpot(props.client, props.deviceName, props.user, props.requested, props.status)}
            >
              <View>
                {(props.status === true && props.requested === null) ? <Text style={styles.statusText}>Irregular</Text> : null} 
                {(props.status === false && props.requested === null) ? <Text style={styles.statusText}>Livre</Text> : null}
                {(props.status === false && props.requested) ? <Text style={styles.statusText}>Reservada</Text> : null}
                {(props.status === true && props.requested) ? <Text style={styles.statusText}>Ocupada</Text> : null }
              </View>
            </CalloutSubview>
          ) : (
            <View
              style={[
                styles.status, 
                (props.status === true && props.requested === null) ? styles.occupiedBad : null, 
                (props.status === false && props.requested === null) ? styles.free : null, 
                (props.status === false && props.requested) ? styles.reserved : null,
                (props.status === true && props.requested) ? styles.occupied : null,  
              ]}
              >
              {(props.status === true && props.requested === null) ? <Text style={styles.statusText}>Irregular</Text> : null} 
              {(props.status === false && props.requested === null) ? <Text style={styles.statusText}>Livre</Text> : null}
              {(props.status === false && props.requested) ? <Text style={styles.statusText}>Reservada</Text> : null}
              {(props.status === true && props.requested) ? <Text style={styles.statusText}>Ocupada</Text> : null }
            </View>
          )}
        </View>
      </Callout>
    </Marker>
    );
};

export default SpotMarker

const styles = StyleSheet.create({
    container: {
      width: 200,
      backgroundColor: "white",
      borderRadius: 15,
      padding: 10
    },
    top: {
      flexDirection: "row"
    },
    title: {
      flex: 2,
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 20
    },
    icon: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    status: {
      flex: 2,
      margin: 3,
      borderRadius: 15,
      justifyContent: "center",
      alignItems:"center"
    },
    statusText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 28,
      padding: 5
    },
    free: {
      backgroundColor: "green"
    },
    reserved: {
      backgroundColor: "#4691ef"
    },
    occupied: {
      backgroundColor: "#9222F2"
    },
    occupiedBad: {
      backgroundColor: "red"
    }
  });