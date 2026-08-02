"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";

import { createCheckoutSession } from "@/app/choose-plan/actions";
import CheckoutButton from "@/components/plans/CheckoutButton";

type PlanType = "monthly" | "yearly";

export default function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("yearly");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  type FAQItem = {
    question: string;
    answer: string;
  };

  const faqItems: FAQItem[] = [
    {
      question: "How does the free trial work?",
      answer:
        "The yearly plan begins with a seven-day free trial. After the trial ends, the yearly subscription begins.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes. You can cancel your subscription before the next billing date.",
    },
    {
      question: "What is included with Premium?",
      answer:
        "Premium gives you access to the book summaries, reading experience, and audio player available in the application.",
    },
    {
      question: "Can I switch between monthly and yearly plans?",
      answer: "Yes. You can select either option before beginning checkout.",
    },
  ];

  function toggleFAQ(index: number) {
    setOpenFAQIndex((currentIndex) => (currentIndex === index ? null : index));
  }

  return (
    <main className="choose-plan">
      <section className="choose-plan__hero">
        <div className="choose-plan__container">
          <h1>Get unlimited access to many amazing books</h1>

          <p>Turn ordinary moments into amazing learning opportunities.</p>

          <ul className="choose-plan__benefits">
            <li>
              <FaCheck aria-hidden="true" />
              <span>Key ideas from the world&apos;s best books</span>
            </li>

            <li>
              <FaCheck aria-hidden="true" />
              <span>Read or listen to summaries at your own pace</span>
            </li>

            <li>
              <FaCheck aria-hidden="true" />
              <span>Discover new titles selected for you</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="choose-plan__plans">
        <div className="choose-plan__container">
          <h2>Choose the plan that fits you</h2>

          <div className="choose-plan__options">
            <button
              type="button"
              className={`plan-option ${
                selectedPlan === "yearly" ? "plan-option--selected" : ""
              }`}
              aria-pressed={selectedPlan === "yearly"}
              onClick={() => {
                setSelectedPlan("yearly");
              }}
            >
              <span className="plan-option__badge">7-day free trial</span>

              <span className="plan-option__heading">Premium Plus Yearly</span>

              <span className="plan-option__price">$99.99/year</span>

              <span className="plan-option__description">
                Start your seven-day free trial, then pay annually.
              </span>
            </button>

            <button
              type="button"
              className={`plan-option ${
                selectedPlan === "monthly" ? "plan-option--selected" : ""
              }`}
              aria-pressed={selectedPlan === "monthly"}
              onClick={() => {
                setSelectedPlan("monthly");
              }}
            >
              <span className="plan-option__heading">Premium Monthly</span>

              <span className="plan-option__price">$9.99/month</span>

              <span className="plan-option__description">
                Pay monthly and cancel whenever you need.
              </span>
            </button>
          </div>

          <form action={createCheckoutSession}>
            <input type="hidden" name="plan" value={selectedPlan} />
            <CheckoutButton selectedPlan={selectedPlan} />
            <p className="choose-plan__notice">
              Secure checkout powered by Stripe. Cancel anytime.
            </p>
          </form>
        </div>
      </section>
      <section className="choose-plan__faq">
        <div className="choose-plan__container">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFAQIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article className="faq-item" key={item.question}>
                  <button
                    className="faq-item__question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{item.question}</span>

                    <span
                      className={`faq-item__icon ${
                        isOpen ? "faq-item__icon--open" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div id={answerId} className="faq-item__answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
