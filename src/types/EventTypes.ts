export interface PostEventProps {
  name: string;
  eventDate: Date;
  quantParticipants: number;
  description: string;
  adress: string;
  city: string;
  state: string;
  postalCode: string
}

export interface EventReturnProps {
  id: string;
  name: string;
  eventDate: Date;
  quantParticipants: number;
  avaliable: boolean;
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