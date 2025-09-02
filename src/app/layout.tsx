import type {Metadata} from "next";
import {
  Paytone_One as DisplayFont,
  Plus_Jakarta_Sans as HeadingFont,
  Plus_Jakarta_Sans as BodyFont
} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {cn} from "@/utils/strings";
import {Provider} from "@/providers/provider";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import CartSidebar from "@/components/layout/cart/cart-sidebar";
import Scroll from "@/components/layout/scroll/scroll";
import {Box} from "@chakra-ui/react";

const displayFont = DisplayFont({
  weight: ["400"],
  variable: "--font-display",
  subsets: ["latin"],
});

const headingFont = HeadingFont({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = BodyFont({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        )}
      >
        <Provider>
          <Scroll>
            <CartSidebar />
            <Header/>
            <Box as="main">
              {children}
            </Box>
            <Footer/>
          </Scroll>
        </Provider>
      </body>
    </html>
  );
}
