import { prisma } from "@/prisma/prisma-client";
import { Cart } from "@prisma/client";

/**
 * Finds a cart by token and creates one if it doesn't exist.
 *
 * @param token The token of the cart to find or create.
 * @returns The found or created cart.
 */
export const findOrCreateCart = async (token: string): Promise<Cart> => {
  let cart = await prisma.cart.findFirst({ where: { token } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { token } });
  }

  return cart;
};
