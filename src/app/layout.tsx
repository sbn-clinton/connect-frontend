import type { Metadata } from "next";
import "./globals.css";
import Tanstack from "@/components/Tanstack";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Context } from "@/components/Context";

export const metadata: Metadata = {
  title: "Connect",
  description: "Connect with like minded people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Tanstack>
        <Context>
          <body className={` antialiased font-sans`}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex flex-grow">{children}</main>
              <Toaster />
              <Footer />
            </div>
          </body>
        </Context>
      </Tanstack>
    </html>
  );
}
