import NavBar from "@/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProviders from "@/components/AuthProviders";
import ReduxProvider from "./rtk/Provider";
import { ReactNode } from "react";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diet or Die",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <QueryProvider>
        <ReduxProvider>
          <AuthProviders>
            <body className={inter.className}>
              <header>
                <nav>
                  <NavBar />
                </nav>
              </header>
              <main>{children}</main>
              <Toaster />
            </body>
          </AuthProviders>
        </ReduxProvider>
      </QueryProvider>
    </html>
  );
}
