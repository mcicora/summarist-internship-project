import { getBookById } from "@/lib/books";
import BookActions from "@/components/books/BookActions";
import type { Metadata } from "next";
import LibraryButton from "@/components/books/LibraryButton";

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);

  return {
    title: `${book.title} | Summarist`,
    description: book.subTitle,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <main className="book-details">

      <img
        className="book-details__image"
        src={book.imageLink}
        alt={`Cover of ${book.title}`}
      />

      <div className="book-details__content">
        <h1>{book.title}</h1>

        {book.subscriptionRequired && (
          <span className="book-details__premium">Premium</span>
        )}

        <p className="book-details__author">{book.author}</p>

        <p>{book.subTitle}</p>

        <p>
          <strong>{book.averageRating}</strong> average rating
        </p>

        <p>
          <strong>{book.keyIdeas}</strong> key ideas
        </p>
        <BookActions bookId={book.id} />

        <LibraryButton bookId={book.id} />

        <section className="book-details__summary">
          <h2>What’s it about?</h2>
          <p>{book.summary}</p>
        </section>
      </div>
    </main>
  );
}
