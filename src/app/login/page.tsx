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

const formSchema = z.object({
  email: z.string().min(1, {
    'message': "Email deve ser preenchido!"
  }),
  password: z.string().min(1, {
    'message': "Senha deve ser preenchida!"
  })
})

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
          toast({
            title: "Bem vindo",
            description: "Você foi autenticado com sucesso"
          })
          Cookie.set('auth-user', 'Authenticate')
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