import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "../context/SocketProvider";
import RoomProvider from "../context/RoomContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <SocketProvider>
        <RoomProvider>
          <body className={inter.className}>{children}</body>
        </RoomProvider>
      </SocketProvider>
    </html>
  );
}
