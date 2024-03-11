import { Button } from "@/components/ui/button"
import { useUser } from "@/context"
import { BotMessageSquare } from "lucide-react"

const Aside = () => {
    const { logoutUser } = useUser()
    return (
        <aside className='w-24 h-screen relative bg-gray-50 z-10 px-2 transition-all'>
            <header className='mb-2 flex justify-center items-center flex-col pt-2'>
                <BotMessageSquare size={32} />
            </header>
            <nav>
                
            </nav>
            <footer className='fixed bottom-2 flex'>
                <Button onClick={logoutUser} >Logout</Button>
            </footer>
        </aside>
    )
}

export const Sidebar = () => {
    return (
        <div className='fixed'>
            <Aside />
        </div>
    )
}
