import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SpotCard = props => {
    return (
    <View style={styles.spotCard}>
        <View style={styles.info}>
        <View style={styles.icon}>
            <Ionicons name="location-sharp" size={36} color="black" />
        </View>
        <View style={styles.location}>
            <Text style={{fontSize: 18, fontWeight: "bold", flexWrap: "wrap"}}>{props.location}</Text>
        </View>
        <View style={styles.carInfo}>
            <Text style={{fontWeight: "bold"}}>{props.vehicle}</Text>
        </View>
        </View>
        <View style={styles.timer}>
        <View style={styles.timeRemaining}>
            <Text style={{color:"white", fontSize:36, fontWeight: "bold"}}>{props.timer}</Text>
        </View>
        </View>
    </View>
    );
};

export default SpotCard

const styles = StyleSheet.create({
    spotCard: {
      height: 170,
      flexDirection: 'row',
      margin: 20,
      marginBottom: 0,
      borderWidth: 2,
      borderColor: "#f0f0f0",
      borderRadius: 15,
      backgroundColor: "white"
    },
    info: {
      flex: 6,
      justifyContent: "center",
      alignItems: "center"
    },
    icon: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center"
    },
    location: {
      flex: 1,
      flexWrap: "wrap"
    },
    carInfo: {
      flex: 1
    },
    timer: {
      flex: 4
    },
    timeRemaining: {
      flex: 1,
      backgroundColor: "#9222F2",
      justifyContent: "center",
      alignItems: "center",
      marginRight:15,
      marginTop: 35,
      marginBottom: 35,
      borderRadius: 15
    }
  });