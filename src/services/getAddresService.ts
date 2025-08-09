import axios from "axios";
import { AdressType } from "../types/addressTypes";
import { erroProps } from "../types/errorTypes";

async function getAdress(cep: string): Promise<AdressType | erroProps> {
  try {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      //   throw new Error("CEP inválido. Use 8 dígitos numéricos.");
      return {
        success: false,
        errors: ["CEP inválido. Use 8 dígitos numéricos."],
      };
    }

    const response = await axios.get(
      `https://viacep.com.br/ws/${cleanCep}/json/`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        errors: [""],
      };
    } else {
      return {
        success: false,
        errors: [""],
      };
    }
  }
}

export default getAdress;
