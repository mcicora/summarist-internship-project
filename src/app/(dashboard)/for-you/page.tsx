import BookCard from "@/components/books/BookCard";
import BookRow from "@/components/books/BookRow";
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
        <BookRow
          title="Recommended For You"
          subtitle="Books we think you'll enjoy"
          books={recommendedBooks}
        />
      </section>

      <section className="for-you__section">
        <BookRow
          title="Suggested Books"
          subtitle="Browse more books selected for you"
          books={suggestedBooks}
        />
      </section>
    </section>
  );
}
