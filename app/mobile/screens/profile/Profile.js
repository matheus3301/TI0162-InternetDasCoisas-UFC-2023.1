import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.topSafe}>
    <StatusBar style='auto' />
      <View style={styles.container}>
        <View style={styles.topLayer}>
            <View style={styles.icon} >
              <Image style={styles.profilePicture} source={require('../../assets/placeholder-profile.png')}/>
            </View>
            <View style={styles.usrInfo}>
              <Text style={{fontWeight: "bold", fontSize: 26}}>José Silva</Text>
            </View>
        </View>
        <View style={styles.middleLayer}>
          <View style={styles.rows}>
            <TouchableOpacity onPress={() => navigation.navigate('Carteira')} style={[styles.row, {borderTopWidth: 0}]}>
              <View style={styles.rowIcon}>
                <Ionicons name="wallet" size={24} color="black" />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>Carteira</Text>
                <Text style={styles.rowDescription}>Gerenciar formas de pagamento</Text>
              </View>
              <View style={styles.rowIcon}>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Meus carros')} style={styles.row} >
              <View style={styles.rowIcon}>
                <Ionicons name="car" size={24} color="black" />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>Meus carros</Text>
                <Text style={styles.rowDescription}>Gerenciar seus veículos salvos</Text>
              </View>
              <View style={styles.rowIcon}>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notificações')} style={styles.row}>
              <View style={styles.rowIcon}>
                <Ionicons name="notifications" size={24} color="black" />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>Notificações</Text>
                <Text style={styles.rowDescription}>Personalizar opções de notificação</Text>
              </View>
              <View style={styles.rowIcon}>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Ajustes')} style={styles.row}>
              <View style={styles.rowIcon}>
                <Ionicons name="settings-sharp" size={24} color="black" />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>Ajustes</Text>
                <Text style={styles.rowDescription}>Configurações da conta</Text>
              </View>
              <View style={styles.rowIcon}>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomLayer}>
          <View style={styles.logoutButton}>
            <Ionicons name="exit-outline" size={24} color="black" />
            <Text style={{color: "red", fontSize:16}}> Sair</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  topSafe: {
    flex:1,
    backgroundColor: "#f7f8fc"
  },
  bottom_safe: {
    flex: 0
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc"
  },
  topLayer: {
    flex: 16,
  },
  icon: {
    flex: 4,
    alignItems:"center"
  },
  profilePicture: {
    flex: 1,
    resizeMode: 'contain',
    marginTop: 10
  },
  usrInfo:{
    flex:2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop:10
  },
  middleLayer: {
    flex: 20,
  },
  rows: {
    flex: 1,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: "#f0f0f0",
    borderWidth: 2
  },
  row: {
    flex: 1,
    flexDirection: "row",
    borderTopColor: "#f0f0f0",
    borderTopWidth: 2,
  },
  rowIcon: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  rowText: {
    flex: 6,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  rowLabel: {
    fontWeight: "bold"
  },
  rowDescription: {
    fontSize: 12,
    color: "#404040"
  },
  bottomLayer: {
    flex: 5,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderColor: "#f0f0f0",
    borderWidth: 2,
    borderRadius: 15
  }
});