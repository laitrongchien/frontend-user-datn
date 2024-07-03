import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/provider";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import ToastProvider from "@/components/global/Toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

// const poppin = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "400"],
// });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400"],
});

export const metadata: Metadata = {
  title: "Vietnam MotorBike Tours + Rentals",
  description: "Generated by create next app",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppProvider>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
            <Navbar />
            <ToastProvider>
              <main className="mt-[65px]">{children}</main>
            </ToastProvider>
            <Footer />
          </GoogleOAuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
