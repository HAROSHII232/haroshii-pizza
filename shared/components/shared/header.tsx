"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

import { CartButton } from "./cart-button";
import { Container } from "./container";
import { SearchInput } from "./search-input";
import { ProfileButton } from "./profile-button";

import { cn } from "@/shared/lib/utils";

type Props = {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
};

export const Header = ({
  hasSearch = true,
  hasCart = true,
  className,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("paid")) {
      setTimeout(() => {
        toast.success("Заказ успешно оплачен!");
        const params = new URLSearchParams(searchParams);
        params.delete("paid");

        router.replace(`?${params.toString()}`);
      }, 500);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Haroshii Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <ProfileButton />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
