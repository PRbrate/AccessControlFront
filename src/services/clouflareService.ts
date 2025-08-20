import axios from "axios";
import * as FileSystem from "expo-file-system";

import {
  CLOUDFLARE_GET_PROFILE,
  CLOUDFLARE_UPLOAD,
  CLOUDFLARE_UPLOAD_EVENT,
} from "../utils/endpoints";
import api from "./api";
import { dataReturnProps } from "../types/dataReturnProps";
import { PostImageEventService } from "./eventService";
import { delay } from "../utils/delay";
import { erroProps } from "../types/errorTypes";

interface PostImageProps {
  asset: any;
}

export async function postImage(
  postImage: PostImageProps
): Promise<Boolean | erroProps> {
  try {
    const url = await api.put<dataReturnProps<string>>(CLOUDFLARE_UPLOAD);

    const decodedUri = decodeURIComponent(postImage.asset);

    const base64 = await FileSystem.readAsStringAsync(decodedUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = await Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    await axios.put(url.data.data.data, buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
    return true;
  } catch (err: any) {
    const message = Object.values(err.response.data.errors);
    console.log(message);
    return <erroProps>{
      success: false,
      errors: message,
    };
  }
}

export async function getImageProfile() {
  try {
    const url = await api.get<dataReturnProps<string>>(CLOUDFLARE_GET_PROFILE);
    return url.data.data.data;
  } catch (err: any) {
    const message = Object.values(err.response.data.errors);
    return ""
  }
}


export async function postImagEvent(
  postImage: PostImageProps,
  eventId: string
): Promise<boolean | erroProps> {
  try {
    const url = await api.put<dataReturnProps<string[]>>(
      `${CLOUDFLARE_UPLOAD_EVENT}?idEvent=${eventId}`
    );

    const decodedUri = decodeURIComponent(postImage.asset);

    const base64 = await FileSystem.readAsStringAsync(decodedUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = await Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    await delay(500);

    const postdatabaseImage = await PostImageEventService({
      id: eventId,
      photoName: url.data.data.data[1],
    });

    if ("errors" in postImagEvent) {
      return postdatabaseImage;
    }
    await axios.put(url.data.data.data[0], buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    return true;
  } catch (err: any) {
    const message = Object.values(err.response.data.errors);
    return <erroProps>{
      success: false,
      errors: message,
    };
  }
}
