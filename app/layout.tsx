//app/layout.tsx
//THIS IS THE LAYOUT HOW TO DISPLAY THE ICON
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";
import ScrollToTop from "@/components/Helper/ScrollToTop";
import AnimatedCursor from "react-animated-cursor"
import Head from 'next/head';

const font = Sora({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "IamFranklin",
  description: "Franklin's Portfolio with Next JS",
  icons: {
    icon: "/images/f-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar">
      <body className={font.className}>

        <div className="hidden md:block ">
          <AnimatedCursor 
            innerSize={8}
            outerSize={35}
            innerScale={2}
            outerScale={2}
            outerAlpha={0}
            innerStyle={{
              backgroundColor:"white",
            }}
            outerStyle={{
              border:"3px solid white"
            }}
          />
        </div>

        <ResponsiveNav />
        {children}
        <Footer />
        <ScrollToTop />

      </body>
    </html>
  );
}
