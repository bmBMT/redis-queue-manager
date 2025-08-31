import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./shared/styles/globals.css";
import { TrpcProvider } from "./api/trpc/client/trpc-provider";
import AntdProvider from "./shared/providers/AntdProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import React from "react";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redis Queue Manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <TrpcProvider>
          <AntdRegistry>
            <AntdProvider>
              <SessionProvider session={session} refetchInterval={60 * 15}>
                {children}
              </SessionProvider>
            </AntdProvider>
          </AntdRegistry>
        </TrpcProvider>
      </body>
    </html>
  );
}
