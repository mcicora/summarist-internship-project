"use client";

type PlayerErrorProps = {
  reset: () => void;
};

export default function PlayerError({
  reset,
}: PlayerErrorProps) {
  return (
    <main className="page-error">
      <h1>Unable to load the audio</h1>

      <p>
        The book or its audio file could not be loaded.
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