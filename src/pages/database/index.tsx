import { Body } from "@/components"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { AxiosContext, useUser } from "@/context"
import { getItems } from "@/services/database/Resource"
import { Data, IndexPromise } from "@/services/database/Resource/getItems"
import { Command, Container, MessageSquareWarning, MousePointerSquare, Plus, RefreshCcw, Search, TerminalSquare } from "lucide-react"
import { FormEventHandler, useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { StoreStatus, storeItems } from "@/services/database/Resource/storeItems"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"


interface ResourceProps {
    cardValue: string | null
}

interface CreateResourceProps {
    cardValue: string | null
    headers: Array<string>
}

type StateType<T> = [T, (newValue: T) => void]
const FormEvent = ({ headers, cardValue }: CreateResourceProps) => {
    const [name, setName]: StateType<string> = useState('')
    const [response, setResponse]: StateType<string> = useState('')
    const [sector, setSector]: StateType<string> = useState('')
    const [sectors, setSectors] = useState<{ id: number; name: string }[]>([])
    const { api } = useContext(AxiosContext)
    const { store } = storeItems()
    const { token } = useUser()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const storeStatus: StoreStatus = await store(api, cardValue, name, response, sector, token?.value)
        if (storeStatus.success) {
            toast.success(`${storeStatus.message}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('sectors')
            setSectors(response.data)
        }
        fetchData();
    }, [api])
    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="name">Nome</Label>
            <Input onChange={(e) => setName(e.target.value)} id="name" />

            {headers.length > 2 ? (
                <>
                    <div className='mt-4 mb-8'>
                        <Label htmlFor="return">Retorno</Label>
                        <Textarea onChange={(e) => setResponse(e.target.value)} id="return" />
                    </div>
                    <Select onValueChange={(e) => setSector(e)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Setor" />
                        </SelectTrigger>
                        <SelectContent>
                            {sectors.map((option, index) => (
                                <SelectItem key={index} value={option.id.toString()}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            ) : null}
            <DialogFooter className='mt-3'>
                <Button type='submit'>cadastrar</Button>
            </DialogFooter>
        </form>
    )
}

const CreateResource = ({ headers, cardValue }: CreateResourceProps) => {
    return (
        <Dialog>
            <DialogTrigger><Plus size={32} /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Cadastrar recurso
                    </DialogTitle>
                    <DialogDescription>
                        Cadastrar um novo recurso para ser utilizado pelo sistema
                    </DialogDescription>
                </DialogHeader>
                <FormEvent cardValue={cardValue} headers={headers} />
            </DialogContent>
        </Dialog>
    )
}

function CommandMenu() {
    const [open, setOpen] = useState<boolean>(false)

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
            <CommandList className='bg-gray-200'>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup className='px-2' heading='Buscar no banco de dados'>
                    <div className='px-2 mb-5 border-black'>
                        <Input placeholder='Buscar' className='my-2 border-2 shadow' />
                    </div>
                    <div className='space-y-1'>
                        <CommandItem className='hover:bg-white shadow'>Calendar</CommandItem>
                        <CommandItem className='hover:bg-white shadow'>Search Emoji</CommandItem>
                        <CommandItem className='hover:bg-white shadow'>Calculator</CommandItem>
                    </div>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

const Resource = ({ cardValue }: ResourceProps) => {
    const [data, setData] = useState<Data[] | undefined>(undefined)
    const [headers, setHeaders] = useState<Array<string> | undefined>(undefined)

    const { index } = getItems()
    const { api } = useContext(AxiosContext)
    const { token } = useUser()

    const response = async () => {
        const indexPromise: IndexPromise = await index(api, cardValue, token?.value)

        if (indexPromise.success) {
            toast.success(`${indexPromise.message}`)
            setHeaders(indexPromise.headers)
            setData(indexPromise.data)
        }

        if (!indexPromise.success) {
            toast(`${indexPromise.message}`)
        }
    }

    const refresh = () => {
        response()
    }

    useEffect(() => {
        response()
    }, [api, cardValue, token])

    if (!data) {
        return <img className='w-12' src="loading.svg" alt="loading" />
    }

    if (headers !== undefined) {
        return (
            <div className='w-full flex flex-col mb-5'>
                <div className='w-full flex justify-between mb-2'>
                    <CreateResource cardValue={cardValue} headers={headers} />
                    <div className='flex gap-2'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <RefreshCcw className='cursor-pointer' onClick={refresh} size={32} />
                                </TooltipTrigger>
                                <TooltipContent className='bg-white text-black'>
                                    Recarregar
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className='flex items-center border py-1 pl-1 pr-2 rounded-md'>
                            <Search className='text-black bg-white rounded mr-2 p-1' size={26} />
                            <Command size={18} />
                            <Plus size={18} />
                            <span className='text-lg'>K</span>
                        </div>
                    </div>
                    <CommandMenu />
                </div>
                {cardValue === 'commands' ? (
                    <Alert className='my-2'>
                        <AlertTitle className='flex items-center gap-1'><MessageSquareWarning />Atenção!</AlertTitle>
                        <AlertDescription>
                            Para garantir a atualização das informações, é recomendável reativar o robô
                            sempre que houver qualquer modificação no recurso de comandos
                        </AlertDescription>
                    </Alert>
                ) : null}
                <Table>
                    <TableCaption>A list of {cardValue}.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-10'></TableHead>
                            {headers.map((option, index) => (
                                <TableHead key={index}>{option.toUpperCase()}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((option, index) => (
                            <TableRow key={index}>
                                <TableCell className='w-12 relative'>
                                    <Link to={`/edit?option=${cardValue}&id=${option.id}`}>
                                        <MousePointerSquare />
                                    </Link>
                                </TableCell>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{option.name}</TableCell>
                                <TableCell>{option.return !== undefined ? option.return : null}</TableCell>
                                <TableCell>{option.sector_name !== undefined ? option.sector_name : null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export const Database = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const cardValue = searchParams.get('card')

    return (
        <Body name="Banco de Dados">
            <NavigationMenu className="text-black mt-3">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="w-32">Recurso</NavigationMenuTrigger>
                        <NavigationMenuContent className="p-2 space-y-1">
                            <Link
                                className="flex items-center gap-1 hover:font-bold transition-all"
                                to={'?card=commands'}
                            >
                                <TerminalSquare />Comandos
                            </Link>
                            <Link
                                className="flex items-center gap-1 hover:font-bold transition-all"
                                to={'?card=sectors'}
                            >
                                <Container />Setores
                            </Link>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <main className='flex justify-center mt-10'>
                <Resource cardValue={cardValue} />
            </main>
        </Body>
    )
}
