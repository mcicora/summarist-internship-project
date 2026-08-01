import Link from "next/link";

export default function BookNotFound() {
  return (
    <main className="page-error">
      <h1>Book not found</h1>

      <p>
        This book may no longer exist, or the link may be incorrect.
      </p>

      <Link
        href="/for-you"
        className="page-error__button"
      >
        Return to For You
      </Link>
    </main>
  );
}