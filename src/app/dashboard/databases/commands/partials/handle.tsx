import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useToast } from '@/components/ui/use-toast'
import { IData, serviceCommands } from '@/services/commands'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import BlocksLoading from '@/components/loading/blocks'
import Link from 'next/link'

interface FormsProps {
    data: IData[] | null
}

interface HandleProps {
    id: string | null
}

const formSchema = z.object({
    name: z.string().min(1),
    return: z.string().min(1),
    parent_id: z.string().nullable()
})

const Forms: React.FC<FormsProps> = ({ data }) => {
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
            // handleRefresh()
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
            // handleRefresh()
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
            // handleRefresh()
        } else {
            toast({
                title: "Comando não foi apagado!",
                description: response.message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
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

export default function Handle({ id }: HandleProps) {
    const [data, setData] = React.useState<IData[] | null>(null)
    const api = new serviceCommands()
    const router = useRouter()

    const getData = async () => {
        if (id) {
            const response = await api.show(id)

            if (response.data) {
                const dataArray = Array.isArray(response.data) ? response.data : [response.data]
                setData(dataArray)
            }
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className='w-full h-screen flex justify-center items-center -pt-5'>
                    {data ? (
                        <Card className='w-1/2'>
                            <CardHeader>
                                <CardTitle>Editar comando</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Forms data={data} />
                            </CardContent>
                        </Card>
                    ) : <BlocksLoading />}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                    className='cursor-pointer'
                    onClick={() => router.back()}
                >
                    Voltar
                </ContextMenuItem>
                <ContextMenuItem
                    className='cursor-pointer'
                    onClick={() => router.refresh()}
                >
                    Atualizar
                </ContextMenuItem>
                <ContextMenuItem>
                    <Link href={`/dashboard/databases/commands?action=show&command=${id}`}>
                        Subcomandos
                    </Link>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
