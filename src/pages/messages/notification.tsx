import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import { AlarmClock, Bell, Calendar, Command, MessageCircleReply, MessageSquareReply, Plus, Search } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom"
import { getMessages } from "@/services/messages/getMessage"
import { AxiosContext } from "@/context"
import Cookies from 'js-cookie'
import { Data, Status } from "@/services/messages/@types"

const formatDate = (dateTimeString: string) => {
    const [datePart, _] = dateTimeString.split('-');
    const [day, month, year] = datePart.split('/');
    return `${day}/${month}/${year}`;
}

const formatTime = (dateTimeString: string) => {
    const [, timePart] = dateTimeString.split('-')
    const [hour, minute, __] = timePart.split(':')
    return `${hour}:${minute}`;
}

const SearchCommand = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

export const Notification = () => {
    const [data, setData] = useState<Data[] | undefined>(undefined)
    const { index } = getMessages()
    const { api } = useContext(AxiosContext)
    const token = Cookies.get('jwt')

    const response = async () => {
        const indexPromise: Status = await index(api, token)

        if (indexPromise.success) {
            setData(indexPromise.data)
        }
    }

    useEffect(() => {
        response()
    }, [api])

    if (data) {
        return (
            <div className='mt-10'>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className='flex items-center text-3xl gap-1'>Notificações <Bell size={32} /></h2>
                    </div>
                    <div className='flex items-center border py-1 pl-1 pr-2 rounded-md'>
                        <Search className='text-black bg-white rounded mr-2 p-1' size={26} />
                        <Command size={18} />
                        <Plus size={18} />
                        <span className='text-lg'>K</span>
                    </div>
                </div>
                <SearchCommand />
                {data.map((value, index) => (
                    <div 
                        key={index} 
                        className={`border-l-4 hover:border-blue-500 pl-2 
                        my-5 flex justify-between items-start 
                        ${ value.answered ? 'border-green-500' : 'border-red-500'}`}
                    >
                        <div>
                            <h1>{ value.number_from }</h1>
                            <h2>{ value.command.name }</h2>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className='pb-8 flex gap-3'>
                                <p className='flex gap-1'>
                                    <Calendar /> { formatDate(value.created_at) }
                                </p>
                                <p className='flex gap-1'>
                                    <AlarmClock /> { formatTime(value.created_at) }
                                </p>
                            </div>
                            <div className='flex gap-1'>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant={'secondary'}>
                                                <Link to={'/response'}>
                                                    <MessageSquareReply />
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-white text-black'>
                                            <p>Responder</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant={'secondary'}>
                                                <MessageCircleReply />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-white text-black'>
                                            <p>Respondido pelo Whatsapp</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return <img className='w-12 mx-auto mt-52' src="loading.svg" alt="loading" />
}