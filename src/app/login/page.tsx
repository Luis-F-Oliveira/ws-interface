'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { UserRound } from 'lucide-react'
import Cookie from 'js-cookie'
import { api } from "@/services/axios"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  email: z.string().min(1, {
    'message': "Email deve ser preenchido!"
  }),
  password: z.string().min(1, {
    'message': "Senha deve ser preenchida!"
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item)).optional()
})

const items = [
  {
    id: "conect",
    label: "Mantenha-me conectado"
  }
]

interface ResponseData {
  permanent: boolean
}

export default function Page() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await api.post('login', values)
      .then((response) => {
        if (response.status === 200) {
          const responseData: ResponseData = response.data
          toast({
            title: "Bem vindo",
            description: "Você foi autenticado com sucesso"
          })
          if (responseData.permanent) {
            Cookie.set('auth-user', 'Authenticate')
          } else {
            const oneDayInSeconds = 60 * 60 * 24
            Cookie.set('auth-user', 'Authenticate', { expires: oneDayInSeconds })
          }
          router.push('/dashboard')
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast({
            title: "Erro ao logar",
            description: "Credenciais inválidas"
          })
        }
      })
  }

  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <Card className='w-1/4'>
        <CardHeader>
          <CardTitle className='flex justify-center gap-1 text-xl'>
            <UserRound />
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    if (Array.isArray(field.value)) {
                                      const updatedValue = checked
                                        ? [...field.value, item.id]
                                        : field.value.filter((value) => value !== item.id);
                                      field.onChange(updatedValue);
                                    } else {
                                      field.onChange(checked ? [item.id] : []);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit">Avançar</Button>
                <Button onClick={() => router.push('/RememberPassword')} type="button" variant='link'>
                  Esqueci minha senha
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}