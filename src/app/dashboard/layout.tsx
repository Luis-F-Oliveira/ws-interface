import type { Metadata } from "next"
import { ReactNode } from "react"
import { Sidebar } from "./partials/sidebar"

interface RootLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "WS - Dashboard",
    description: "Página principal do dashboard",
}

export default function RootLayout({
    children
}: RootLayoutProps) {
    return (
        <main className='flex gap-4'>
            <Sidebar />
            <section className='mt-3'>
                {children}
            </section>
        </main>
    )
}