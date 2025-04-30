import { API } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useState, useEffect } from "react";

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setIsLoading(true);
        const ingredients = await API.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    ingredients,
    isLoading,
  };
};
