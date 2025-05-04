import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { PizzaSize, PizzaType } from "../constants";
import { getAvailablePizzaSizes } from "../lib";
import { Variant } from "../components/shared/group-variants";

type ReturnProps = {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
};

const DEFAULT_PIZZA_SIZE: PizzaSize = 20;
const DEFAULT_PIZZA_TYPE: PizzaType = 1;

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(DEFAULT_PIZZA_SIZE);
  const [type, setType] = useState<PizzaType>(DEFAULT_PIZZA_TYPE);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailablePizzaSizes(items, type);

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
