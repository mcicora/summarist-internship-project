"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function SearchHeader() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      router.push("/search");
      return;
    }

    router.push(
      `/search?query=${encodeURIComponent(trimmedSearch)}`,
    );
  }

  return (
    <header className="search-header">
      <form
        onSubmit={handleSubmit}
        role="search"
        className="search-form"
      >
        <label
          htmlFor="header-book-search"
          className="sr-only"
        >
          Search by title or author
        </label>

        <input
          id="header-book-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="search-form__input"
          placeholder="Search for books"
          autoComplete="off"
        />

        <button
          className="search-form__button"
          type="submit"
          aria-label="Submit search"
        >
          <FiSearch aria-hidden="true" />
        </button>
      </form>
    </header>
  );
}
