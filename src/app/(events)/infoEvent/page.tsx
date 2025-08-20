import { EventReturnProps } from "@/src/types/EventTypes";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ImageBackground, Pressable } from "react-native";
import styles from "./styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import QrCodeGenerateImage from "@/components/qrCodeGenerate";

export default function infoEvent() {
  const { eventReturnProps } = useLocalSearchParams<{
    eventReturnProps: string;
  }>();

  const parseEvent: EventReturnProps = eventReturnProps
    ? JSON.parse(eventReturnProps)
    : null;

  const [imageValida, setImage] = useState(true);
  const eventDate = new Date(parseEvent.eventDate);
  const [qrVisible, setVisible] = useState(false);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, marginBottom: 20 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraHeight={100}
    >
      <View>
        {imageValida ? (
          <ImageBackground
            style={styles.image}
            source={{
              uri: parseEvent.image,
            }}
            onError={() => setImage(false)}
          />
        ) : (
          <View style={styles.image}>
            <MaterialCommunityIcons
              name="file-image-plus"
              size={40}
              color={colors.white}
            />
            <Text style={{ color: colors.white }}> Imagem </Text>
          </View>
        )}

        <View style={styles.overlay}>
          <Pressable style={styles.buttonBack}>
            <Ionicons
              name="chevron-back-sharp"
              size={43}
              color={colors.principalBlue}
              onPress={() => router.back()}
            />
          </Pressable>
          <View style={styles.containerNameEvent}>
            <Text style={styles.textNameEvent}>{parseEvent.name}</Text>
          </View>
        </View>
        <View style={styles.containerInformation}>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Text style={styles.textTumb}>Descrição: </Text>
            <Text
              style={{
                width: 15,
                height: 15,
                backgroundColor: parseEvent.available
                  ? colors.green
                  : colors.red,
                borderRadius: 100,
                marginRight: 10,
                marginTop: 4,
              }}
            />
          </View>
          <Text style={{ fontSize: 16 }}>{parseEvent.description}</Text>
          <View style={styles.containerInformationDate}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textTumb}>Data: </Text>
              <Text style={{ fontSize: 24 }}>
                {eventDate.toLocaleDateString("pt-BR")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textTumb}>Hora: </Text>
              <Text style={{ fontSize: 24 }}>
                {eventDate.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                hrs
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={{ fontSize: 35, fontWeight: "bold", color: colors.black }}
            >
              {eventDate.toLocaleDateString("pt-BR", { weekday: "long" })}
            </Text>
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.textTumb}>Endereço: </Text>
            <Text style={{ fontSize: 16 }}>
              {parseEvent.adress}, {parseEvent.city}, {parseEvent.state} - Cep:{" "}
              {parseEvent.postalCode}
            </Text>
          </View>
          <Text style={styles.textTumb}>
            Max. de Participantes: {parseEvent.quantParticipants}
          </Text>
          <Pressable
            style={styles.buttonSend}
            onPress={() => {setVisible(true)}}
          >
            <Text style={{fontWeight: "bold", color: colors.white}}> Gerar QRcode</Text>
          </Pressable>

          {qrVisible ? (
            <QrCodeGenerateImage
              companyId={parseEvent.id}
              userId={parseEvent.name}
            />
          ) : ""}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
