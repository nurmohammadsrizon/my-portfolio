import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nur Mohammad Srizon — AI Engineer & Backend Developer",
  description:
    "Portfolio of Nur Mohammad Srizon: AI engineering, FastAPI backends, Python software and the LifeOS project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
