"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

import {
  closeAuthModal,
  showLogin,
  showRegister,
} from "@/app/features/auth/authSlice";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import styles from "./AuthModal.module.css";

function getFirebaseErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/missing-password":
      return "Please enter your password.";

    case "auth/weak-password":
      return "Your password must contain at least six characters.";

    case "auth/email-already-in-use":
      return "An account already exists with this email address.";

    case "auth/invalid-credential":
      return "The email or password is incorrect.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before it finished.";

    case "auth/popup-blocked":
      return "The Google sign-in popup was blocked by your browser.";

    case "auth/cancelled-popup-request":
      return "The Google sign-in request was cancelled.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using another sign-in method.";

    case "auth/network-request-failed":
      return "A network error occurred. Check your connection and try again.";

    default:
      return "Authentication failed. Please try again.";
  }
}

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isModalOpen, modalMode } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = modalMode === "login";

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

  function handleAuthenticationSuccess() {
    setEmail("");
    setPassword("");
    setErrorMessage("");

    dispatch(closeAuthModal());
    router.push("/for-you");
  }

  async function handleGuestLogin() {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signInAnonymously(auth);
      handleAuthenticationSuccess();
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (!isLogin && password.length < 6) {
      setErrorMessage("Your password must contain at least six characters.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
      } else {
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      }

      handleAuthenticationSuccess();
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const googleProvider = new GoogleAuthProvider();

      await signInWithPopup(auth, googleProvider);

      handleAuthenticationSuccess();
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleModeChange() {
    setErrorMessage("");
    setPassword("");

    if (isLogin) {
      dispatch(showRegister());
    } else {
      dispatch(showLogin());
    }
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
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
          disabled={isSubmitting}
          onClick={() => dispatch(closeAuthModal())}
        >
          ×
        </button>

        <h2 id="auth-modal-title" className={styles.title}>
          {isLogin ? "Log in to Summarist" : "Sign up for Summarist"}
        </h2>

        <button
          className="guestButton"
          type="button"
          disabled={isSubmitting}
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </button>

         <div className={styles.divider}>
          <span>or</span>
        </div>

        <button
          className={styles.googleButton}
          type="button"
          disabled={isSubmitting}
          onClick={handleGoogleSignIn}
        >
          {isSubmitting ? "Please wait..." : "Continue with Google"}
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form className={styles.form} onSubmit={handleEmailSubmit}>
          <label htmlFor="auth-email">Email</label>

          <input
            id="auth-email"
            name="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isSubmitting}
            required
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />

          <label htmlFor="auth-password">Password</label>

          <input
            id="auth-password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            disabled={isSubmitting}
            required
            minLength={6}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage("");
            }}
          />

          {errorMessage && (
            <p className={styles.errorMessage} role="alert">
              {errorMessage}
            </p>
          )}

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : isLogin
                ? "Login"
                : "Create account"}
          </button>
        </form>

        <button
          className={styles.switchButton}
          type="button"
          disabled={isSubmitting}
          onClick={handleModeChange}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <strong>{isLogin ? " Sign up" : " Login"}</strong>
        </button>
      </section>
    </div>
  );
}
