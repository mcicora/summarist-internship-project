type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>Book Player</h1>
      <p>Playing book with ID: {id}</p>
    </main>
  );
}
