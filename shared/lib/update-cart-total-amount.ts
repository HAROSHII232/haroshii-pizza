import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

/**
 * Updates the total amount of a cart using the given token.
 *
 * @param token - The cart token.
 *
 * @returns The updated cart.
 */
export const updateCartTotalAmount = async (token: string) => {
  const cart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: {
          productItem: {
            include: { product: true },
          },
          ingredients: true,
        },
      },
    },
  });

  if (!cart) return;

  const totalAmount = cart.items.reduce(
    (total, item) => total + calcCartItemTotalPrice(item),
    0
  );

  return prisma.cart.update({
    where: { id: cart.id },
    data: { totalAmount },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: {
          productItem: {
            include: { product: true },
          },
          ingredients: true,
        },
      },
    },
  });
};
