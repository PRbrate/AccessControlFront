import { AdressType } from "./addressTypes";

export interface PostEventProps {
  name: string;
  eventDate: Date;
  quantParticipants: number;
  description: string;
  Adress: AdressType;
}

export interface EventReturnProps {
  id: string;
  name: string;
  eventDate: Date;
  quantParticipants: number;
  available: boolean;
  image: string;
  description: string;
  adress: string;
  city: string;
  state: string;
  postalCode: string;
}


export interface photoEvent{
  id: string;
  photoName: string;
}