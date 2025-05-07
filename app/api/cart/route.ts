import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemValuesDTO } from "@/shared/services/dto";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error("[CART_GET] Server error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValuesDTO;

    // 1. Находим все товары в корзине с таким же productItemId
    const existingCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    // 2. Проверяем, есть ли товар с точно такими же ингредиентами
    let existedCartItem = null;
    const newIngredientIds = (data.ingredients || []).sort();

    for (const item of existingCartItems) {
      const existingIngredientIds = item.ingredients.map((i) => i.id).sort();

      if (
        JSON.stringify(existingIngredientIds) ===
        JSON.stringify(newIngredientIds)
      ) {
        existedCartItem = item;
        break;
      }
    }

    // 3. Если товар с такими же ингредиентами найден - увеличиваем количество
    if (existedCartItem) {
      await prisma.cartItem.update({
        where: {
          id: existedCartItem.id,
        },
        data: {
          quantity: existedCartItem.quantity + 1,
        },
      });
    } else {
      // 4. Если не найден - создаем новый элемент корзины
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })) || [],
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);
    return resp;
  } catch (error) {
    console.error("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}
