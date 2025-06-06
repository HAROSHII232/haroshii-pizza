import { MAP_PIZZA_TYPE, PizzaSize, PizzaType } from "../constants";
import { CartStateItem } from "./get-cart-details";

/**
 * Constructs a string detailing the cart item based on pizza type, size, and ingredients.
 *
 * @param type - The type of the pizza (e.g., traditional, thin).
 * @param size - The size of the pizza in centimeters.
 * @param ingredients - A list of ingredients included in the pizza.
 * @returns A string representing the pizza details, including its type, size, and ingredients.
 */

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  type?: PizzaType,
  size?: PizzaSize
): string => {
  const details: string[] = [];

  if (size && type) {
    const typeName = MAP_PIZZA_TYPE[type];
    details.push(`${typeName} ${size} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map(({ name }) => name));
  }

  return details.join(", ");
};
