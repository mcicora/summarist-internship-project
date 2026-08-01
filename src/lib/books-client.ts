import type { Book } from "@/types/book";

const GET_BOOK_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBook";

export async function getBookByIdClient(
  id: string,
): Promise<Book> {
  const response = await fetch(
    `${GET_BOOK_URL}?id=${encodeURIComponent(id)}`,
  );

  if (!response.ok) {
    throw new Error(`Unable to load book: ${id}`);
  }

  return response.json();
}