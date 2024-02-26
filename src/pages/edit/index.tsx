import { Body } from "@/components"
import { AxiosContext } from "@/context"
import Cookies from "js-cookie"
import { FormEventHandler, useContext, useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Data, ShowPromise, getItem } from "@/services/database/Resource/getItem"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UpdateStatus, updateItems } from "@/services/database/Resource/updateItems"
import { DeleteStatus, deleteItems } from "@/services/database/Resource/destroyItem"

interface EditFormProps {
    data: Data[]
    headers: Array<string> | undefined
    url: string
    id: string
}

const EditForm = ({ data, headers, url, id }: EditFormProps) => {
    const [sectors, setSectors] = useState<{ id: number; name: string }[]>([])
    const [name, setName] = useState<string>(data[0].name ? data[0].name : '')
    const [response, setResponse] = useState<string>(data[0].return ? `${data[0].return}` : '')
    const [sector, setSector] = useState<string>(data[0].sector_id ? `${data[0].sector_id}` : '')
    const { api } = useContext(AxiosContext)
    const token = Cookies.get('jwt')
    const { update } = updateItems()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSectors = async () => {
            const response = await api.get('sectors')
            setSectors(response.data)
        }
        fetchSectors()
    }, [api])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const updatePromise: UpdateStatus = await update(api, url, id, name, response, sector, token)

        if (updatePromise.success) {
            toast.success(`${name} ${updatePromise.message}`)
            navigate(`/database?card=${url}`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardContent>
                <Label htmlFor="name">Nome</Label>
                <Input onChange={(e) => setName(e.target.value)} type="text" id="name" value={name} className='mb-3' />
                {headers && headers.length && headers.length > 2 ? (
                    <>
                        <Label htmlFor="return">Retorno</Label>
                        <Textarea onChange={(e) => setResponse(e.target.value)} id="return" value={response} className='mb-3' />
                        <Label htmlFor="sector">Setor</Label>
                        <Select
                            onValueChange={(e) => setSector(e)}
                            defaultValue={sector}
                        >
                            <SelectTrigger id="sector">
                                <SelectValue placeholder='Setor' />
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
            </CardContent>
            <CardFooter className='flex justify-end gap-1'>
                <Link to={`/database?card=${url}`}>
                    <Button type="button" variant={'destructive'}>
                        cancelar
                    </Button>
                </Link>
                <Button type="submit">editar</Button>
            </CardFooter>
        </form>
    )
}

export const Edit = () => {
    const [data, setData] = useState<Data[] | undefined>(undefined)
    const [headers, setHeaders] = useState<Array<string> | undefined>(undefined)
    const [deleteAlert, setDeleteAlert] = useState<boolean>(false)

    const { api } = useContext(AxiosContext)
    const token = Cookies.get('jwt')
    const { show } = getItem()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const url = searchParams.get('option')
    const id = searchParams.get('id')
    const { destroy } = deleteItems()
    const navigate = useNavigate()

    const fetchGetItem = async () => {
        const showPromise: ShowPromise = await show(api, url, id, token)

        if (showPromise.success) {
            setHeaders(showPromise.headers)
            setData(showPromise.data)
        }
    }

    const handleDeleteQuestion = () => {
        setDeleteAlert(!deleteAlert)
    }

    const handleDestroy = async () => {
        const destroyPromise: DeleteStatus = await destroy(api, url, id, token)

        if (destroyPromise.success) {
            toast.success(`${destroyPromise.message}`)
            navigate(`/database?card=${url}`)
        }
    }

    useState(() => {
        fetchGetItem()
    })

    return (
        <Body>
            <div className='fixed inset-0 flex flex-col items-center justify-center'>
                {deleteAlert ? (
                    <Alert className='w-1/3 mb-4'>
                        <AlertTitle>
                            <h1 className="text-lg">Deseja mesmo apagar?</h1>
                        </AlertTitle>
                        <AlertDescription >
                            { url === 'sectors' ? (
                                <p>Setores só serão excluídos caso nenhum recurso ou conta estejam vinculados</p>
                            ) : (
                                <p>Ao apagar o recurso será excluído para sempre</p>
                            )}
                            <div className='flex justify-center gap-2 mt-2'>
                                <Button
                                    onClick={handleDeleteQuestion}
                                    type="button"
                                    variant={'destructive'}
                                >
                                    Não
                                </Button>
                                <Button onClick={handleDestroy} type="button">Sim</Button>
                            </div>
                        </AlertDescription>
                    </Alert>
                ) : null}

                {data ? (
                    <Card className='w-1/3'>
                        <CardHeader>
                            <CardTitle className='flex justify-between items-center'>
                                Editar recurso
                                <Trash onClick={handleDeleteQuestion} className='hover:text-red-600 cursor-pointer' />
                            </CardTitle>
                            <CardDescription>Editar um recurso utilizado pelo sistema</CardDescription>
                        </CardHeader>
                        <EditForm data={data} headers={headers} url={`${url}`} id={`${id}`} />
                    </Card>
                ) : (
                    <img className='w-12' src="loading.svg" alt="loading" />
                )}
            </div>
        </Body >
    )
}
