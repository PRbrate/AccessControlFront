import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { StyleSheet, View } from "react-native";

export default function QRCodeITem({ color, size }: any) {
  return (
    <View style={[style.container, { backgroundColor:  color}]}>
      <MaterialCommunityIcons name="qrcode-scan" size={size} color={Colors.white} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.principalBlue
  },
});
