import type { Book } from "@/types/book";

const API_URL = "https://us-central1-summaristt.cloudfunctions.net/getBooks";

export async function getSelectedBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}?status=selected`);

  if (!response.ok) {
    throw new Error("Unable to load selected books.");
  }

  return response.json();
}

export async function getRecommendedBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}?status=recommended`);

  if (!response.ok) {
    throw new Error("Unable to load recommended books.");
  }

  return response.json();
}

export async function getSuggestedBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}?status=suggested`);

  if (!response.ok) {
    throw new Error("Unable to load suggested books.");
  }

  return response.json();
}

export async function getBookById(id: string): Promise<Book> {
  const response = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
  );

  if (!response.ok) {
    throw new Error("Unable to load the book.");
  }

  return response.json();
}
