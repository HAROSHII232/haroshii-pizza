"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/shared/lib";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";

type Props = {
  product: Product;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "w-[1060px] max-w-[1060px] min-h-[500px] p-0 bg-white overflow-hidden",
          className
        )}
      >
        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={[]}
        />
      </DialogContent>
    </Dialog>
  );
};
