import { useEffect } from "react";
import { CartStateItem } from "../lib";
import { CreateCartItemValuesDTO } from "../services/dto";
import { useCartStore } from "../store";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  addCartItem: (values: CreateCartItemValuesDTO) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  handleCountButtonClick: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  const handleCountButtonClick = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    cartState.updateItemQuantity(id, newQuantity);
  };

  return {
    ...cartState,
    handleCountButtonClick,
  };
};
