import { environment } from "../env";
import axios from "axios";

export function UserSchema() {
  return {
    email: "",
    username: "",
    password: "",
    password_validate: "",
    age: 18,
    country: "",
  };
}

export async function registerUser(data: any) {
  try {
    const response = await axios.post(
      `${environment.url_api}/user/register`,
      data
    );
    console.log("Register successful", response.data);
    return response.data;
  } catch (error) {
    console.error("Error on register.");
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
      console.error("Not token provided.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}

export async function getUserData() {
  try {
    const response = await axios.get(`${environment.url_api}/user/protected`, {
      withCredentials: true,
    });

    if (response.data) {
      console.log("Protected Data OK.");
      return response.data.user_data;
    } else {
      console.error("Error on get protected data.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}

export async function logoutUser(last_login_date: Date) {
  try {
    const response = await axios.post(
      `${environment.url_api}/user/logout`,
      { action: "logout", last_login: last_login_date },
      {
        withCredentials: true,
      }
    );

    if (response.data) {
      console.log("User Logout!!!.");
      return true;
    } else {
      console.error("Error on Logout.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}
