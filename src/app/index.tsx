import SpinIcon from "@/components/spin";
import Colors from "@/constants/colors";
import {
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function Login() {
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SpinIcon/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.principalBlue,
    justifyContent: "center",
    alignItems: "center"
  },
});
