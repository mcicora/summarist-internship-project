"use client";

import {
  openLoginModal,
  openRegisterModal,
} from "@/app/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isAuthLoading } = useAppSelector((state) => state.auth);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented || isAuthLoading) {
      return;
    }

    if (user) {
      router.push("/for-you");
      return;
    }

    if (mode === "register") {
      dispatch(openRegisterModal());
    } else {
      dispatch(openLoginModal());
    }
  }
  return (
  <button
    type="button"
    onClick={handleClick}
    {...buttonProps}
  >
    {children}
  </button>
);
}
