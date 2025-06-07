import { environment } from "../env";
import axios from "axios";
import Cookies from "js-cookie";

export function UserSchema() {
  return {
    email: "",
    username: "",
    password: "",
    password_validate: "",
    country: "",
  };
}

export async function registerUser(data: any) {
  try {
    const response = await axios.post(
      `${environment.url_api}/user/register`,
      data
    );
    if (response.data.ok) {
      console.log("Register successful", response.data);
      return response.data;
    } else {
      console.error("Error on register.");
      return response.data;
    }
  } catch (error) {
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
      Cookies.set("isLogged", "true");
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

    if (response.data.ok) {
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

export async function setUserData(new_data: any) {
  try {
    const response = await axios.patch(
      `${environment.url_api}/user/changedata`,
      new_data,
      {
        withCredentials: true,
      }
    );

    if (response.data.ok) {
      console.log("Data changed OK.");
      return response.data.user_data;
    } else {
      console.error("Error on change data.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}

export interface RandomMeal {
  title: string;
  img: string;
  ingredients?: Array<string>;
  description?: string;
  youtube_link?: string | null;
  origin?: string;
  category?: string;
  author?: string;
  source?: string;
}

// Request for a daily random meal from themealdb.com
// complete param is for retrive the complete recipe or just banner info
export async function getRandomDayMeal({
  completeData,
}: {
  completeData: boolean;
}): Promise<RandomMeal> {
  try {
    const response = await axios.get(
      `${environment.url_api}/user/random_day_meal?complete=${completeData}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.ok) {
      console.log("Random Meal received.", response.data.random_meal);
      return response.data.random_meal;
    } else {
      console.error("Error on get protected data.");
      return undefined;
    }
  } catch (error) {
    console.error("Error.");
    return undefined;
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

    if (response.data.ok) {
      Cookies.remove("isLogged");
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
