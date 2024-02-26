import { ReactNode } from "react"
import { Navbar } from ".."

interface BodyProps {
    name?: string
    children: ReactNode
}

export const Body = ({ name, children }: BodyProps) => {
    return (
        <div className="w-screen min-h-screen text-white">
            <header>
                <Navbar />
            </header>
            <main className="w-2/3 mx-auto">
                <h1 className="text-2xl">{ name }</h1>
                {children}
            </main>
            <footer></footer>

        </div>
    )
}
