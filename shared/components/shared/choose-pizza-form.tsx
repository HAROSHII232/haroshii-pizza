import {
  MAP_PIZZA_TYPE,
  PIZZA_SIZES,
  PIZZA_TYPES,
  PizzaSize,
  PizzaType,
} from "@/shared/constants";
import { cn } from "@/shared/lib";
import { Ingredient, ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
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

const DEFAULT_PIZZA_SIZE: PizzaSize = 20;
const DEFAULT_PIZZA_TYPE: PizzaType = 1;

export const ChoosePizzaForm = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCard,
}: Props) => {
  const [size, setSize] = useState<PizzaSize>(DEFAULT_PIZZA_SIZE);
  const [type, setType] = useState<PizzaType>(DEFAULT_PIZZA_TYPE);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const textDetails = `${size} см, ${MAP_PIZZA_TYPE[type]} тесто`;

  const handleClickAdd = () => {
    onClickAddCard?.();
  };

  const availablePizza = items.filter((item) => item.pizzaType === type);
  const availablePizzaSizes = PIZZA_SIZES.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizza.find(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
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
