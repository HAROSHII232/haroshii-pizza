import { ApiRoutes } from "./constants";
import { CartDTO } from "./dto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);

  return data;
};
