import axios from "axios"
import { Platform } from "react-native";


const baseURL =
  "https://appeventformobile-hsedbwbsftgtg7b7.brazilsouth-01.azurewebsites.net/api/v1";

export const api = axios.create({
  baseURL: baseURL
});
