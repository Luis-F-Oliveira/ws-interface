import { FC, ReactNode } from "react"
import { Sidebar } from "../sidebar"

interface BodyProps {
    children: ReactNode
}

export const Body: FC<BodyProps> = ({ children }) => {
    return (
        <div className='w-screen min-h-screen relative flex'>
            <Sidebar />
            <main className='w-screen ml-28 mr-4 pt-5 pb-2 px-3'>
                {children}
            </main>
        </div>
    )
}
