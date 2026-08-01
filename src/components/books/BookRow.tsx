import BookCard from "@/components/books/BookCard";
import type { Book } from "@/types/book";

type BookRowProps = {
  title: string;
  subtitle?: string;
  books: Book[];
};

export default function BookRow({
  title,
  subtitle,
  books,
}: BookRowProps) {
  return (
    <section className="for-you__section">
      <h2 className="for-you__section-title">{title}</h2>

      {subtitle && (
        <p className="for-you__section-subtitle">
          {subtitle}
        </p>
      )}

      {books.length === 0 ? (
        <p className="book-row__empty">
          No books are available right now.
        </p>
      ) : (
        <div className="book-row">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}