import Colors from "@/constants/colors";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { useEffect, useState } from "react";
import { erroProps } from "@/src/types/errorTypes";
import getAdress from "@/src/services/getAddresService";
import { postUserData } from "@/src/services/userService";
import SpinIcon from "@/components/spin";
import { useAuth } from "@/src/context/AuthContext";

export default function Register() {
  const { dataReturn } = useAuth();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [postalCode, setCep] = useState("");
  const [adress, setLogradouro] = useState("");
  const [city, setCidade] = useState("");
  const [state, setUF] = useState("");

  const [erros, setErrors] = useState<erroProps | null>();
  const [returnError, setReturnError] = useState(false);
  const [onClickButton, setClicButton] = useState(false);
  const [onClickButtonCep, setClicButtoncep] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  useEffect(() => {
    if (dataReturn != null || dataReturn != undefined)
      router.push("/(panel)/profile/page");
  }, []);
  async function getAddres() {
    const returnCep = await getAdress(postalCode);
    setClicButtoncep(true);

    if ("errors" in returnCep) {
      setReturnError(true);
      setErrors(returnCep);
    } else {
      setLogradouro(returnCep.logradouro);
      setCidade(returnCep.localidade);
      setUF(returnCep.uf);
    }

    setClicButtoncep(false)
  }

  async function postUser() {

    setClicButton(true)

    if (name == "" || userName == "" || email == "" || password == "") {
      setReturnError(true);
      setErrors({
        success: false,
        errors: ["nome, usuário, email e senha devem ser preenchidos"],
      });
      setClicButton(false)
      return;
    }
    if (emailRegex.test(email) == false) {
      setReturnError(true);
      setErrors({
        success: false,
        errors: ["email com formato inválido"],
      });
      setClicButton(false);
      return;
    }
    if (password != confirmPassword) {
      setReturnError(true);
      setErrors({
        success: false,
        errors: ["as senhas não conferem"],
      });
      setClicButton(false);
      return;
    }

    const response = await postUserData({
      name,
      userName,
      email,
      password,
      confirmPassword,
      postalCode,
      adress,
      city,
      state,
    });

    if (typeof response === "boolean") {
      router.push("/(userSuccess)/page");
    } else {
      setReturnError(true);
      setErrors(null);
      setErrors(response);
      setClicButton(false);
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIconText}>
            <Pressable style={styles.backButton}>
              <Ionicons
                name="chevron-back-sharp"
                size={43}
                color={Colors.principalBlue}
                onPress={() => router.back()}
              />
            </Pressable>
            <Text style={styles.logoText}>PRbrate</Text>
          </View>
        </View>
        <View style={styles.form}>
          <Text style={styles.tumb}>Cadastro</Text>
          <View>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              placeholder="Digite seu Nome"
              style={styles.input}
              value={name}
              onChangeText={setName}
              onChange={() => [setErrors(null), setReturnError(false)]}
            />
          </View>

          <View>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              placeholder="Digite seu nome de usuário"
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              onChange={() => [setErrors(null), setReturnError(false)]}
            />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="exemple@exemple.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onChange={() => [setErrors(null), setReturnError(false)]}
            />
          </View>

          <View style={styles.containerPassword}>
            <View style={styles.containerPass}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                placeholder="Sua Senha"
                secureTextEntry
                style={styles.labelPassWord}
                value={password}
                onChangeText={setPassWord}
                onChange={() => [setErrors(null), setReturnError(false)]}
              />
            </View>
            <View style={styles.containerPass}>
              <Text style={styles.label}>Confirme Sua Senha</Text>
              <TextInput
                placeholder="Confirme sua Senha"
                secureTextEntry
                style={styles.labelPassWord}
                value={confirmPassword}
                onChangeText={setConfirm}
                onChange={() => [setErrors(null), setReturnError(false)]}
              />
            </View>
          </View>

          {returnError && (
            <View>
              <Text
                style={{
                  color: Colors.red,
                  textAlign: "center",
                  marginTop: 0,
                  paddingTop: 0,
                  marginBottom: 3,
                }}
              >
                {erros?.errors}
              </Text>
            </View>
          )}

          <Text style={styles.label}> Localização</Text>

          <View style={styles.AdressCep}>
            <View style={styles.ViewCep}>
              <TextInput
                placeholder="Digite seu Cep"
                style={styles.inputCep}
                value={postalCode}
                onChangeText={setCep}
              />
            </View>
            <Pressable style={styles.ButtonCep} onPress={getAddres}>
              {onClickButtonCep ? (
                <SpinIcon />
              ) : (
                <Text style={{ color: Colors.white, fontWeight: "bold" }}>
                  Buscar Cep
                </Text>
              )}
            </Pressable>
          </View>
          <View>
            <TextInput
              placeholder="Endereço"
              style={styles.input}
              value={adress}
              onChangeText={setLogradouro}
            />
          </View>

          <View style={styles.AdressCep}>
            <View style={[styles.ViewAddress, { width: "70%" }]}>
              <TextInput
                placeholder="Cidade"
                style={styles.inputCep}
                value={city}
                onChangeText={setCidade}
              />
            </View>
            <View style={styles.ViewAddress}>
              <TextInput
                placeholder="UF"
                style={styles.inputCep}
                value={state}
                onChangeText={setUF}
              />
            </View>
          </View>

          <Pressable style={styles.button} onPress={postUser}>
            {onClickButton ? (
              <SpinIcon />
            ) : (
              <Text style={styles.buttonText}>Cadastre-se</Text>
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
