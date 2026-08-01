"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SearchFormProps = {
  initialQuery: string;
};

export default function SearchForm({ initialQuery }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form className="search-page__form" onSubmit={handleSubmit}>
      <label htmlFor="book-search" className="search-page__label">
        Search by title or author
      </label>

      <input
        id="book-search"
        className="search-page__input"
        type="search"
        placeholder="Search books..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className="search-page__actions">
        <button type="submit" className="search-page__button">
          Search
        </button>

        {initialQuery && (
          <button
            type="button"
            className="search-page__clear-button"
            onClick={() => {
              setQuery("");
              router.push("/search");
            }}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
