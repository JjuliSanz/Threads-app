import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";

// Define metadata for the page
export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads Application",
};

// Load the Inter font with the "latin" subset
const inter = Inter({ subsets: ["latin"] });

// Define the RootLayout component that wraps the entire app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
