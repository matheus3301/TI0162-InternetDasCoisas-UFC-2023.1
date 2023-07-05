import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import useStore from '../dataStore';
import Paho from 'paho-mqtt';

const ConfirmModal = () => {
  const client = useStore((state) => state.client);
  const [isVisible, device] = useStore((state) => state.ask)
  const setAsk = useStore((state) => state.setAsk)
  const data = useStore((state)=>state.data)
  const spot = data ? data.find(item => item.deviceName===device):null

  function confirm(client, device) {
    const message = new Paho.Message("1");
    message.destinationName = "devices/"+device+"/confirm";
    client.send(message);
    client.unsubscribe("devices/"+device+"/ask")
    console.log("confirm")
    setAsk([false, null])
  }

  function deny(client, device) {
    const message = new Paho.Message("0");
    message.destinationName = "devices/"+device+"/confirm";
    client.send(message);
    console.log("deny")
    setAsk([false, null])
  }

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalInfo}>
            <Text style={[styles.text, {fontSize: 16}]}>Foi você que estacionou em: </Text>
            <Text style={[styles.text, {fontSize: 26}]}>{spot ? spot.name:null}</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={styles.button} onPress={() => confirm(client, device)}>
              <Text style={{color: "green", fontWeight: "bold", fontSize: 26}}>sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => deny(client, device)}>
              <Text style={{color: "red", fontWeight: "bold", fontSize: 26}}>não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#0000009f',
    padding: 20,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 10,
    width: '80%',
    maxHeight: '30%',
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flex: 1,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 3,
    marginBottom: 10,
    borderColor: "#f0f0f0"
  },
  modalInfo: {
    flex: 4,
    justifyContent: "center",
    alignItems: 'center',
    margin: 10
  },
  text: {
    fontWeight: "bold",
    margin: 10
  },
  options: {
    flex: 2,
    margin: 10,
    flexDirection: "row"
  }
})