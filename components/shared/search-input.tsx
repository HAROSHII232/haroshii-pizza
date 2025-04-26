"use client";

import { cn } from "@/shared/lib";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

type Props = {
  className?: string;
};

export const SearchInput = ({ className }: Props) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30"></div>
      )}

      <div
        className={cn(
          "flex flex-1 justify-between rounded-2xl relative h-11 z-30",
          className
        )}
        ref={ref}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="w-full pl-11 rounded-2xl outline-none bg-gray-100"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
        />

        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          <Link
            href={"/product/1"}
            className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
          >
            <img
              className="rounded-sm h-8 w-8"
              src="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
              alt="pizza 1"
            />
            <span>Pizza 1</span>
          </Link>
        </div>
      </div>
    </>
  );
};
