import Link from "next/link";

export default function BackToBooksLink() {
  return (
    <Link href="/for-you" className="back-to-books">
      ← Back to For You
    </Link>
  );
}