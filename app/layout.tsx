import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Nav from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lead Intake Portal",
  description: "Submit your business inquiry and get an AI-powered summary and category match.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
