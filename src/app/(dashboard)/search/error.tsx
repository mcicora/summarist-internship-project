"use client";

type SearchErrorProps = {
  reset: () => void;
};

export default function SearchError({
  reset,
}: SearchErrorProps) {
  return (
    <main className="page-error">
      <h1>Unable to search books</h1>

      <p>
        Something went wrong while loading the book results.
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