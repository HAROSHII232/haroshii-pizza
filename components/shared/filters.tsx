"use client";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input } from "../ui";
import { CheckboxFilterGroup } from "./checkbox-filter-group";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";

type Props = {
  className?: string;
};

export const Filters = ({ className }: Props) => {
  const { ingredients } = useFilterIngredients();
  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-extrabold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>

      <CheckboxFilterGroup
        title="Ингридиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading
      />
    </div>
  );
};
