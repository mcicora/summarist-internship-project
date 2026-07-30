"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { setAuthUser } from "@/app/features/auth/authSlice";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/app/store/hooks";

export default function AuthObserver() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(setAuthUser(null));
        return;
      }

      dispatch(
        setAuthUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }),
      );
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
}