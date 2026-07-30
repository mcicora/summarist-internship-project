"use client";

import { useRouter } from "next/navigation";

type BookActionsProps = {
  bookId: string;
};

export default function BookActions({
  bookId,
}: BookActionsProps) {
  const router = useRouter();

  function handleRead() {
    router.push(`/reader/${bookId}`);
  }

  function handleListen() {
    router.push(`/player/${bookId}`);
  }

  return (
    <div className="book-details__actions">
      <button
        type="button"
        className="book-details__button"
        onClick={handleRead}
      >
        Read
      </button>

      <button
        type="button"
        className="book-details__button"
        onClick={handleListen}
      >
        Listen
      </button>
    </div>
  );
}