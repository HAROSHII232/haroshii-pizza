"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const handleAddToCart = async (
    productItemId?: number,
    selectedIngredients?: number[]
  ) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients: selectedIngredients,
      });

      toast.success("Товар успешно добавлен в корзину");
      router.back();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину  ");
      console.error("Add to cart error:", error);
    }
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
            onSubmit={handleAddToCart}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={handleAddToCart}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
