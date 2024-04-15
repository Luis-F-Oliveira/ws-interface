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

interface HandleProps {
  id: string | null
}

interface HandleState {
  data: IData[] | null
  folders: React.ReactNode
  formsOpen: boolean
  forms: React.ReactNode
}

interface FoldersProps {
  data: IData[]
  parentId?: number
  id: string | null
  setFormsInPage: (id: number) => void
}

interface FormsProps {
  id: number
}

const formSchema = z.object({
  name: z.string(),
  return: z.string()
})

const Forms: React.FC<FormsProps> = ({ id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      return: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                Descrição do que é nome
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
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Descrição da resposta
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type='submit'>
          Atualizar
        </Button>
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
      forms: []
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
                    <span>
                      Comando {item.sector.name}
                    </span>
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

  setFormsInPage(id: number) {
    console.log('form');
    
    let forms = (
      <Forms id={id} />
    )

    this.setState({
      formsOpen: true,
      forms: forms
    })
  }

  render(): React.ReactNode {
    return (
      <div className='h-full flex gap-4'>
        {this.state.folders}
        <Card className='w-full border-0'>
          <CardContent className='w-full h-full flex justify-center items-center'>
            {this.state.formsOpen ? <Forms id={1} /> : <BlocksLoading />}
          </CardContent>
        </Card>
      </div>
    )
  }
}
