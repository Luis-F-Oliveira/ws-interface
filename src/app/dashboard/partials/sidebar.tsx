'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Database, MessagesSquare, PieChart } from "lucide-react"
import Link from "next/link"
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation"
import { api } from "@/services/axios"

function Logout() {
    const router = useRouter()
    const handleLogout = async () => {
        Cookie.remove('auth-user')
        await api.post('logout')
        router.refresh()
    }

    return <Button onClick={handleLogout} variant={'destructive'}>Sair</Button>
}

export function Sidebar() {
    return (
        <div
            className='w-20 h-screen bg-gray-100 dark:bg-neutral-950 shadow-md flex flex-col
            dark:border-r'
        >
            <header
                className='w-full h-20 flex justify-center items-center 
            border-b-2 mb-4'
            >
                <Link href={'/dashboard'}>
                    <PieChart size={26} className='dark:text-white' />
                </Link>
            </header>
            <nav className='h-full flex flex-col items-center gap-3'>
                <TooltipProvider>
                    <Tooltip>
                        <div className='relative'>
                            <Link href='/dashboard/messages'>
                                <TooltipTrigger className='p-2 rounded-md shadow-md'>
                                    <MessagesSquare className='dark:text-white' />
                                </TooltipTrigger>
                            </Link>
                            <TooltipContent className='absolute left-7 top-3 text-nowrap bg-white text-black'>
                                <p>Mensagens</p>
                            </TooltipContent>
                        </div>
                    </Tooltip>
                </TooltipProvider>

                {/* <DropdownMenu>
                    <DropdownMenuTrigger className='p-2 rounded-md shadow-md'>
                        <PieChart />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Gráficos</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}

                <DropdownMenu>
                    <DropdownMenuTrigger className='p-2 rounded-md shadow-md'>
                        <Database className='dark:text-white' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Banco de Dados</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={'/dashboard/databases/commands?action=show'}>
                                Comandos
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
            <footer className='h-16 flex justify-center items-center'>
                <Logout />
            </footer>
        </div>
    )
}
