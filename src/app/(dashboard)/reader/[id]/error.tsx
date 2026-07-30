"use client";

type ReaderErrorProps = {
  reset: () => void;
};

export default function ReaderError({
  reset,
}: ReaderErrorProps) {
  return (
    <main className="page-error">
      <h1>Unable to load the summary</h1>

      <p>
        Something went wrong while retrieving this book.
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