"use client";

import { Input } from "../ui";
import { CheckboxFilterGroup } from "./checkbox-filter-group";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";

type Props = {
  className?: string;
};

export const Filters = ({ className }: Props) => {
  const { ingredients, isLoading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  const priceFrom = filters.prices.priceFrom ?? "";
  const priceTo = filters.prices.priceTo ?? "";

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-extrabold" />

      <CheckboxFilterGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFilterGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={priceFrom}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value) || 0)
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={priceTo}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value) || 1000)
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            Number(filters.prices.priceFrom) || 0,
            Number(filters.prices.priceTo) || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFilterGroup
        title="Ингридиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        isLoading={isLoading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
