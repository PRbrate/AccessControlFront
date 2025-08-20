import Colors from "@/constants/colors";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import SpinIcon from "@/components/spin";
import { useAuth } from "@/src/context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { defaultErroProps} from "@/src/types/errorTypes";
import { loginUser } from "@/src/services/userService";
import { delay } from "@/src/utils/delay";
import { useFormState } from "@/src/utils/useStatePersolaize";
import { UserLogin } from "@/src/types/userTypes";

export default function Login() {
  const { login, dataReturn, logout } = useAuth();
  const [onClickButton, setClicButton] = useState(false);

  const {state: returnError, updateField: defaultErroProps} = useFormState<defaultErroProps>({
    errors: {
      errors: [""],
      success: false
    },
    returnError: false
  }) 

  const { state: userLogin, updateField } = useFormState<UserLogin>({
    userName: "",
    passWord: "",
    logout,
  });

  useEffect(() => {
    if (dataReturn != null || dataReturn != undefined)
      router.push("/(panel)/profile/page");
  }, []);

  async function getUser() {
    setClicButton(true);

    if (userLogin.userName.length < 2 || userLogin.passWord.length < 8) {

      defaultErroProps("returnError", true);

      defaultErroProps("errors", {
        success: false,
        errors: ["Senha ou Username incorretos"],
      });
      setClicButton(false);

      return;
    }

    const response = await loginUser(userLogin);

    if ("errors" in response) {

      defaultErroProps("returnError", true);

      defaultErroProps("errors", response)
      setClicButton(false);
    } else {
      login(response);
      await delay(2000)
      router.push("/(panel)/profile/page");
    }
    setClicButton(false);
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraHeight={100}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logoText}>PRbrate</Text>
          <FontAwesome
            name="user-circle-o"
            size={100}
            color={Colors.principalBlue}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.tumb}> Bem-vindo ao nosso aplicativo</Text>
          <View>
            <Text style={styles.label}>Usuário</Text>
            <View style={styles.inputText}>
              <AntDesign name="user" size={24} color={Colors.gray} />
              <TextInput
                style={styles.inputlabel}
                placeholder="User"
                value={userLogin.userName}
                onChangeText={(e) => updateField("userName", e)}
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputText}>
              <MaterialIcons name="password" size={24} color={Colors.gray} />
              <TextInput
                style={styles.inputlabel}
                placeholder="**********"
                secureTextEntry
                value={userLogin.passWord}
                onChangeText={(e) => updateField("passWord", e)}
              />
            </View>
          </View>

          <Pressable style={styles.button} onPress={getUser}>
            {onClickButton ? (
              <SpinIcon />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </Pressable>

          {returnError.returnError ? (
            <View>
              <Text
                style={{
                  color: Colors.red,
                  textAlign: "center",
                  marginTop: 0,
                  paddingTop: 0,
                }}
              >
                {returnError.errors?.errors[0]}
              </Text>
            </View>
          ) : (
            ""
          )}

          <Link href="/(auth)/signUp/page" style={styles.link}>
            <Text>
              Ainda Não Possui uma conta?{" "}
              <Text style={{ color: "#1d017e", fontWeight: "bold" }}>
                CADASTRE-SE
              </Text>{" "}
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
