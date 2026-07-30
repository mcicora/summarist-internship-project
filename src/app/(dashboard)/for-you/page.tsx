import BookCard from "@/components/books/BookCard";
import {
  getRecommendedBooks,
  getSelectedBooks,
  getSuggestedBooks,
} from "@/lib/books";

export default async function ForYouPage() {
  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    getSelectedBooks(),
    getRecommendedBooks(),
    getSuggestedBooks(),
  ]);

  const selectedBook = selectedBooks[0];

  return (
    <section className="for-you">
      <h1 className="for-you__title">For You</h1>

      <section className="for-you__section">
        <h2 className="for-you__section-title">Selected just for you</h2>

        {selectedBook ? (
          <BookCard book={selectedBook} />
        ) : (
          <p>No selected book was found.</p>
        )}
      </section>

      <section className="for-you__section">
        <h2 className="for-you__section-title">Recommended For You</h2>

        <p className="for-you__section-subtitle">We think you’ll like these</p>

        <div className="book-row">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
      
      <section className="for-you__section">
        <h2 className="for-you__section-title">Suggested Books</h2>

        <p className="for-you__section-subtitle">
          Browse books we think you’ll enjoy
        </p>

        <div className="book-row">
          {suggestedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </section>
  );
}
