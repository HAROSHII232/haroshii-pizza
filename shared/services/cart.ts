import { ApiRoutes } from "./constants";
import { CartDTO } from "./dto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);

  return data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>(
    `${ApiRoutes.CART}/${itemId}`,
    {
      quantity,
    }
  );

  return data;
};
