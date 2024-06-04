import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "sonner";

const merriweather = Merriweather({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "PennyWise",
  description: "A simple budgeting app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={merriweather.className}>
          <Toaster />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
