import { environment } from "@/env";
import axios from "axios";

export function RecipeSchema() {
  return {
    title: "",
    description: "",
    uploaded_at: new Date(),
    path_image: "",
    ingredients: [{ id: crypto.randomUUID(), value: "" }],
  };
}

export async function uploadRecipe(data: any) {
  try {
    console.log("data", data);
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

export async function getRecipes() {
  try {
    const response = await axios.get(
      `${environment.url_api}/recipe/getUserRecipes`,
      {
        withCredentials: true,
      }
    );

    if (response.data.ok) {
      console.log("Recipes recived: ", response.data);
      return response.data;
    } else {
      console.error("Error getting recipes.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}

export async function searchRecipes(searchText: string) {
  try {
    const response = await axios.post(
      `${environment.url_api}/recipe/searchRecipes`,
      { search: searchText },
      {
        withCredentials: true,
      }
    );

    if (response.data.ok) {
      console.log("Recipes recived: ", response.data);
      return response.data.recipes;
    } else {
      console.error("Error getting recipes.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}

export async function getSingleRecipe(id: string) {
  try {
    const response = await axios.get(
      `${environment.url_api}/recipe/getRecipe?id=${id}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.ok) {
      console.log("Recipe recived: ", response.data);
      return response.data.recipe;
    } else {
      console.error("Error getting recipe.");
      return false;
    }
  } catch (error) {
    console.error("Error.");
    return false;
  }
}
