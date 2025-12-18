import "./globals.css";
import { LenisProvider } from "../components/lenis-provider";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata = {
  title: "Nektarios | Full Stack Engineer",
  description: "Personal portfolio of Nektarios Gkouvousis"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
