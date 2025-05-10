"use client";

import {
  CheckoutItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import {
  ArrowRight as ArrowRightIcon,
  Package as PackageIcon,
  Percent as PercentIcon,
  Truck as TruckIcon,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, totalAmount, removeCartItem, handleCountButtonClick } =
    useCart();

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
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
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-5">
                <Input
                  name="adress"
                  className="text-base"
                  placeholder="Введите адрес..."
                />
                <Textarea
                  className="text-base resize-none"
                  rows={5}
                  placeholder="Комментарий к заказу"
                />
              </div>
            </div>
          </WhiteBlock>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[450px]">
          <WhiteBlock className="sticky top-4 p-6">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого</span>
              <span className="text-[34px] font-extrabold">{totalAmount}</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <PackageIcon size={18} className="mr-2 text-gray-400" />
                  Стоимость товаров:
                </div>
              }
              value="3000 ₽"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <PercentIcon size={18} className="mr-2 text-gray-400" />
                  Налоги:
                </div>
              }
              value="240 ₽"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <TruckIcon size={18} className="mr-2 text-gray-400" />
                  Доставка:
                </div>
              }
              value="120 ₽"
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRightIcon className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
