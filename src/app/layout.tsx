import type { Metadata } from "next";

import AuthModal from "@/components/auth/AuthModal";
import AuthObserver from "@/components/auth/AuthObserver";
import StoreProvider from "@/app/store/StoreProvider";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Book summaries for busy people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthObserver />
          {children}
          <AuthModal />
        </StoreProvider>
      </body>
    </html>
  );
}