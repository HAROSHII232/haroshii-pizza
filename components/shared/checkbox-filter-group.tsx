"use client";

import { ChangeEvent, useState } from "react";
import { Input, Skeleton } from "../ui";
import { FilterCheckbox, FilterCheckBoxProps } from "./filter-checkbox";

type Item = FilterCheckBoxProps;

type Props = {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
  loading?: boolean;
};

export const CheckboxFilterGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  loading,
  onChange,
  defaultValue,
}: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const visibleItems = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <Input
          onChange={handleSearchInputChange}
          placeholder={searchInputPlaceholder}
          className="mb-5 bg-gray-50 border-none"
        />
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {visibleItems.map((item) => (
          <FilterCheckbox
            onCheckedChange={(ids) => console.log(ids)}
            checked={false}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button onClick={handleShowAll} className="text-primary mt-3">
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
