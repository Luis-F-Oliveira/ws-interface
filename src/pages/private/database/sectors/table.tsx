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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, SquareMousePointer } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react"
import { AxiosContext } from "@/context"
import { ISectors, SectorsStatus, getAll } from "@/services/database/sectors/get"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { StoreSector } from "@/services/database/sectors/store"

interface StoreProps {
  onSubmit: (formData: StoreData) => void
}

interface StoreData {
  name: string
}

const StoreForm: FC<StoreProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<StoreData>({ name: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
      <Label className='text-md' htmlFor="name">Nome</Label>
      <Input onChange={handleChange} id="name" name="name" type="text" placeholder="digite o nome do setor" />
      <div className='mt-8 text-end'>
        <Button>Cadastrar</Button>
      </div>
    </form>
  )
}

const Store: FC = () => {
  const { api } = useContext(AxiosContext)
  const { store } = StoreSector()

  const handleSubmit = async (formData: StoreData) => {
    if (formData.name === '') {
      toast.warning('Preencha o campo')
    } else {
      const response = await store(api, formData.name)

      if (response.success) {
        toast.success(`Setor: "${formData.name}", criado.`)
      }
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger className='text-white'>
              <Plus size={32} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Setor</DialogTitle>
              </DialogHeader>
              <StoreForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent className='bg-white text-black'>
          <p>Adicionar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const Search = () => {
  return (
    <form className='flex items-center'>
      <Select>
        <SelectTrigger
          className="w-[100px] bg-white rounded-l-md rounded-r-none"
        >
          <SelectValue placeholder="Coluna" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="name">Nome</SelectItem>
        </SelectContent>
      </Select>
      <Input
        className='text-white rounded-l-none rounded-r-md'
      />
    </form>
  )
}

export const TablePartial = () => {
  const [data, setData] = useState<ISectors[]>([])
  const { api } = useContext(AxiosContext)
  const { index } = getAll()

  useEffect(() => {
    async function get() {
      const response: SectorsStatus = await index(api)

      if (response.success && response.data) {
        if (Array.isArray(response.data)) {
          setData(response.data);
        }
      }
    }
    get()
  }, [api])

  if (data.length !== 0) {
    return (
      <>
        <div className='flex justify-between items-center mb-3'>
          <Store />
          <Search />
        </div>

        <Table>
          <TableCaption>Lista de Setores</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'></TableHead>
              <TableHead className="w-[100px] font-bold">#</TableHead>
              <TableHead>Nome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className='text-white'>
                <TableCell className="font-bold relative w-12">
                  <Link to={`/sectors?mode=edit&id=${item.id}`}>
                    <SquareMousePointer />
                  </Link>
                </TableCell>
                <TableCell className="font-bold">{String(index + 1).padStart(4, '0')}</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  }

  return <img className="absolute inset-0 m-auto w-12" src="loading.svg" alt="loading..." />
}
