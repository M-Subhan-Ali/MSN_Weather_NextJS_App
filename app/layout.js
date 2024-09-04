import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "By Windows Microsoft",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main>
          {children}
          </main>
        </body>
    </html>
  );
}
