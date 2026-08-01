import BookRow from "@/components/books/BookRow";
import SearchForm from "@/components/search/SearchForm";
import {
  getRecommendedBooks,
  getSelectedBooks,
  getSuggestedBooks,
} from "@/lib/books";
import type { Book } from "@/types/book";

type SearchPageProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { query = "" } = await searchParams;
  const trimmedQuery = query.trim().toLowerCase();

  let matchingBooks: Book[] = [];

  if (trimmedQuery) {
    const [
      selectedBooks,
      recommendedBooks,
      suggestedBooks,
    ] = await Promise.all([
      getSelectedBooks(),
      getRecommendedBooks(),
      getSuggestedBooks(),
    ]);

    const allBooks = [
      ...selectedBooks,
      ...recommendedBooks,
      ...suggestedBooks,
    ];

    const uniqueBooks = Array.from(
      new Map(
        allBooks.map((book) => [book.id, book]),
      ).values(),
    );

    matchingBooks = uniqueBooks.filter((book) => {
      const title = book.title?.toLowerCase() ?? "";
      const author = book.author?.toLowerCase() ?? "";

      return (
        title.includes(trimmedQuery) ||
        author.includes(trimmedQuery)
      );
    });
  }

  return (
    <main className="search-page">
      <h1 className="search-page__title">
        Search for books
      </h1>

      <SearchForm initialQuery={query} />

      {query ? (
        <BookRow
          title={`Results for “${query}”`}
          books={matchingBooks}
        />
      ) : (
        <div className="search-page__results">
          <p>
            Enter a title or author to begin searching.
          </p>
        </div>
      )}
    </main>
  );
}