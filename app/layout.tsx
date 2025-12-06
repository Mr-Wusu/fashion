import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/contexts/reduxProvider";
import Navbar from "./_components/Navigation/Navbar";
import Footer from "./_components/Footer/Footer";
import connectToDB from "@/lib/mongo";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | The Blews Fashion Hub",
  description:
    "Here you'll find your dream design tailored inch-perfect for you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const connect = connectToDB();
  console.log(connect);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#fff",
                color: "#333",
              },
              success: {
                style: {
                  background: "#10b981",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                  color: "#fff",
                },
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
