import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AxiosContext } from "@/context"
import { ISectors, SectorsStatus, getOne } from "@/services/database/sectors/get"
import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

interface FormProps {
  onSubmit: (formData: FormData) => void,
  data: ISectors
}

interface FormData {
  name: string
}

const Form: FC<FormProps> = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({ name: data.name })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <Label className='text-md' htmlFor="name">Nome</Label>
      <Input onChange={handleChange} id="name" name="name" type="text" value={formData.name} />
      <div className='mt-5 text-end space-x-1'>
        <Link to={'/sectors?mode=index'}>
          <Button variant={'destructive'}>Cancelar</Button>
        </Link>
        <Button type="submit">Atualizar</Button>
      </div>
    </form>
  )
}

export const EditMode: FC = () => {
  const [data, setData] = useState<ISectors | null>(null)
  const { api } = useContext(AxiosContext)
  const { show } = getOne()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const idValue = searchParams.get('id')

  const handleSubmit = async (formData: FormData) => {

  }

  useEffect(() => {
    async function get() {
      const response: SectorsStatus = await show(api, idValue)

      if (response.success && response.data) {
        setData(response.data)
      }
    }

    get()
  }, [api])

  if (data) {
    return (
      <div className='absolute inset-0 m-auto flex justify-center items-center'>
        <Card className='w-1/3 p-2'>
          <CardHeader>
            <CardTitle className='text-xl'>Editar</CardTitle>
          </CardHeader>
          <CardContent>
            <Form data={data} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    )
  }

  return <img className="absolute inset-0 m-auto w-12" src="loading.svg" alt="loading..." />
}
