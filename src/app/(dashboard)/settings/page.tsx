"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import AuthStatus from "@/components/auth/AuthStatus";
import { auth } from "@/lib/firebase";

export default function SettingsPage() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Unable to sign out:", error);
    }
  }

  return (
    <section>
      <h1>Settings</h1>

      <AuthStatus />

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}