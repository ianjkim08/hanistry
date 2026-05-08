import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Hanistry | Korean Historical Atlas",
  description: "Explore Korean history through interactive maps, timelines, and historical regions."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
