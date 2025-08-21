import SpinIcon from "@/components/spin";
import colors from "@/constants/Colors";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

export default function ConfirmEmail() {
  const [onClickButton, setClicButton] = useState(false);

  const [name, setName] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Digite o código de verificação enviado para o seu email:
          </Text>
          <TextInput
            placeholder="Digite o código"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <Pressable style={styles.button}>
          {onClickButton ? (
            <SpinIcon />
          ) : (
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              verificar
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.blackBlue,
    textAlign: "center",
    padding: 5,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
    marginHorizontal: 30,
  },
  button: {
    width: "80%",
    marginTop: 15,
    backgroundColor: colors.principalBlue,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 15,
    borderRadius: 100,
    height: 45,
  },
});
