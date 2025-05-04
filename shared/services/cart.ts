import { Cart } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<Cart> => {
  const { data } = await axiosInstance.get<Cart>(ApiRoutes.CART);

  return data;
};
