type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>Book Details</h1>
      <p>Book Id: {id}</p>
    </main>
  );
}
