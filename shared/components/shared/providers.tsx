"use client";

import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader showSpinner={false} />
    </>
  );
};
