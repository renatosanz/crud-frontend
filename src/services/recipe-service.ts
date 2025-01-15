import { environment } from "@/env";
import axios from "axios";

export function RecipeSchema() {
  return {
    title: "",
    description: "",
    upload_date: new Date(),
    path_image: "",
  };
}

export async function uploadRecipe(data: any) {
  try {
    console.log('data', data)
    const response = await axios.post(
      `${environment.url_api}/recipe/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.ok) {
      console.log("Recipe published", response.data);
      return response.data;
    } else {
      console.error("Error on publish recipe.");
      return response.data;
    }
  } catch (error) {
    console.error("Error.");
    throw error;
  }
}
