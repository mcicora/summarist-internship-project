"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchHeader() {
  const [search, setSearch] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();


    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      return;
    }

    console.log("Search Submitted:", trimmedSearch);
  }

  return (
    <header className="search-header">
      <form onSubmit={handleSubmit} role="search" className="search-form">
        <label htmlFor="book-search" className="sr-only">
          Search by title or author
        </label>

        <input
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
          aria-label="Submit Search"
        >
          <FiSearch aria-hidden="true" />
        </button>
      </form>
    </header>
  );
}
