import NavBar from "@/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Separator } from "@/components/ui/separator";

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
      <Providers>
        <body className={inter.className}>
          <header className="flex items-center justify-center shadow-sm">
            <nav className="my-2">
              <NavBar />
            </nav>
          </header>
          <main className="container">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
