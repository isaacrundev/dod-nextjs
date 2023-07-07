import NavBar from "@/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diet or Die",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className="flex flex-row justify-center my-5 ">
            <NavBar />
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
