"use client";

import { PropsWithChildren, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "../ui";
import { Title } from "./title";
import { CartDrawerItem } from "./cart-drawer-item";

import { cn, getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants";

export const CartDrawer = ({ children }: PropsWithChildren) => {
  const [
    items,
    totalAmount,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
  ] = useCartStore((state) => [
    state.items,
    state.totalAmount,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCountButtonClick = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between pb-0 bg-[#F4F1EE]"
        aria-describedby={undefined}
      >
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          <SheetHeader>
            {totalAmount > 0 ? (
              <SheetTitle>
                Товаров в корзине:{" "}
                <span className="font-bold">{items.length}</span>
              </SheetTitle>
            ) : (
              <SheetTitle asChild>
                <VisuallyHidden>Корзина пуста</VisuallyHidden>
              </SheetTitle>
            )}
          </SheetHeader>

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Пустая корзина"
                width={120}
                height={120}
                aria-hidden="true"
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>

              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div key={item.id} className="mb-2">
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      disabled={item.disabled}
                      onClickCountButton={(type) =>
                        handleCountButtonClick(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                      details={
                        item.pizzaType && item.pizzaSize
                          ? getCartItemDetails(
                              item.ingredients,
                              item.pizzaType as PizzaType,
                              item.pizzaSize as PizzaSize
                            )
                          : ""
                      }
                    />
                  </div>
                ))}
              </div>
              <SheetFooter className="bg-white -mx-6 p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>

                  <Link href="/cart">
                    <Button type="submit" className="w-full h-12 text-base">
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
