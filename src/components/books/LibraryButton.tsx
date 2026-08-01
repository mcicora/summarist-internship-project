"use client";

import { useEffect, useState } from "react";

import {
  addBookToLibrary,
  getSavedBookIds,
  removeBookFromLibrary,
} from "@/services/libraryService";
import { useAppSelector } from "@/app/store/hooks";

type LibraryButtonProps = {
  bookId: string;
};

export default function LibraryButton({
  bookId,
}: LibraryButtonProps) {
  const user = useAppSelector((state) => state.auth.user);

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function checkLibrary() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const savedBookIds = await getSavedBookIds(user.uid);

        setIsSaved(savedBookIds.includes(bookId));
      } catch (error) {
        console.error("Unable to check library:", error);
        setErrorMessage("Unable to check your library.");
      } finally {
        setIsLoading(false);
      }
    }

    checkLibrary();
  }, [bookId, user]);

  async function handleLibraryChange() {
    if (!user || isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isSaved) {
        await removeBookFromLibrary(user.uid, bookId);
        setIsSaved(false);
      } else {
        await addBookToLibrary(user.uid, bookId);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Unable to update library:", error);

      setErrorMessage(
        "Unable to update your library. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="book-details__library-control">
      <button
        className={`book-details__library-button ${
          isSaved
            ? "book-details__library-button--saved"
            : ""
        }`}
        type="button"
        disabled={isLoading}
        aria-pressed={isSaved}
        onClick={handleLibraryChange}
      >
        {isLoading
          ? "Updating..."
          : isSaved
            ? "Remove from My Library"
            : "Add title to My Library"}
      </button>

      {errorMessage && (
        <p
          className="book-details__library-error"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
