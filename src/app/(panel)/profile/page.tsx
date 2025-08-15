import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Platform,
  StatusBar,
  StyleSheet,
  Pressable,
} from "react-native";
import Colors from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { setupApiToken, setupResponseInterceptor } from "@/src/services/api";
import { getImageProfile } from "@/src/services/clouflareService";

export default function Profile() {
  const { dataReturn, logout } = useAuth();
  const [photoProfile, setProtoProfile] = useState("");

  useEffect(() => {
    (async () => {
      setupApiToken(dataReturn?.accessToken);
      setupResponseInterceptor(logout);
      setProtoProfile((await getImageProfile()) || "");
    })();
  }, [dataReturn?.accessToken, logout]);

  function logoutRedirect() {
    logout();
    router.push("/(auth)/signIn/page");
  }

  function firshName(): string {
    if (dataReturn?.userDto != null) {
      const separetefishName = dataReturn?.userDto?.name.split(" ");
      return separetefishName[0];
    }
    return " ";
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.containerProfile}>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>Olá {firshName()}</Text>
              <Entypo name="hand" size={24} color={Colors.blackBlue} />
            </View>
            <Text>Hoje o dia está lindo, como vc está?</Text>
          </View>
          <Pressable onPress={logoutRedirect}>

            <View style={styles.imageContain}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: "cover",
                  borderRadius: 30,
                }}
                source={{
                  uri: photoProfile,
                }}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.premium}>
          <Text style={{color: colors.white, fontWeight: "bold"}}>Seja Premium</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.textContainerInfo}> Próximo evento</Text>
          <View style={styles.cardInteratible}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 10,
              }}
              source={{
                uri: "https://www.organizandoeventos.com.br/artigos/seguro-eventos-1.jpg",
              }}
            />
          </View>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.textContainerInfo}> Eventos</Text>
          <View style={styles.containerInfoCard}>
            <Pressable
              onPress={() => router.navigate("/(events)/createEvent/page")}
            >
              <View style={styles.miniCard}>
                <MaterialIcons
                  name="add-chart"
                  size={40}
                  color={Colors.white}
                />
                <Text
                  style={[styles.textContainerInfo, { color: Colors.white }]}
                >
                  Criar Novo Evento
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.navigate("/(events)/listEvets/page")}
            >
              <View style={styles.miniCard}>
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={40}
                  color={Colors.white}
                />
                <Text
                  style={[styles.textContainerInfo, { color: Colors.white }]}
                >
                  Seus Eventos
                </Text>
              </View>
            </Pressable>
            <View style={styles.miniCard}>
              <MaterialIcons name="update" size={40} color={Colors.white} />
              <Text style={[styles.textContainerInfo, { color: Colors.white }]}>
                Atualizar Evento
              </Text>
            </View>
            <View style={styles.miniCard}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={40}
                color={Colors.white}
              />
              <Text style={[styles.textContainerInfo, { color: Colors.white }]}>
                Ler QRCode
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  containerProfile: {
    padding: 15,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.blackBlue,
  },
  imageContain: {
    width: 60,
    height: 60,
    borderColor: colors.blackBlue,
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },premium:{
    backgroundColor: colors.green,
    marginHorizontal: 10,
    height:40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  containerInfo: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    gap: 10,
  },
  textContainerInfo: {
    fontWeight: "bold",
    fontSize: 15,
  },
  cardInteratible: {
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
  },
  containerInfoCard: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    gap: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  miniCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 150,
    width: 150,
    backgroundColor: Colors.secundatyBlue,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 6,
  },
});
