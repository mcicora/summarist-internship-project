import AudioPlayer from "../AudioPlayer";
import BackToBooksLink from "@/components/books/BackToBooksLink";
import { getBookById } from "@/lib/books";

type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <>
      <BackToBooksLink />

      <section className="player-page">
        <div className="player-page__content">
          <h1>{book.title}</h1>

          <p className="player-page__author">{book.author}</p>

          <AudioPlayer audioUrl={book.audioLink} bookId={book.id} />

          <section className="player-page__summary">
            <h2>Book Summary</h2>

            <p>{book.summary}</p>
          </section>
        </div>
      </section>
    </>
  );
}
