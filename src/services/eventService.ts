import { erroProps } from "../types/errorTypes";
import { PostEventProps } from "../types/EventTypes";
import { EVENT_DOMAIN } from "../utils/endpoints";
import api from "./api";


export async function PostEvent(eventProps: PostEventProps): Promise<boolean | erroProps> {

  try {
    const response = await api.post(EVENT_DOMAIN, {
      name: eventProps.name,
      eventDate: eventProps.eventDate,
      quantParticipants: eventProps.quantParticipants,
      available: true,
      image: "",
      description: eventProps.description,
      adress: eventProps.adress,
      city: eventProps.city,
      state: eventProps.state,
      postalCode: eventProps.postalCode
    });

    return true;
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