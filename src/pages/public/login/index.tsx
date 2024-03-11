import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AxiosContext, useUser } from "@/context"
import { Authenticate, AuthenticateStatus } from "@/services/auth/login"
import { AtSign, KeyRound, UserRound } from 'lucide-react'
import { ChangeEvent, FC, FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface FormProps {
  onSubmit: (formData: FormData) => void
}

export interface FormData {
  email: string
  password: string
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-xl flex items-center justify-center gap-1'>
        <UserRound className='mb-1' /> Login
      </h1>
      <Label htmlFor="email" className='flex items-center gap-1 text-md mb-2' ><AtSign />Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        className='mb-3'
        onChange={handleChange}
      />
      <Label htmlFor="password" className='flex items-center gap-1 text-md mb-2' ><KeyRound />Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        className='mb-3'
        onChange={handleChange}
      />
      <Button type='submit' className='w-full mt-5'>Sing-In</Button>
    </form>
  )
}

export const Login: FC = () => {
  const { auth } = Authenticate()
  const { api } = useContext(AxiosContext)
  const { loginUser } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (formData: FormData) => {
    if (formData.email === '') {
      toast.warning('Preencha o email')
    } else if (formData.password === '') {
      toast.warning('Preencha a senha')
    } else {
      const response: AuthenticateStatus = await auth(api, formData)

      if (response.success) {
        if (response.data) {
          loginUser({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            access: response.data.access,
            sector: response.data.sector
          })
        }

        navigate('/')
      }
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Card className='w-1/4 h-auto p-2'>
        <Form onSubmit={handleSubmit} />
      </Card>
    </div>
  )
}
