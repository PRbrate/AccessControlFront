import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";

export default function App() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission?.granted) {
    return <Text>Permissão da câmera é necessária</Text>;
  }

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    alert(`Tipo: ${result.type}, Dados: ${result.data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // pode usar "qr", "ean13", "code128" etc.
        }}
      />
      {scanned && (
        <Button title="Escanear novamente" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});
