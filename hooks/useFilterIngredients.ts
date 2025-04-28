import { API } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

type ReturnProps = {
  ingredients: Ingredient[];
};

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await API.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients };
};
