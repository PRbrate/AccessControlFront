import axios from "axios";
import * as FileSystem from "expo-file-system"

interface PostImageProps{
    url: string,
    asset: any
}

export async function postImage(postImg : PostImageProps) {
  try {
    const base64 = await FileSystem.readAsStringAsync(postImg.asset.uri, {
      encoding: FileSystem.EncodingType.Base64
    });

    const buffer = Uint8Array.from(atob(base64),c => c.charCodeAt(0));


    // const responseImg = await fetch(postImg.asset.uri);
    // const blob = await responseImg.blob();

    const teste = await axios.put(postImg.url, buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

  } catch (err: any) {
    console.log(err.response.data);
  }
}
