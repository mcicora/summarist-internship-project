"use client";

import { useEffect } from "react";
import {
  closeAuthModal,
  showLogin,
  showRegister,
} from "@/app/features/auth/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/store/hooks";
import styles from "./AuthModal.module.css";

export default function AuthModal() {
  const dispatch = useAppDispatch();

  const { isModalOpen, modalMode } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dispatch(closeAuthModal());
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch, isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  const isLogin = modalMode === "login";

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          dispatch(closeAuthModal());
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close authentication modal"
          onClick={() => dispatch(closeAuthModal())}
        >
          ×
        </button>

        <h2
          id="auth-modal-title"
          className={styles.title}
        >
          {isLogin ? "Log in to Summarist" : "Sign up for Summarist"}
        </h2>

        <button
          className={styles.googleButton}
          type="button"
        >
          Continue with Google
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form
          className={styles.form}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="auth-email">Email</label>

          <input
            id="auth-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="auth-password">Password</label>

          <input
            id="auth-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete={
              isLogin
                ? "current-password"
                : "new-password"
            }
            required
          />

          <button className={styles.submitButton} type="submit">
            {isLogin ? "Login" : "Create account"}
          </button>
        </form>

        <button
          className={styles.switchButton}
          type="button"
          onClick={() => {
            dispatch(isLogin ? showRegister() : showLogin());
          }}
        >
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <strong>
            {isLogin ? " Sign up" : " Login"}
          </strong>
        </button>
      </section>
    </div>
  );
}