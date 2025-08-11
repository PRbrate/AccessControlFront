import * as ImagePicker from "expo-image-picker";

export async function pickImage() {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Precisamos de permissão para acessar suas fotos!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  });

  if (!result.canceled) {
    return result.assets[0];
  }
}
