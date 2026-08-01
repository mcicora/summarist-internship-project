import BackToBooksLink from "@/components/books/BackToBooksLink";
import ReaderView from "@/components/reader/ReaderView";
import { getBookById } from "@/lib/books";

type ReaderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReaderPage({
  params,
}: ReaderPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <>
      <BackToBooksLink />

      <ReaderView
        title={book.title}
        author={book.author}
        imageLink={book.imageLink}
        summary={book.summary}
      />
    </>
  );
}
