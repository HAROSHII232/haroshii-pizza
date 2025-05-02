import { Ingredient, ProductItem } from "@prisma/client";
import { MAP_PIZZA_TYPE, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

/**
 * Retrieves the details of a pizza including its total price and textual description.
 *
 * @param type - The type of the pizza (e.g., traditional, thin).
 * @param size - The size of the pizza in centimeters.
 * @param items - A list of available product items with their types and sizes.
 * @param ingredients - A list of all possible ingredients with their prices.
 * @param selectedIngredients - A set of ingredient IDs selected for the pizza.
 * @returns An object containing the total price of the pizza and a text description of its size and type.
 */

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  const textDetails = `${size} см, ${MAP_PIZZA_TYPE[type]} тесто`;

  return { totalPrice, textDetails };
};
