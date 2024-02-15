import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftSidebar";
import RightSideBar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads Clone App",
  description: "Dynamic web application that showcases a fusion of cutting-edge technologies to deliver a seamless user experience. Built with Next.js 13.4, the power of Server Side Rendering (SSR) ensures optimal performance and SEO friendliness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <body className={inter.className}>
          <Topbar />

          <main className="flex flex-row">
            <LeftSideBar />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightSideBar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
