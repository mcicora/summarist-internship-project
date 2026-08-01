import Skeleton from "react-loading-skeleton";

export default function SearchLoading() {
  return (
    <main className="search-page">
      <Skeleton width={260} height={36} />

      <div className="search-loading__form">
        <Skeleton height={18} width={180} />
        <Skeleton height={50} />
        <Skeleton height={46} width={100} />
      </div>

      <div className="search-loading__results">
        <Skeleton width={220} height={28} />

        <div className="book-row book-row--loading">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="book-card-skeleton" key={index}>
              <Skeleton height={240} />

              <div className="book-card-skeleton__content">
                <Skeleton height={20} />
                <Skeleton width="70%" />
                <Skeleton count={2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}