import Link from "next/link";
import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      className="book-card"
      href={`/book/${book.id}`}
    >
      <img
        className="book-card__image"
        src={book.imageLink}
        alt={`Cover of ${book.title}`}
      />

      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>

        <p className="book-card__author">{book.author}</p>

        <p className="book-card__subtitle">{book.subTitle}</p>
      </div>
    </Link>
  );
}
