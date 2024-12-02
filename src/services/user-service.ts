import { environment } from "../env";
import axios from "axios";
import Cookies from "js-cookie";

export async function registerUser(data: any) {
  try {
    const response = await axios.post(`${environment.url_api}/user`, data);
    console.log("Usuario registrado exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

export async function loginUser(data: any) {
  try {
    const response = await axios.post(`${environment.url_api}/login`, data);

    if (response.data && response.data.token) {
      Cookies.set("token", response.data.token, { expires: 1 });
      return response.data;
    } else {
      console.error("No se recibió token en la respuesta.");
      return null;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
}
