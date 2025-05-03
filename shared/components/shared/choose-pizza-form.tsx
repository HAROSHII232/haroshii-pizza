"use client";

import { PIZZA_TYPES, PizzaSize, PizzaType } from "@/shared/constants";
import { usePizzaOptions } from "@/shared/hooks";
import { cn, getPizzaDetails } from "@/shared/lib";
import { Ingredient, ProductItem } from "@prisma/client";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredient-item";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";

type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCard?: VoidFunction;
  className?: string;
};

export const ChoosePizzaForm = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCard,
}: Props) => {
  const {
    size,
    type,
    availableSizes,
    selectedIngredients,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    onClickAddCard?.();
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={PIZZA_TYPES}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
