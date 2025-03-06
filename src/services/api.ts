import axios from "axios";
import { RecipeResponse } from "../types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const api = {
  async searchRecipes(query: string): Promise<RecipeResponse> {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return response.data;
  },

  async getRecipeById(id: string): Promise<RecipeResponse> {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    return response.data;
  },

  async getRecipesByCategory(category: string): Promise<RecipeResponse> {
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    return response.data;
  },

  async getAllCategories(): Promise<{ meals: { strCategory: string }[] }> {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    return response.data;
  },

  async getRandomMeal(): Promise<RecipeResponse> {
    const response = await axios.get(`${BASE_URL}/random.php`);
    return response.data;
  },

  async getRecipesByArea(area: string): Promise<RecipeResponse> {
    const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
    return response.data;
  },

  async getRecipesByIngredient(ingredient: string): Promise<RecipeResponse> {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
    return response.data;
  },

  async getAllAreas(): Promise<{ meals: { strArea: string }[] }> {
    const response = await axios.get(`${BASE_URL}/list.php?a=list`);
    return response.data;
  },

  async getAllIngredients(): Promise<{ meals: { strIngredient: string }[] }> {
    const response = await axios.get(`${BASE_URL}/list.php?i=list`);
    return response.data;
  },

  getSmallImageUrl(imageUrl: string): string {
    return imageUrl.replace(
      "/images/media/meals/",
      "/images/media/meals/preview/"
    );
  },
};
