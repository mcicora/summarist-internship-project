"use client";

import {
  openLoginModal,
  openRegisterModal,
} from "@/app/features/auth/authSlice";
import { useAppDispatch } from "@/app/store/hooks";
import type { ButtonHTMLAttributes } from "react";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode?: "login" | "register";
};

export default function AuthButton({
  mode = "login",
  children,
  onClick,
  ...buttonProps
}: AuthButtonProps) {
  const dispatch = useAppDispatch();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    dispatch(
      mode === "login" ? openLoginModal() : openRegisterModal(),
    );
  }

  return (
    <button type="button" onClick={handleClick} {...buttonProps}>
      {children}
    </button>
  );
}
