import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface qrCodeProps{
    companyId: string;
    userId: string;
}

export default function QrCodeGenerateImage({companyId, userId}: qrCodeProps) {

    useEffect(() => {
     
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>QR Code Event</Text>
      <QRCode
        value= {JSON.stringify({companyId, userId})}// conteúdo do QR Code
        size={200} // tamanho em px
        color="black" // cor do QR
        backgroundColor="white" // fundo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 20 },
});
