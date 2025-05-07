"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

type Props = {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
};

export const ProductForm = ({ product, onSubmit }: Props) => {
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
      onSubmit?.();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину  ");
      console.error("Add to cart error:", error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={handleAddToCart}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={handleAddToCart}
      loading={loading}
    />
  );
};
