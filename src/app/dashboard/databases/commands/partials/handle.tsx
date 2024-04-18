import BlocksLoading from '@/components/loading/blocks'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IData, serviceCommands } from '@/services/commands'
import { zodResolver } from '@hookform/resolvers/zod'
import { CornerDownRight } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/components/ui/use-toast'

interface HandleProps {
  id: string | null
}

interface HandleState {
  data: IData[] | null
  folders: React.ReactNode
  formsOpen: boolean
  formsData: IData[] | null
}

interface FoldersProps {
  data: IData[]
  parentId?: number
  id: string | null
  setFormsInPage: (id: number) => void
}

interface FormsProps {
  data: IData[] | null
  handleRefresh: () => void
}

const formSchema = z.object({
  name: z.string().min(1),
  return: z.string().min(1),
  parent_id: z.string().nullable()
})

const Forms: React.FC<FormsProps> = ({ data, handleRefresh }) => {
  const { toast } = useToast()
  const api = new serviceCommands()
  const parentId = data?.[0]?.parent_id ? data?.[0]?.parent_id.toString() : null
  const id: string | null = data?.[0]?.id ? data?.[0]?.id.toString() : null
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.[0]?.name || "",
      return: data?.[0]?.return || "",
      parent_id: parentId || null

    }
  })

  React.useEffect(() => {
    form.reset({
      name: data?.[0]?.name || "",
      return: data?.[0]?.return || "",
      parent_id: parentId
    })
  }, [data])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await api.update(id, values)

    if (response.success) {
      toast({
        title: "Comando atualizado!"
      })
      handleRefresh()
    } else {
      toast({
        title: "Comando não foi atualizado!"
      })
    }
  }

  const subCommand = async () => {
    const response = await api.store(id)

    if (response.success) {
      toast({
        title: "SubComando criado!"
      })
      handleRefresh()
    } else {
      toast({
        title: "SubComando não foi criado!"
      })
    }
  }

  const deleting = async () => {
    const response = await api.delete(id)

    if (response.success) {
      toast({
        title: "Comando apagado!"
      })
      handleRefresh()
    } else {
      toast({
        title: "Comando não foi apagado!",
        description: response.message
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/2 space-y-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                O nome é o campo que será mostrado para a identificação da pergunta, exemplo:
                "N° Lorem, ipsum dolor sit amet consectetur adipisicing elit."
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='return'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resposta</FormLabel>
              <FormControl>
                <Textarea className='h-32' {...field} />
              </FormControl>
              <FormDescription>
                Caso esse comando tenha um subcomando, não é necessário a criação de uma listagem nesse campo
                o própio bot desenvolverá a lista automáticamente.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <div className='space-x-2'>
            <Button type='submit'>
              Atualizar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type='button' variant={'destructive'}>
                  Apagar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Realmente deseja apagar?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso irá excluir permanentemente o comando e
                    remover seus dados dos nossos servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={deleting}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Button
            type='button'
            variant={'link'}
            onClick={subCommand}
          >
            Adicionar Sub
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Folders: React.FC<FoldersProps> = ({ data, id, setFormsInPage }) => {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id} className='pl-2 mb-1'>
          <div className='flex items-start'>
            <CornerDownRight size={18} />
            <button onClick={() => setFormsInPage(item.id)}>
              {item.name}
            </button>
          </div>
          {item.replies && item.replies.length > 0 && (
            <Folders
              data={item.replies}
              parentId={item.id}
              id={id}
              setFormsInPage={setFormsInPage}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default class Handle extends React.Component<HandleProps, HandleState> {
  constructor(props: HandleProps) {
    super(props)
    this.state = {
      data: null,
      folders: [],
      formsOpen: false,
      formsData: null
    }
  }

  async componentDidMount() {
    await this.fetchComponent()
  }

  async fetchComponent() {
    const commandsServices = new serviceCommands()
    const response = await commandsServices.show(this.props.id)

    if (response.data) {
      const dataArray = Array.isArray(response.data) ? response.data : [response.data]
      this.setState({
        data: dataArray
      }, () => this.setFoldersInPage())
    }
  }

  setFoldersInPage() {
    const { data } = this.state
    if (data) {
      let folders = (
        <div className='w-1/2 overflow-y-auto'>
          <section>
            {data.map(item => (
              <div key={item.id}>
                <div className='cursor-pointer font-bold'>
                  {item.sector?.name ? (
                    <span className='text-xl'>
                      Comando {item.sector.name}
                    </span>
                  ) : null}
                </div>
                <Folders
                  data={data}
                  id={this.props.id}
                  setFormsInPage={this.setFormsInPage}
                />
              </div>
            ))}
          </section>
        </div >
      )

      this.setState({
        folders: folders
      })
    }
  }

  setFormsInPage = async (id: number) => {
    const commandsServices = new serviceCommands()
    const response = await commandsServices.show(id.toString())

    if (response.data) {
      const dataArray = Array.isArray(response.data) ? response.data : [response.data]
      this.setState({
        formsOpen: true,
        formsData: dataArray
      })
    }
  }

  handleRefresh = () => {
    this.fetchComponent()
    this.setState({
      formsData: null,
      formsOpen: false
    })
  }

  render(): React.ReactNode {
    return (
      <div className='h-full flex gap-4'>
        {this.state.folders}
        <div className='w-full flex justify-center items-center'>
          <div className='flex justify-center items-center'>
            {this.state.formsOpen && this.state.formsData ? (
              <Forms data={this.state.formsData} handleRefresh={this.handleRefresh} />
            ) : (
              <BlocksLoading />
            )}
          </div>
        </div>
      </div>
    )
  }
}
