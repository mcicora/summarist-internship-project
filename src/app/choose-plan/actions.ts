"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getStripe } from "@/lib/stripe";

const plans = {
  monthly: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID,
    trialPeriodDays: undefined,
  },
  yearly: {
    priceId: process.env.STRIPE_YEARLY_PRICE_ID,
    trialPeriodDays: 7,
  },
} as const;

export async function createCheckoutSession(formData: FormData) {
  const planName = formData.get("plan");

  if (planName !== "monthly" && planName !== "yearly") {
    throw new Error("Please select a valid subscription plan.");
  }

  const plan = plans[planName];

  if (!plan.priceId) {
    throw new Error(
      `Missing Stripe price ID for the ${planName} subscription plan.`,
    );
  }

  const requestHeaders = await headers();
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ?? requestHeaders.get("origin");

  if (!origin) {
    throw new Error("Unable to determine the application URL.");
  }

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: plan.priceId, quantity: 1 }],
    success_url: `${origin}/choose-plan/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/choose-plan?checkout=cancelled`,
    allow_promotion_codes: true,
    subscription_data: plan.trialPeriodDays
      ? { trial_period_days: plan.trialPeriodDays }
      : undefined,
    metadata: { plan: planName },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL.");
  }

  redirect(session.url);
}
