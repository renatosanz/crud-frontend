import { environment } from "../env";
import axios from "axios";

export async function registerUser(data: any) {
  console.log('data', data)
  try {
    const response = await axios
      .post(`${environment.url_api}/user`, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
