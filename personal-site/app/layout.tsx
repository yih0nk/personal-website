import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
  
const firaCode = Fira_Code({
    subsets: ["latin"],
    variable: "--font-fira-code",
});

export const metadata: Metadata = {
    title: "Yihan Hong",
    description: "Personal site",
  };
  
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body
          className={`${inter.variable} ${firaCode.variable} bg-slate-950 text-slate-100`}
        >
          {children}
        </body>
      </html>
    );
}