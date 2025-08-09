import { UserPost } from "../types/userTypes";
import { api } from "./api";
import { erroProps } from "../types/errorTypes";

export async function postUserData(
  user: UserPost
): Promise<boolean | erroProps> {
  try {
    const response = await api.post("/Auth/register", {
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      name: user.name,
      userName: user.userName,
      adress: user.adress,
      city: user.city,
      state: user.state,
      postalCode: user.postalCode,
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
    } else 
      {const message = Object.values(error.response.data.errors);
      console.log(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    }
  }
}
