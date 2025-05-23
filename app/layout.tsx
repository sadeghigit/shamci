import type { Metadata } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const vazirmatn = localFont({
  src: './vazirmatn.ttf',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Shamci",
};

type Props = {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <html lang="fa" dir="rtl">
      <body className={twMerge(vazirmatn.variable, "font-sans")}>
        {children}
      </body>
    </html>
  );
}
