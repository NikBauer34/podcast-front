import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AudioProvider, AuthProvider } from "@/shared";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ПодкастИИ",
  description: "Генерируй подкасты с ИИ",
  icons: {
    icon: '/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <AudioProvider>
          <body className={manrope.className}>{children}</body>
        </AudioProvider>
      </html>
    </AuthProvider>
  );
}
