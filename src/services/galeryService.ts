import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export async function pickImage() {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Precisamos de permissão para acessar suas fotos!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: false,
  });

  if (!result.canceled && result.assets?.[0].uri) {
    const pickedUri = result.assets[0].uri;
    const filename = pickedUri.split("/").pop();

    const newpath = FileSystem.documentDirectory! + filename;

    await FileSystem.copyAsync({
      from: pickedUri,
      to: newpath
    })
    return newpath;
  }
  return null;
}
