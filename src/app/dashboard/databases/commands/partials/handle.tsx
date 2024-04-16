import BlocksLoading from '@/components/loading/blocks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IData, serviceCommands, serviceCommandsProps } from '@/services/commands'
import { zodResolver } from '@hookform/resolvers/zod'
import { CornerDownRight } from 'lucide-react'
import Link from 'next/link'
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
  ifDelete: () => void
}

const formSchema = z.object({
  name: z.string().min(1),
  return: z.string().min(1),
  parent_id: z.string().nullable(),
  sector_id: z.string()
})

const Forms: React.FC<FormsProps> = ({ data, ifDelete }) => {
  const { toast } = useToast()
  const parentId = data?.[0]?.parent_id ? data?.[0]?.parent_id.toString() : null
  const sectorId: string = (data?.[0]?.sector_id ?? '').toString()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.[0]?.name || "",
      return: data?.[0]?.return || "",
      parent_id: parentId || null,
      sector_id: sectorId || ""

    }
  })

  React.useEffect(() => {
    form.reset({
      name: data?.[0]?.name || "",
      return: data?.[0]?.return || "",
      parent_id: parentId,
      sector_id: sectorId || ""
    })
  }, [data])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const deleting = async () => {
    ifDelete()
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
        <div className='flex justify-between '>
          <div className='space-x-2'>
            <Button type='submit'>
              Atualizar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type='button'
                  variant={'destructive'}
                >
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
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleting}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Button
            type='button'
            variant={'link'}
            onClick={() => toast({ title: "SubComando criado!", description: "SubComando criado com o nome de ..." })}
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
    const response: serviceCommandsProps = await commandsServices.show(this.props.id)

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
        <Card className='w-2/4 border-0'>
          <CardHeader>
            <CardTitle>Pastas</CardTitle>
            <CardDescription>
              <Link href={'/dashboard/databases?question=commands_folders'}>
                Informações sobre
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className='h-3/4 overflow-y-auto'>
            <section>
              {data.map(item => (
                <div key={item.id}>
                  <div className='cursor-pointer font-bold'>
                    {item.sector?.name ? (
                      <span>
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
          </CardContent>
        </Card >
      )

      this.setState({
        folders: folders
      })
    }
  }

  setFormsInPage = async (id: number) => {
    const commandsServices = new serviceCommands()
    const response: serviceCommandsProps = await commandsServices.show(id.toString())

    if (response.data) {
      const dataArray = Array.isArray(response.data) ? response.data : [response.data]
      this.setState({
        formsOpen: true,
        formsData: dataArray
      })
    }
  }

  ifDelete = () => {
    this.setState({
      formsData: null,
      formsOpen: false
    })
  }

  render(): React.ReactNode {
    return (
      <div className='h-full flex gap-4'>
        {this.state.folders}
        <Card className='w-full border-0'>
          <CardContent className='w-full h-full flex justify-center items-center'>
            {this.state.formsOpen && this.state.formsData ? (
              <Forms data={this.state.formsData} ifDelete={this.ifDelete} />
            ) : (
              <BlocksLoading />
            )}
          </CardContent>
        </Card>
      </div>
    )
  }
}
