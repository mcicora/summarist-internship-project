import { getBookById } from "@/lib/books";

type ReaderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReaderPage({
  params,
}: ReaderPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <article className="reader-page">
      <header className="reader-page__header">
        <img
          className="reader-page__image"
          src={book.imageLink}
          alt={`Cover of ${book.title}`}
        />

        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
        </div>
      </header>

      <section className="reader-page__summary">
        <h2>Book Summary</h2>
        <p>{book.summary}</p>
      </section>
    </article>
  );
}