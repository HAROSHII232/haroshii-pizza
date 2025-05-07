import { CartDTO } from "../services/dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
};

/**
 * Transforms raw cart data into a structured format with detailed cart item information.
 *
 * @param cartData - The raw cart data containing items and their details.
 * @returns An object containing a list of cart items with their details and the total cart amount.
 */

export const getCartDetails = (cartData: CartDTO): ReturnProps => {
  const cartItems = cartData.items.map((cartItem) => ({
    id: cartItem.id,
    quantity: cartItem.quantity,
    name: cartItem.productItem.product.name,
    imageUrl: cartItem.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(cartItem),
    pizzaSize: cartItem.productItem.size,
    pizzaType: cartItem.productItem.pizzaType,
    disabled: false,
    ingredients: cartItem.ingredients.map(({ name, price }) => ({
      name,
      price,
    })),
  })) as CartStateItem[];

  return {
    items: cartItems,
    totalAmount: cartData.totalAmount,
  };
};
