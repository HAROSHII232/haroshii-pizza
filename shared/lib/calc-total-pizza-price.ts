import { ProductItem, Ingredient } from "@prisma/client";
import { PizzaType, PizzaSize } from "../constants";

/**
 * Calculates the total price of a pizza based on its type, size, and selected ingredients.
 *
 * @param type - The type of the pizza (e.g., traditional, thin).
 * @param size - The size of the pizza (e.g., small, medium, large).
 * @param items - A list of available product items with their types and sizes.
 * @param ingredients - A list of all possible ingredients with their prices.
 * @param selectedIngredients - A set of ingredient IDs selected for the pizza.
 * @returns The total price of the pizza including the base price and the price of selected ingredients.
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
): number => {
  const basePrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const ingredientsPrice = ingredients.reduce((total, ingredient) => {
    return selectedIngredients.has(ingredient.id)
      ? total + ingredient.price
      : total;
  }, 0);

  return basePrice + ingredientsPrice;
};
