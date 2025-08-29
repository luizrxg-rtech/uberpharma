import type {Metadata} from "next";
import {Hammersmith_One as DisplayFont, Poppins as HeadingFont, Poppins as BodyFont} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {cn} from "@/utils/strings";
import {Provider} from "@/providers/provider";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import {LoadingOverlay} from "@/components/ui/loading-overlay";

const displayFont = DisplayFont({
  weight: ["400"],
  variable: "--font-display",
  subsets: ["latin"],
});

const headingFont = HeadingFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = BodyFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uberpharma",
  description:
    "Produtos de Saúde Premium — Soluções farmacêuticas inovadoras para o bem-estar de sua saúde. " +
    "Na Uberpharma, cuidamos da sua saúde com inovação e confiança.",
  icons: {
    icon: {
      url: "/favicon.ico",
      sizes: "any",
    },
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          displayFont.variable, headingFont.variable, bodyFont.variable,
          bodyFont.className,
          "subpixel-antialiased relative"
        )}
      >
        <Provider>
          <LoadingOverlay />
          <Header/>
          <main>
            {children}
          </main>
          <Footer/>
        </Provider>
      </body>
    </html>
  );
}
