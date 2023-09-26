import NavBar from "@/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProviders from "@/components/AuthProviders";
import ReduxProvider from "./rtk/Provider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diet or Die",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <AuthProviders>
          <body className={inter.className}>
            <header>
              {/* <nav className="my-2"> */}
              <nav>
                <NavBar />
              </nav>
            </header>
            <main className="px-10 py-5 md:px-20">{children}</main>
          </body>
        </AuthProviders>
      </ReduxProvider>
    </html>
  );
}
