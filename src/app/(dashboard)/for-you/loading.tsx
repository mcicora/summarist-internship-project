import Skeleton from "react-loading-skeleton";

function BookCardSkeleton() {
  return (
    <div className="book-card-skeleton">
      <Skeleton height={240} />

      <div className="book-card-skeleton__content">
        <Skeleton height={20} />
        <Skeleton width="70%" />
        <Skeleton count={2} />
      </div>
    </div>
  );
}

export default function ForYouLoading() {
  return (
    <main className="for-you">
      <section className="for-you__section">
        <Skeleton width={240} height={28} />

        <div className="book-row book-row--loading">
          {Array.from({ length: 5 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      </section>

      <section className="for-you__section">
        <Skeleton width={220} height={28} />

        <div className="book-row book-row--loading">
          {Array.from({ length: 5 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}