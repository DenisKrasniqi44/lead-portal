import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
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
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-sm font-semibold text-gray-900 tracking-tight">
              LeadPortal
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Submit a request
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
