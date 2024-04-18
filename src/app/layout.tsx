import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { cookies } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "WS - Interface",
  description: "Interface do aplicativo WS",
}

export default function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  return (
    <html lang="en">
      <body 
        className={`${inter.className} overflow-hidden
        ${theme?.value === 'light' ? 'bg-slate-200 text-black' : 'dark'}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}