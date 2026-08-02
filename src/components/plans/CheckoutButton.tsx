"use client";

import { useFormStatus } from "react-dom";

export default function CheckoutButton({
  selectedPlan,
}: {
  selectedPlan: "monthly" | "yearly";
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="choose-plan__checkout"
      disabled={pending}
    >
      {pending
        ? "Preparing checkout..."
        : selectedPlan === "yearly"
          ? "Start your free trial"
          : "Get Premium"}
    </button>
  );
}
