import { View, Text, Pressable, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "@/constants/Colors";
import { router } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import CustomCardEvent from "@/components/cardInfoEvent";
import { useEffect, useState } from "react";
import { EventReturnProps } from "@/src/types/EventTypes";
import { GetListEvent } from "@/src/services/eventService";

export default function ListEvents() {
  const [eventsreturn, setEventReturn] = useState<EventReturnProps[]>([]);

  useEffect(() => {
    (async () => {
      const events = await GetListEvent();
      if ("errors" in events) {
      } else {
        setEventReturn(events);
      }
    })();
  }, []);
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

        {eventsreturn.map((eventId) => (
          <View key={eventId.id}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(events)/infoEvent/page",
                  params: { eventReturnProps: JSON.stringify(eventId) },
                })
              }
            >
              <CustomCardEvent
                cidade={eventId.city}
                eventName={eventId.name}
                url={eventId.image}
                disponivel={eventId.available}
                uf={eventId.state}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}
