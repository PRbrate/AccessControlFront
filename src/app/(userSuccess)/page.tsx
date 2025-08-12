import colors from "@/constants/colors";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

export default function userSucces() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(panel)/profile/page");
    }, 2000);
        return () => clearTimeout(timer);

  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.emoji}>˗ˏˋ ★🤩★ ˎˊ˗</Text>
        <Text style={styles.text}>USUÁRIO CADASTRADO COM SUCESSO!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.principalBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.white,
    textAlign: "center",
  },
  emoji: {
    fontSize: 35,
    color: colors.white,
    marginBottom: 20,
  },
});
