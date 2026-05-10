import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kustormize Properties & Procurements | Premium Real Estate in Nigeria",
  description:
    "Building Your Future, Securing Your Deals. Kustormize Properties offers premium real estate services across Lagos, Abuja, and Nigeria. Buy, rent, or invest with confidence.",
  keywords: [
    "Nigeria real estate",
    "Lagos properties",
    "Abuja real estate",
    "property for sale Nigeria",
    "rent apartment Lagos",
    "Kustormize Properties",
    "luxury homes Nigeria",
  ],
  authors: [{ name: "Kustormize Properties & Procurements" }],
  openGraph: {
    title: "Kustormize Properties & Procurements",
    description:
      "Building Your Future, Securing Your Deals. Premium real estate services across Nigeria.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased bg-[#0a1628] text-[#f0f0f0]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
