import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { KeyRound, Mail, UserRound } from 'lucide-react'
import { useState, FormEventHandler, useContext } from "react"
import { AuthService } from "@/services"
import { AxiosContext, useUser } from "@/context"
import { AuthenticateStatus } from "@/services/auth/login"
import { toast } from "react-toastify"

type StateType<T> = [T, (newValue: T) => void]
export const Login = () => {
  const [email, setEmail]: StateType<string> = useState('')
  const [password, setPassword]: StateType<string> = useState('')
  const { auth } = AuthService()
  const { api } = useContext(AxiosContext)
  const navigate = useNavigate()
  const { loginUser } = useUser()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const authenticateStatus: AuthenticateStatus = await auth(api, email, password)

    if (authenticateStatus.success) {
      toast.success(`${authenticateStatus.user?.name}, seja bem vindo.`)
      if (authenticateStatus.user && authenticateStatus.token) {
        loginUser({
          id: authenticateStatus.user.id,
          name: authenticateStatus.user.name,
          email: authenticateStatus.user.email,
        },
        {
          value: authenticateStatus.token
        })
      }
      navigate('/')
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-900">
      <form onSubmit={handleSubmit} className="w-1/4 h-auto rounded-md p-3 flex flex-col gap-2 bg-gray-200  shadow-md shadow-black">
        <div className="flex justify-center mb-2">
          <UserRound />
          <h1 className="text-lg ml-1">Login</h1>
        </div>
        <Label className="flex items-center gap-1" htmlFor="email"><Mail size={18} /> Email</Label>
        <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="mb-2" />
        <Label className="flex items-center gap-1" htmlFor="password"><KeyRound size={18} /> Senha</Label>
        <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full mt-2">
          acessar
        </Button>
        <Link className="-mt-2" to={'/register'}>
          Não possuo conta
        </Link>
      </form>
    </div>
  )
}