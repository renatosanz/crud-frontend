import { environment } from "../env";
import axios from "axios";

export async function registerUser(data: any) {
  try {
    const response = await axios.post(
      `${environment.url_api}/user/register`,
      data
    );
    console.log("Usuario registrado exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

export async function loginUser(data: any) {
  try {
    const response = await axios.post(
      `${environment.url_api}/user/login`,
      data,
      {
        withCredentials: true,
      }
    );

    if (response.data.ok) {
      return true;
    } else {
      console.error("No se recibió token en la respuesta.");
      return false;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return false;
  }
}

export async function getUserData() {
  try {
    const response = await axios.get(`${environment.url_api}/user/protected`, {
      withCredentials: true,
    });

    if (response.data) {
      console.error("Data OK.");
      return response.data.data;
    } else {
      console.error("Error on get protected data.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}
