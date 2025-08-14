import axios from "axios";
import * as FileSystem from "expo-file-system";

import { CLOUDFLARE_GET_PROFILE, CLOUDFLARE_UPLOAD, CLOUDFLARE_UPLOAD_EVENT } from "../utils/endpoints";
import api from "./api";
import { dataReturnProps } from "../types/dataReturnProps";

interface PostImageProps {
  asset: any;
}

export async function postImage(postImage: PostImageProps) {
  try {

    const url = await api.put<dataReturnProps>(CLOUDFLARE_UPLOAD);

    const decodedUri = decodeURIComponent(postImage.asset);

    const base64 = await FileSystem.readAsStringAsync(decodedUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = await Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const teste = await axios.put(url.data.data.data, buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
  } catch (err: any) {
    console.log(err);
  }
}

export async function getImageProfile(){
  try {
    const url = await api.get<dataReturnProps>(CLOUDFLARE_GET_PROFILE);
    return url.data.data.data;

  } catch (err: any) {
    console.log(err);
  }
}

export async function postImagEvent(postImage: PostImageProps, eventName: string) {
  try {
    const url = await api.put<dataReturnProps>(CLOUDFLARE_UPLOAD_EVENT);

    const decodedUri = decodeURIComponent(postImage.asset);

    const base64 = await FileSystem.readAsStringAsync(decodedUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = await Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const teste = await axios.put(url.data.data.data, buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
  } catch (err: any) {
    console.log(err);
  }
}