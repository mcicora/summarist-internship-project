"use client";

type BookErrorProps = {
  reset: () => void;
};

export default function BookError({
  reset,
}: BookErrorProps) {
  return (
    <main className="page-error">
      <h1>Unable to load this book</h1>

      <p>
        Something went wrong while retrieving the book details.
      </p>

      <button
        type="button"
        className="page-error__button"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}