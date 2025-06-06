import { PizzaSize } from "@/shared/constants";
import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export type CartDTO = {
  items: CartItemDTO[];
} & Cart;

export type CreateCartItemValuesDTO = {
  productItemId: number;
  ingredients?: number[];
};
