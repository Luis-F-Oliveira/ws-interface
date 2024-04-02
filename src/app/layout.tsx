import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "WS - Interface",
  description: "Interface do aplicativo WS",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200 text-black overflow-hidden`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}