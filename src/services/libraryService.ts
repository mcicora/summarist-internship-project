import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type LibraryDocument = {
  savedBookIds?: unknown;
  finishedBookIds?: unknown;
};

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

export async function getSavedBookIds(userId: string): Promise<string[]> {
  const userReference = doc(db, "users", userId);
  const userSnapshot = await getDoc(userReference);

  if (!userSnapshot.exists()) {
    return [];
  }

  const userData = userSnapshot.data() as LibraryDocument;

  return isStringArray(userData.savedBookIds) ? userData.savedBookIds : [];
}

export async function addBookToLibrary(
  userId: string,
  bookId: string,
): Promise<void> {
  const userReference = doc(db, "users", userId);
  const userSnapshot = await getDoc(userReference);

  if (!userSnapshot.exists()) {
    await setDoc(userReference, {
      savedBookIds: [bookId],
    });

    return;
  }

  await updateDoc(userReference, {
    savedBookIds: arrayUnion(bookId),
  });
}

export async function removeBookFromLibrary(
  userId: string,
  bookId: string,
): Promise<void> {
  const userReference = doc(db, "users", userId);

  await updateDoc(userReference, {
    savedBookIds: arrayRemove(bookId),
  });
}

export async function getFinishedBookIds(userId: string): Promise<string[]> {
  const userReference = doc(db, "users", userId);
  const userSnapshot = await getDoc(userReference);

  if (!userSnapshot.exists()) {
    return [];
  }

  const userData = userSnapshot.data() as LibraryDocument;

  return isStringArray(userData.finishedBookIds)
    ? userData.finishedBookIds
    : [];
}

export async function markBookAsFinished(
  userId: string,
  bookId: string,
): Promise<void> {
  const userReference = doc(db, "users", userId);

  await setDoc(
    userReference,
    {
      finishedBookIds: arrayUnion(bookId),
    },
    {
      merge: true,
    },
  );
}
