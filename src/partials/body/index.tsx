import { FC, ReactNode } from "react"
import { Sidebar } from "../sidebar"
import { SidebarProvider } from "@/context"

interface BodyProps {
    children: ReactNode
}

export const Body: FC<BodyProps> = ({ children }) => {
    return (
        <div className='w-screen min-h-screen'>
            <SidebarProvider>
                <Sidebar />
            </SidebarProvider>
            <main>
                {children}
            </main>
        </div>
    )
}
