import NavBar from "@/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProviders from "@/components/AuthProviders";
import ReduxProvider from "./rtk/Provider";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import QueryProdider from "@/components/QueryProdider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diet or Die",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <QueryProdider>
        <ReduxProvider>
          <AuthProviders>
            <body className={inter.className}>
              <header>
                <nav>
                  <NavBar />
                </nav>
              </header>
              <main>{children}</main>
              {/* <main className="min-h-screen px-10 py-5 md:px-20">{children}</main> */}
              {/* <footer>
              <Footer />
            </footer> */}
              <Toaster />
            </body>
          </AuthProviders>
        </ReduxProvider>
      </QueryProdider>
    </html>
  );
}
