import { getBookById } from "@/lib/books";

type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({
  params,
}: PlayerPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <section className="player-page">
      <img
        className="player-page__image"
        src={book.imageLink}
        alt={`Cover of ${book.title}`}
      />

      <div className="player-page__content">
        <h1>{book.title}</h1>

        <p className="player-page__author">{book.author}</p>

        <audio
          className="player-page__audio"
          src={book.audioLink}
          controls
        >
          Your browser does not support audio playback.
        </audio>
      </div>
    </section>
  );
}

