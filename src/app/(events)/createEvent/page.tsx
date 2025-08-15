import { Pressable, Text, View, Image } from "react-native";
import styles from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import CustomTextInput from "@/components/TextInput";
import SpinIcon from "@/components/spin";
import getAdress from "@/src/services/getAddresService";
import { erroProps } from "@/src/types/errorTypes";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native-paper";
import CustomNumberInput from "@/components/NumberInput";
import { pickImage } from "@/src/services/galeryService";
import { PostEvent } from "@/src/services/eventService";
import CustomModal from "@/components/Modal";
import { postImagEvent } from "@/src/services/clouflareService";
import { delay } from "@/src/services/delay";

export default function EventCreate() {
  const [name, setName] = useState("");
  const [onClickButtonCep, setClicButtoncep] = useState(false);
  const [postalCode, setCep] = useState("");
  const [returnError, setReturnError] = useState(false);
  const [erros, setErrors] = useState<erroProps | null>();
  const [adress, setLogradouro] = useState("");
  const [city, setCidade] = useState("");
  const [state, setUF] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImagem] = useState<string | null>(null);
  const [participantes, setParticipantes] = useState("");
  const [clickButton, setClicButton] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [podeclicar, setPodeClicar] = useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>();

  const example = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  async function getImage() {
    const returnpik = await pickImage();
    if (returnpik) {
      setImagem(returnpik);
    } else {
    }
  }

  async function postEvent() {
    if (!podeclicar) {
      setClicButton(true);

      if (name == "" || participantes == "") {
        setReturnError(true);
        setErrors({
          success: false,
          errors: ["nome e participantes devem ser preenchidos"],
        });
        setClicButton(false);
        return;
      }

      if (date) {
        const response = await PostEvent({
          name,
          eventDate: date,
          quantParticipants: parseInt(participantes),
          description,
          adress,
          city,
          state,
          postalCode,
        });
        if ("data" in response) {
          await delay(500);
          if (image && image !== "") {
            const responseImg = await postImagEvent(
              { asset: image },
              response.data.data.id
            );
            if (typeof responseImg == "boolean") {
              setVisible(true);
            } else {
              setErrors(responseImg);
            }
          }
        } else {
          setReturnError(true);
          setErrors(null);
          setErrors(response);
          setClicButton(false);
        }
      } else {
        setErrors({
          success: false,
          errors: ["preencha a data do evento"],
        });
        setClicButton(false);
        return;
      }
    }
    setPodeClicar(true);
  }

  function closeModal() {
    setVisible(false);
    router.push("/(auth)/signUp/page");
  }

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

    setClicButtoncep(false);
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
          <Pressable>
            <Ionicons
              name="chevron-back-sharp"
              size={43}
              color={colors.principalBlue}
              onPress={() => router.replace("/(panel)/profile/page")}
            />
          </Pressable>
          <Text style={styles.textHeader}> Crie Evento</Text>
        </View>
        <Pressable onPress={getImage}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 12,
                }}
              />
            ) : (
              <View>
                <MaterialCommunityIcons
                  name="file-image-plus"
                  size={24}
                  color={colors.principalBlue}
                />
                <Text style={{ color: colors.principalBlue }}> Imagem </Text>
              </View>
            )}
          </View>
        </Pressable>
        <View style={styles.textInput}>
          <CustomTextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            widthlabel={100}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <TextInput
              label="Data"
              value={
                date
                  ? date.toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                  : ""
              }
              onFocus={example}
              mode="outlined"
              style={{ width: "50%", textAlign: "center" }}
              theme={{
                colors: {
                  primary: colors.secundatyBlue,
                  secondary: colors.blackBlue,
                  onSurfaceVariant: colors.gray,
                },
              }}
              outlineStyle={{
                borderRadius: 12,
              }}
            />
            <CustomNumberInput
              label="Quant Participantes"
              onChangeText={setParticipantes}
              value={participantes}
              widthlabel={45}
            />
          </View>
          <View style={styles.containerCep}>
            <CustomTextInput
              label="UF"
              value={state}
              onChangeText={setUF}
              widthlabel={20}
            />
            <CustomTextInput
              label="Cep"
              value={postalCode}
              onChangeText={setCep}
              widthlabel={50}
            />
            <Pressable
              style={styles.ButtonCep}
              onPress={() => {
                getAddres(), setReturnError(false);
              }}
            >
              {onClickButtonCep ? (
                <SpinIcon />
              ) : (
                <Text style={{ color: colors.white, fontWeight: "bold" }}>
                  Buscar Cep
                </Text>
              )}
            </Pressable>
          </View>
          {returnError ? (
            <View>
              <Text
                style={{
                  color: colors.red,
                  textAlign: "center",
                  marginTop: 0,
                  paddingTop: 0,
                }}
              >
                {erros?.errors[0]}
              </Text>
            </View>
          ) : (
            ""
          )}
          <CustomTextInput
            label="Endereço"
            value={adress}
            onChangeText={setLogradouro}
            widthlabel={100}
          />
          <CustomTextInput
            label="Cidade"
            value={city}
            onChangeText={setCidade}
            widthlabel={100}
          />
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              display="inline"
            />
          </View>
        </View>
        <TextInput
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline // permite várias linhas
          numberOfLines={4} // altura inicial
          style={{
            height: 150,
            backgroundColor: "white",
          }}
          outlineStyle={{
            borderRadius: 10,
          }}
          theme={{
            colors: {
              primary: colors.secundatyBlue,
              secondary: colors.blackBlue,
              onSurfaceVariant: colors.gray,
            },
          }}
        />

        <Pressable
          style={styles.buttonSend}
          onPress={() => {
            postEvent(), setPodeClicar(false);
          }}
        >
          {clickButton ? (
            <SpinIcon />
          ) : (
            <Text
              style={{ color: colors.white, fontSize: 14, fontWeight: "bold" }}
            >
              Cadastrar
            </Text>
          )}
        </Pressable>

        <CustomModal
          visible={isVisible}
          onClose={closeModal}
          title="Concluido"
          message="Evento cadastrado Com Sucesso"
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
