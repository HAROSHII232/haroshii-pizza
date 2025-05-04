import { CartItemDTO } from "../services/dto";

/**
 * Calculates the total price of a single cart item, taking into account the
 * base price of the pizza, the price of all selected ingredients, and the
 * quantity of the item.
 *
 * @param cartItem - The cart item to calculate the total price for.
 * @returns The total price of the cart item.
 */

export const calcCartItemTotalPrice = (cartItem: CartItemDTO): number => {
  const totalIngredientsPrice = cartItem.ingredients.reduce(
    (total, ingredient) => total + ingredient.price,
    0
  );

  const basePrice = cartItem.productItem.price;
  const quantity = cartItem.quantity;

  return (totalIngredientsPrice + basePrice) * quantity;
};
