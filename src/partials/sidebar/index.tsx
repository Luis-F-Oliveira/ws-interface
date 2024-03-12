import { Button } from "@/components/ui/button"
import { useUser } from "@/context"
import { BotMessageSquare, Container, Database, MessageSquare, PieChart, SquareTerminal, UsersRound } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export const Sidebar = () => {
    const { logoutUser } = useUser()
    return (
        <aside className='w-24 h-screen fixed bg-gray-50 z-10 px-2 transition-all mr-5'>
            <header className='mb-2 flex justify-center items-center flex-col pt-4'>
                <BotMessageSquare size={32} />
            </header>
            <nav className='mt-6 flex flex-col items-center gap-5'>
                <TooltipProvider>
                    <Tooltip>
                        <div className='relative'>
                            <Link to={'/'}>
                                <TooltipTrigger className='p-2 rounded-lg shadow-md'>
                                    <MessageSquare size={25} />
                                </TooltipTrigger>
                            </Link>
                            <TooltipContent
                                className='absolute left-10 mb-2 bg-white shadow-black shadow-lg
                                top-3 text-nowrap text-black'
                            >
                                <p>Mensagens</p>
                            </TooltipContent>
                        </div>
                    </Tooltip>
                    <DropdownMenu>
                        <div className='relative'>
                            <DropdownMenuTrigger className='p-2 rounded-lg shadow-md'>
                                <Database size={25} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='absolute left-7 -top-11 text-nowrap'>
                                <DropdownMenuLabel>Banco de Dados</DropdownMenuLabel>
                                <DropdownMenuSeparator className='bg-gray-200' />
                                <DropdownMenuItem>
                                    <Link className='flex items-center gap-1' to={'/commands'}>
                                        <SquareTerminal size={18} /> Comandos
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link className='flex items-center gap-1' to={'/sectors?mode=index'}>
                                        <Container size={18} /> Setores
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link className='flex items-center gap-1' to={'/sectors'}>
                                        <UsersRound size={18} /> Usuários
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </div>
                    </DropdownMenu>
                    <DropdownMenu>
                        <div className='relative'>
                            <DropdownMenuTrigger className='p-2 rounded-lg shadow-md'>
                                <PieChart size={25} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='absolute left-7 -top-11'>
                                <DropdownMenuLabel>Gráficos</DropdownMenuLabel>
                                <DropdownMenuSeparator className='bg-gray-200' />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </div>
                    </DropdownMenu>
                </TooltipProvider>
                <Button className='absolute bottom-2' onClick={logoutUser} >Logout</Button>
            </nav>
        </aside>
    )
}
