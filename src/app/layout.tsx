import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://shrtm.in/"),
  title: "shrtm.in - Shorten URLs with ease",
  description:
    "Shorten your long URLs with shrtm.in and share them easily on social media. Fast, reliable, and free!",
  alternates: {
    canonical: "https://shrtm.in/",
  },
  openGraph: {
    url: "https://shrtm.in/",
    title: "shrtm.in - Shorten URLs with ease",
    description:
      "Shorten your long URLs with shrtm.in and share them easily on social media. Fast, reliable, and free!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
