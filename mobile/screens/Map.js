import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import SpotMarker from '../components/SpotMarker';
import * as Location from 'expo-location'
import Paho from 'paho-mqtt';
import useStore from '../dataStore';

client = new Paho.Client(
  "192.168.0.5",
  Number(9001),
  'mqtt-async-test'
);

function MapScreen() {
    const [region, setRegion] = useState(null);
    const [address, setAddress] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [showUserLocation, setShowUserLocation] = useState(true);
    const [spots, setSpots] = useState([])
    const setClient = useStore((state) => state.setClient);
    const setData = useStore((state) => state.setData);

    const geocode = async (address) => {
      if (address) {
        try {
          const geocodeResult = await Location.geocodeAsync(address+" Fortaleza - CE");
          if (geocodeResult.length > 0) {
            const { latitude, longitude } = geocodeResult[0];
            const newRegion = {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.01,
            };
            setRegion(newRegion);
          } else {
            Alert.alert("Local não econtrado", "a busca não retornou resultados");
          }
        } catch (error) {
          console.error('geocoding error:', error);
        }
      }
    };

    function onMessage(message) {
      if (message.destinationName === "notifications"){
        setSpots(JSON.parse(message.payloadString))
        setData(JSON.parse(message.payloadString))
        console.log(message.payloadString)
      }
    }

    const renderSpotMarkers = (spots) => {
      return spots.map((spot) => (
        <SpotMarker 
          key={spot.deviceName} 
          location={spot.location}
          name={spot.name} 
          status={spot.isOcuppied}
          deviceName={spot.deviceName}
          client={client}
          user={"12345"}
          requested={spot.requestedBy}
          //weather={spot.weather} 
        />
      ));
    };

    const showSpots = renderSpotMarkers(spots);
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permissão negada", "Para utilizar as funcionalidades do mapa, o aplicativo precisa utilizar a sua localização");
          setShowUserLocation(false)
          setIsLoading(false)
          return;
        }
      })();
    }, []);
    
    useEffect(() => {
        client.connect( {
          onSuccess: () => {
            client.subscribe("notifications");
            client.onMessageArrived = onMessage;
            setClient(client)
            setIsLoading(false)
        },
        onFailure: () => {
          Alert.alert("Serviço indisponível", "não foi possível se conectar ao servidor");
          setIsLoading(false)
        }
      });
    }, [])

    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
          <ActivityIndicator size="large" color="#9222F2"/>
        </View>
      );
    }
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <MapView
          provider="google"
          initialRegion={{
            latitude: -3.7449195, //location.latitude,
            longitude: -38.5781234, //location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
            }}
          style={styles.map}
          showsUserLocation={showUserLocation}
          region={region}
          >
            {showSpots}
          </MapView>
          <View style={styles.overlay}>
            <View style={styles.searchBar}>
              <TextInput style={{marginLeft: 20, width:"90%", height:"100%"}}
              autoComplete="street-address" 
              placeholder='Onde vamos estacionar?'
              placeholderTextColor={"gray"}
              returnKeyType="search"
              value={address}
              onChangeText={setAddress}
              onSubmitEditing={() => geocode(address)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex:1
  },
  overlay: {
    width: "100%",
    position: "absolute",
    top: 50,
    height: 50,
    alignItems: "center"
  },
  searchBar: {
    flex: 1,
    width: "90%",
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: "flex-start",
    justifyContent: 'center'
  }
});