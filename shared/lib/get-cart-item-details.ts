import { Ingredient } from "@prisma/client";
import { MAP_PIZZA_TYPE, PizzaSize, PizzaType } from "../constants";

export const getCartItemDetails = (
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[]
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
