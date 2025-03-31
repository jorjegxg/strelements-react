import { CONFIG } from "./constants";

export const MyLocalStorage = {
  accessToken: process.env.NODE_ENV === 'development' ? process.env.ACCESS_TOKEN :
    localStorage.getItem(CONFIG.accessToken)!

}