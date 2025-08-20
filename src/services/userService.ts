import { UserLogin, UserPost } from "../types/userTypes";
import { erroProps } from "../types/errorTypes";
import axios from "axios";
import { DataProps} from "../context/AuthContext";
import { AUTH_LOGIN, AUTH_REGISTER } from "../utils/endpoints";
import api from "./api";


export async function postUserData(
  user: UserPost
): Promise<boolean | erroProps> {
  try {
    const response = await api.post(AUTH_REGISTER, {
      email: user.email,
      password: user.passWord,
      confirmPassword: user.confirmPassword,
      name: user.name,
      userName: user.userName,
      adress: user.addres.logradouro,
      city: user.addres.localidade,
      state: user.addres.uf,
      postalCode: user.addres.cep,
      photo: "",
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

export async function loginUser(
  userlogin: UserLogin
): Promise<erroProps | DataProps> {
  try {
    const response = await api.post(
      AUTH_LOGIN,
      {
        userName: userlogin.userName,
        password: userlogin.passWord,
      },
      { timeout: 5000 }
    );

    return response?.data.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return <erroProps>{
        success: false,
        errors: ["servidor fora do ar"],
      };
    } else {
      if (error.response) {
        const message = Object.values(error.response.data.errors);
        return <erroProps>{
          success: false,
          errors: message,
        };
      }
    }
    if (error.response?.data) {
      const message = Object.values(error.response.data.errors);

      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      return <erroProps>{
        success: false,
        errors: ["Erro ao se conectar com o servidor"],
      };
    }
  }
}
