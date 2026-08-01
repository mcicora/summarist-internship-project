"use client";

import { useEffect, useState } from "react";

import BookCard from "@/components/books/BookCard";
import { getBookByIdClient } from "@/lib/books-client";
import type { Book } from "@/types/book";

import { getSavedBookIds, getFinishedBookIds } from "@/services/libraryService";
import { useAppSelector } from "@/app/store/hooks";

export default function LibraryPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function loadSavedBooks() {
      if (!user) {
        setSavedBooks([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const [savedBookIds, finishedBookIds] = await Promise.all([
          getSavedBookIds(user.uid),
          getFinishedBookIds(user.uid),
        ]);

        const [savedBookResults, finishedBookResults] = await Promise.all([
          Promise.all(savedBookIds.map((bookId) => getBookByIdClient(bookId))),
          Promise.all(
            finishedBookIds.map((bookId) => getBookByIdClient(bookId)),
          ),
        ]);

        if (!user) {
          setSavedBooks([]);
          setFinishedBooks([]);
          setIsLoading(false);
          return;
        }

        setSavedBooks(savedBookResults);
        setFinishedBooks(finishedBookResults);

        if (savedBookIds.length === 0) {
          setSavedBooks([]);
          return;
        }

        const books = await Promise.all(
          savedBookIds.map((bookId) => getBookByIdClient(bookId)),
        );

        setSavedBooks(books);
      } catch (error) {
        console.error("Unable to load saved books:", error);

        setErrorMessage("We couldn't load your saved books. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadSavedBooks();
  }, [user]);

  return (
    <main className="library-page">
      <h1 className="library-page__title">My Library</h1>

      <section className="library-page__section">
        <h2 className="library-page__section-title">Saved Books</h2>

        {isLoading ? (
          <p className="library-page__message">Loading your library...</p>
        ) : errorMessage ? (
          <p className="library-page__error" role="alert">
            {errorMessage}
          </p>
        ) : savedBooks.length === 0 ? (
          <div className="library-page__empty">
            <h3>Your library is empty</h3>

            <p>
              Open a book and select “Add title to My Library” to save it here.
            </p>
          </div>
        ) : (
          <div className="library-page__books">
            {savedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
      <section className="library-page__section">
        <h2 className="library-page__section-title">Finished Books</h2>

        {isLoading ? (
          <p className="library-page__message">Loading finished books...</p>
        ) : finishedBooks.length === 0 ? (
          <div className="library-page__empty">
            <h3>No finished books yet</h3>

            <p>
              A book will appear here after you listen to the complete audio.
            </p>
          </div>
        ) : (
          <div className="library-page__books">
            {finishedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
