"use client";

import { useAppSelector } from "@/app/store/hooks";

export default function AuthStatus() {
  const { user, isAuthLoading } = useAppSelector(
    (state) => state.auth,
  );

  if (isAuthLoading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div>
      <p>Signed in as:</p>

      <p>{user.displayName ?? user.email ?? "Summarist user"}</p>

      <p>User ID: {user.uid}</p>
    </div>
  );
}