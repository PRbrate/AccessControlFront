import { View, Text, Pressable, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "@/constants/colors";
import { router } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import CustomCardEvent from "@/components/cardInfoEvent";

export default function ListEvents() {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraHeight={100}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable>
            <Ionicons
              name="chevron-back-sharp"
              size={43}
              color={colors.principalBlue}
              onPress={() => router.back()}
            />
          </Pressable>
          <Text style={styles.textHeader}> Seus Eventos</Text>
        </View>
        <View style={styles.containerSeach}>
          <FontAwesome name="search" size={20} color="black" />
          <TextInput placeholder="Buscar por eventos criados" />
        </View>

        <Pressable
          onPress={() => router.navigate("/(events)/createEvent/page")}
        >
          <View
            style={[
              styles.containerInfoMaster,
              { backgroundColor: colors.secundatyBlue },
            ]}
          >
            <View style={[styles.containerInfo, { alignContent: "center" }]}>
              <MaterialIcons name="add-chart" size={40} color={colors.white} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: colors.white,
                }}
              >
                Criar evento
              </Text>
            </View>
          </View>
        </Pressable>

        <CustomCardEvent
          cidade="Governador mangacity"
          eventName="O melhor negão"
          url="vai vir"
          disponivel={true}
          uf="Ba"
        />
        <CustomCardEvent
          cidade="Governador mangacity"
          eventName="O melhor negão"
          url="vai vir"
          disponivel={true}
          uf="Ba"
        />
        <CustomCardEvent
          cidade="Governador mangacity"
          eventName="O melhor negão"
          url="vai vir"
          disponivel={true}
          uf="Ba"
        />
        <CustomCardEvent
          cidade="Governador mangacity"
          eventName="O melhor negão"
          url="vai vir"
          disponivel={true}
          uf="Ba"
        />
        <CustomCardEvent
          cidade="Governador mangacity"
          eventName="O melhor negão"
          url="vai vir"
          disponivel={true}
          uf="Ba"
        />
        <CustomCardEvent
          cidade="Governador mangacity"
          eventName="O melhor negão"
          url="vai vir"
          disponivel={true}
          uf="Ba"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
