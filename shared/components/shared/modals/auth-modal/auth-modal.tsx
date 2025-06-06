"use client";

import { Button } from "@/shared/components/ui";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export const AuthModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogTitle className="sr-only">Форма для логина</DialogTitle>
        <DialogContent
          className="w-[450px] bg-white p-10"
          aria-describedby={undefined}
        >
          {type === "login" ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} />
          )}
          <hr />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 flex-1"
            >
              <img
                className="w-6 h-6"
                src="https://github.githubassets.com/favicons/favicon.svg"
              />
              GitHub
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 flex-1"
            >
              <img
                className="w-6 h-6"
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              />
              Google
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={onSwitchType}
            type="button"
            className="h-12"
          >
            {type !== "login" ? "Войти" : "Регистрация"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
