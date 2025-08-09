import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

export default function SettingsProgile() {
  return (
    <View>
      <Text>Pagina de Configurações</Text>
    </View>
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
});
