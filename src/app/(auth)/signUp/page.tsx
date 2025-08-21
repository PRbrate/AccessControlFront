import Colors from "@/constants/Colors";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { useEffect, useState } from "react";
import { defaultErroProps } from "@/src/types/errorTypes";
import getAdress from "@/src/services/getAddresService";
import { loginUser, postUserData } from "@/src/services/userService";
import SpinIcon from "@/components/spin";
import { useAuth } from "@/src/context/AuthContext";
import { pickImage } from "@/src/services/galeryService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "@/constants/Colors";
import { postImage } from "@/src/services/clouflareService";
import ConfirmEmail from "./confirmEmail/page";
import { useFormState } from "@/src/utils/useStatePersolaize";
import { UserPost } from "@/src/types/userTypes";
import { AdressType } from "@/src/types/addressTypes";

export default function Register() {
  const { login, dataReturn, logout } = useAuth();

  const {
    state: Adress,
    updateField: setAdress,
    setState: allSetAddress,
  } = useFormState<AdressType>({
    cep: "",
    localidade: "",
    logradouro: "",
    uf: "",
  });

  const { state: userCadastro, updateField: setCadastro } =
    useFormState<UserPost>({
      userName: "",
      email: "",
      name: "",
      passWord: "",
      confirmPassword: "",
      addres: Adress ? Adress : {cep: "", localidade: "", uf: "", logradouro: ""},
    });

  const { state: returnError, updateField: defaultErroProps, setState: erroState} =
    useFormState<defaultErroProps>({
      errors: {
        errors: [""],
        success: false,
      },
      returnError: false,
    });

  const [onClickButton, setClicButton] = useState(false);
  const [onClickButtonCep, setClicButtoncep] = useState(false);
  const [verifyEmail, setverifyEmail] = useState(false);

  const [image, setImagem] = useState<string | null>(null);

  useEffect(() => {
    if (dataReturn != null || dataReturn != undefined)
      router.push("/(panel)/profile/page");
  }, []);

  async function getImage() {
    const returnpik = await pickImage();
    if (returnpik) {
      setImagem(returnpik);
    } else {
    }
  }

  async function getAddres() {
    const returnCep = await getAdress(Adress? Adress.cep : "");
    setClicButtoncep(true);

    if ("errors" in returnCep) {
      defaultErroProps("returnError", true);
      defaultErroProps("errors", returnCep);
    } else {
      allSetAddress(returnCep);
    }

    setClicButtoncep(false);
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function postUser() {
    setClicButton(true);

    if(userCadastro){
    if (
      userCadastro.name == "" ||
      userCadastro.userName == "" ||
      userCadastro.email == "" ||
      userCadastro.passWord == ""
    ) {
      defaultErroProps("returnError", true);
      defaultErroProps("errors", {
        success: false,
        errors: ["nome, usuário, email e senha devem ser preenchidos"],
      });

      setClicButton(false);
      return;
    }
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userCadastro.email) == false) {
      defaultErroProps("returnError", true);
      defaultErroProps("errors", {
        success: false,
        errors: ["email com formato inválido"],
      });
      setClicButton(false);
      return;
    }
    if (userCadastro.passWord != userCadastro.confirmPassword) {
      defaultErroProps("returnError", true);
      defaultErroProps("errors", {
        success: false,
        errors: ["as senhas não conferem"],
      });
      setClicButton(false);
      return;
    }

    const response = await postUserData(userCadastro);

    if (typeof response === "boolean") {
      const user = await loginUser({
        userName: userCadastro.userName,
        passWord: userCadastro.passWord,
        logout,
      });
      if ("accessToken" in user) {
        await login(user);

        await delay(3000);

        if (image && image !== "") await postImage({ asset: image });
        router.push("/(userSuccess)/page");
      }
    } else {
      defaultErroProps("returnError", true);
      defaultErroProps("errors", { errors: [""], success: false });
      defaultErroProps("errors", response);

      setClicButton(false);
    }}
  }

  return (
    <View style={styles.container}>
      {verifyEmail ? (
        <ConfirmEmail />
      ) : (
        <KeyboardAwareScrollView>
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

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Pressable onPress={getImage} style={styles.postImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 140, height: 140, borderRadius: 100 }}
                />
              ) : (
                <View style={styles.postImageRouded}>
                  <MaterialIcons
                    name="person-add-alt-1"
                    size={30}
                    color={colors.secundatyBlue}
                  />
                </View>
              )}
            </Pressable>
          </View>
          <View style={styles.form}>
            <Text style={styles.tumb}>Cadastro</Text>
            <View>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                placeholder="Digite seu Nome"
                style={styles.input}
                value={userCadastro?.name}
                onChangeText={(e) => setCadastro("name", e)}
                onChange={() => [erroState(null)]}
              />
            </View>

            <View>
              <Text style={styles.label}>Usuário</Text>
              <TextInput
                placeholder="Digite seu nome de usuário"
                style={styles.input}
                value={userCadastro?.userName}
                onChangeText={(e) => setCadastro("userName", e)}
                onChange={() => [erroState(null)]}
              />
            </View>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="exemple@exemple.com"
                style={styles.input}
                value={userCadastro?.email}
                onChangeText={(e) => setCadastro("email", e)}
                onChange={() => [erroState(null)]}
              />
            </View>

            <View style={styles.containerPassword}>
              <View style={styles.containerPass}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  placeholder="Sua Senha"
                  secureTextEntry
                  style={styles.labelPassWord}
                  value={userCadastro?.passWord}
                  onChangeText={(e) => setCadastro("passWord", e)}
                  onChange={() => [erroState(null)]}
                />
              </View>
              <View style={styles.containerPass}>
                <Text style={styles.label}>Confirme Sua Senha</Text>
                <TextInput
                  placeholder="Confirme sua Senha"
                  secureTextEntry
                  style={styles.labelPassWord}
                  value={userCadastro?.confirmPassword}
                  onChangeText={(e) => setCadastro("confirmPassword", e)}
                  onChange={() => [erroState(null)]}
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
                  {returnError.errors?.errors}
                </Text>
              </View>
            )}

            <Text style={styles.label}> Localização</Text>

            <View style={styles.AdressCep}>
              <View style={styles.ViewCep}>
                <TextInput
                  placeholder="Digite seu Cep"
                  style={styles.inputCep}
                  value={Adress?.cep}
                  onChangeText={(e) => setAdress("cep", e)}
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
                value={Adress?.logradouro}
                onChangeText={(e) => setAdress("logradouro", e)}
              />
            </View>

            <View style={styles.AdressCep}>
              <View style={[styles.ViewAddress, { width: "70%" }]}>
                <TextInput
                  placeholder="Cidade"
                  style={styles.inputCep}
                  value={Adress?.localidade}
                  onChangeText={(e) => setAdress("localidade", e)}
                />
              </View>
              <View style={styles.ViewAddress}>
                <TextInput
                  placeholder="UF"
                  style={styles.inputCep}
                  value={Adress?.uf}
                  onChangeText={(e) => setAdress("uf", e)}
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
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
