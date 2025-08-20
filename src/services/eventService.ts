import { data, dataNormal, dataReturnProps } from "../types/dataReturnProps";
import { erroProps } from "../types/errorTypes";
import {
  EventReturnProps,
  photoEvent,
  PostEventProps,
} from "../types/EventTypes";
import { EVENT_DOMAIN, EVENT_DOMAIN_NEXT_EVENT } from "../utils/endpoints";
import api from "./api";

export async function PostEvent(
  eventProps: PostEventProps
): Promise<dataReturnProps<EventReturnProps> | erroProps> {
  try {
    const response = await api.post<dataReturnProps<EventReturnProps>>(
      EVENT_DOMAIN,
      {
        name: eventProps.name,
        eventDate: eventProps.eventDate,
        quantParticipants: eventProps.quantParticipants,
        available: true,
        image: "",
        description: eventProps.description,
        adress: eventProps.Adress.logradouro,
        city: eventProps.Adress.localidade,
        state: eventProps.Adress.uf,
        postalCode: eventProps.Adress.cep,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data.errors);
      const message = Object.values(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      const message = Object.values(error.response.data.errors);
      console.log(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    }
  }
}

export async function PostImageEventService(
  eventProps: photoEvent
): Promise<boolean | erroProps> {
  try {
    const response = await api.patch(
      `${EVENT_DOMAIN}/${eventProps.id}/uploadphoto?photoName=${eventProps.photoName}`
    );

    return true;
  } catch (error: any) {
    if (error.response) {
      const message = Object.values(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      const message = Object.values(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    }
  }
}


export async function GetListEvent(): Promise<EventReturnProps[] | erroProps> {
  try {
    const response = await api.get(EVENT_DOMAIN);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message = Object.values(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      const message = Object.values(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    }
  }
}

export async function GetNextEvent(): Promise<EventReturnProps | null> {
  try {
    const response = await api.get(EVENT_DOMAIN_NEXT_EVENT);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message = Object.values(error.response.data.errors);
      return null
      ;
    } else {
      const message = Object.values(error.response.data.errors);
      return null;
    }
  }
}
