import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { KeyRound, Mail, UserRound, UserRoundPlus } from 'lucide-react'
import { useState, useContext, FormEventHandler, useEffect } from "react"
import { RegisterService } from "@/services"
import { AxiosContext } from "@/context"
import { RegistrationStatus } from "@/services/auth/register"
import { toast } from "react-toastify"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type StateType<T> = [T, (newValue: T) => void]
export const Register = () => {
    const [name, setName]: StateType<string> = useState('')
    const [email, setEmail]: StateType<string> = useState('')
    const [password, setPassword]: StateType<string> = useState('')
    const [sector, setSector]: StateType<string> = useState('')
    const [sectors, setSectors] = useState<{ id: number; name: string }[]>([])
    const { api } = useContext(AxiosContext)
    const { register } = RegisterService()
    const navigate = useNavigate()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const registrationStatus: RegistrationStatus = await register(api, name, email, password, sector)
        if (registrationStatus.success) {
            toast.success('Usuário criado!')
            navigate('/login')
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
        <div className="w-screen h-screen flex justify-center items-center bg-neutral-900">
            <form onSubmit={handleSubmit} className="w-1/4 h-auto rounded-md p-3 flex flex-col gap-2 bg-gray-200  shadow-md shadow-black">
                <div className="flex justify-center mb-2">
                    <UserRoundPlus />
                    <h1 className="text-lg ml-1">Register</h1>
                </div>
                <Label className="flex items-center gap-1" htmlFor="name"><UserRound size={18} /> Nome</Label>
                <Input id="name" maxLength={64} type="text" onChange={(e) => setName(e.target.value)} className="mb-2" />
                <Label className="flex items-center gap-1" htmlFor="email"><Mail size={18} /> Email</Label>
                <Input id="email" maxLength={64} type="email" onChange={(e) => setEmail(e.target.value)} className="mb-2" />
                <Label className="flex items-center gap-1" htmlFor="password"><KeyRound size={18} /> Senha</Label>
                <Input id="password" maxLength={32} type="password" onChange={(e) => setPassword(e.target.value)} className="mb-2" />
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
                <Button type="submit" className="w-full mt-3">
                    cadastrar
                </Button>
                <Link className="-mt-2" to={'/login'}>
                    Já possuo conta
                </Link>
            </form>
        </div>
    )
}