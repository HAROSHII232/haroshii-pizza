import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSet } from "react-use";

type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

type QueryFilters = {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
} & PriceProps;

export const useFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toogleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setIngredients: toogleIngredients,
  };
};
