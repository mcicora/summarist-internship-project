"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SettingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut(auth);

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <main className="settings-page">
      <h1 className="settings-page__title">Settings</h1>

      <section className="settings-page__section">
        <div className="settings-page__item">
          <h2>Your Subscription Plan</h2>
          <p>Premium</p>
        </div>

        <div className="settings-page__item">
          <h2>Email</h2>
          <p>
            {user?.isAnonymous
              ? "Guest"
              : (user?.email ?? "No email available")}
          </p>
        </div>
        <div className="settings-page__item">
          <button className="settings-page__logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </section>
    </main>
  );
}
