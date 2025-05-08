import { PropsWithChildren, ReactNode } from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib";

type Props = PropsWithChildren & {
  className?: string;
  contentClassName?: string;
  title?: string;
  endAdornment?: ReactNode;
};

export const WhiteBlock = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}: Props) => {
  return (
    <section className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </section>
  );
};
