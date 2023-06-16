import { StyleSheet, Text, View, Image } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

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
  
  return (
    <Marker
      coordinate={props.location}
    >
      <View style={{ width: 50, height: 50 }}>
        <Image
          source={require('../assets/MarkerIcon.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Callout tooltip >
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{props.name}</Text>
            </View>
            <View style={styles.icon}>
              <Ionicons name={iconName} size={30} color={iconColor}/>
            </View>
          </View>
          <View style={[styles.status, 
            props.status==="Livre" ? styles.free: null, 
            props.status==="Reservada" ? styles.reserved: null,
            props.status==="Ocupada" ? styles.occupied: null
            ]}>
            <Text style={styles.statusText}>{props.status}</Text>
          </View>
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
      backgroundColor: "red"
    }
  });