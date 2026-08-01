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
      <div className="book-card__image-wrapper">
        <img
          className="book-card__image"
          src={book.imageLink}
          alt={`Cover of ${book.title}`}
        />

        {book.subscriptionRequired && (
          <span className="book-card__premium">
            Premium
          </span>
        )}
      </div>

      <div className="book-card__content">
        <h3 className="book-card__title">
          {book.title}
        </h3>

        <p className="book-card__author">
          {book.author}
        </p>

        <p className="book-card__subtitle">
          {book.subTitle}
        </p>
      </div>
    </Link>
  );
}
