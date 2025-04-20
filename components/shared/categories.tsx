import { cn } from "@/shared/lib";

type Props = {
  className?: string;
};

const CATEGORIES_LIST = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
  "Десерты",
];
const ACTIVE_INDEX = 0;

export const Categories = ({ className }: Props) => {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {CATEGORIES_LIST.map((category, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 px-5 rounded-2xl",
            ACTIVE_INDEX === index &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          <button>{category}</button>
        </a>
      ))}
    </div>
  );
};
