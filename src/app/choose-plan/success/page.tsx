import Link from "next/link";

import { getStripe } from "@/lib/stripe";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const session = await getCheckoutSession(sessionId);
  const checkoutSucceeded =
    session?.status === "complete" &&
    (session.payment_status === "paid" ||
      session.payment_status === "no_payment_required");

  return (
    <main className="choose-plan">
      <section className="choose-plan__hero">
        <div className="choose-plan__container">
          <h1>
            {checkoutSucceeded
              ? "Welcome to Summarist Premium"
              : "We could not confirm your checkout"}
          </h1>
          <p>
            {checkoutSucceeded
              ? "Your checkout was completed successfully."
              : "Return to the plans page and try again."}
          </p>
          <Link
            className="choose-plan__checkout"
            href={checkoutSucceeded ? "/for-you" : "/choose-plan"}
          >
            {checkoutSucceeded ? "Start exploring" : "Back to plans"}
          </Link>
        </div>
      </section>
    </main>
  );
}

async function getCheckoutSession(sessionId?: string) {
  if (!sessionId) return null;

  try {
    return await getStripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}
