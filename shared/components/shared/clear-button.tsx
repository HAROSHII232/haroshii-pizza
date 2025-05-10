import { cn } from "@/shared/lib";
import { X as ClearIcon } from "lucide-react";

type Props = {
  onClick?: VoidFunction;
  className?: string;
};

export const ClearButton = ({ onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}
    >
      <ClearIcon className="h-5 w-5" />
    </button>
  );
};
