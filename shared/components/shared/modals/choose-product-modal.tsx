"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const addCartItem = useCartStore((state) => state.addCartItem);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    });
  };

  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredients,
    });
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "w-[1060px] max-w-[1060px] min-h-[550px] p-0 bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onAddProduct}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
