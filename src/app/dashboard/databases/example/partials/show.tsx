'use client'

import React from 'react'
import { IData, serviceCommands, serviceCommandsProps } from '@/services/commands'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, SquareMousePointer } from 'lucide-react'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import BlocksLoading from '@/components/loading/blocks'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const formSchema = z.object({
  perPage: z.number()
})

const searchSchema = z.object({
  search: z.string()
})

interface ShowProps {
  commandId: string | null
  router: AppRouterInstance
}

interface FormProps {
  onPerPageChange: (perPage: number) => void
}

interface SearchProps {
  onSearch: (searchTerm: string) => void
}

interface ShowState {
  offset: number
  data: IData[] | null
  elements: React.ReactNode[]
  perPage: number
  currentPage: number
  pageCount: number
  searchTerm: string
}

const SearchComponent = ({ onSearch }: SearchProps) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema)
  })

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name='search'
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Pesquisar por nome'
                  onChange={(event) => onSearch(event.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

const FormComponent: React.FC<FormProps> = ({ onPerPageChange }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="perPage"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value: string) => {
                  field.onChange(value)
                  onPerPageChange(parseInt(value))
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Quantidade de resultados' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default class Show extends React.Component<ShowProps, ShowState> {
  constructor(props: ShowProps) {
    super(props)
    this.state = {
      offset: 0,
      data: null,
      elements: [],
      perPage: 8,
      currentPage: 0,
      pageCount: 0,
      searchTerm: ""
    }
  }

  async componentDidMount() {
    await this.fetchCommands()
  }

  async fetchCommands() {
    const commandsServices = new serviceCommands()

    let filteredData: IData[] = []

    try {
      let response: serviceCommandsProps
      if (this.props.commandId) {
        response = await commandsServices.show(this.props.commandId)
      } else {
        response = await commandsServices.index()
      }

      if (response.data != null) {
        filteredData = Array.isArray(response.data) ? response.data : [response.data]
      }

      if (this.state.searchTerm) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
      }

      const { perPage } = this.state
      const pageCount = Math.ceil(filteredData.length / perPage)

      this.setState(
        {
          data: filteredData,
          pageCount
        },
        () => this.setElementsForCurrentpage()
      )
    } catch (error) {
      console.error('Erro ao buscar comandos:', error)
    }
  }



  setElementsForCurrentpage() {
    if (this.state.data) {
      let elements: JSX.Element[] = []

      if (this.props.commandId) {
        elements = this.state.data
          .map((item) => this.renderReplies(item))
          .flat()
      } else {
        elements = this.state.data
          .slice(this.state.offset, this.state.offset + this.state.perPage)
          .map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Link href={`/dashboard/databases/commands?action=handle&id=${item.id}`}>
                    <SquareMousePointer />
                  </Link>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.sector?.name}</TableCell>
              </TableRow>
            )
          })
      }

      this.setState({ elements })
    }
  }

  renderReplies(item: IData): JSX.Element[] {
    const renderTableRow = (item: IData, index: number): JSX.Element => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <Link href={`/dashboard/databases/commands?action=handle&id=${item.id}`}>
              <SquareMousePointer />
            </Link>
          </TableCell>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell className="text-right">{item.sector?.name}</TableCell>
        </TableRow>
      )
    }

    const renderRepliesRecursive = (replies: IData[] | undefined): JSX.Element[] => {
      if (!replies) return []

      return replies.flatMap((reply, index) => {
        return [
          renderTableRow(reply, index),
          ...renderRepliesRecursive(reply.replies)
        ]
      })
    }

    return renderRepliesRecursive(item.replies)
  }

  handlePageClick(isNext: boolean) {
    let newPage = this.state.currentPage
    if (isNext) {
      newPage = Math.min(this.state.currentPage + 1, this.state.pageCount - 1)
    } else {
      newPage = Math.max(this.state.currentPage - 1, 0)
    }
    const newOffset = newPage * this.state.perPage
    this.setState({ currentPage: newPage, offset: newOffset }, () => {
      this.setElementsForCurrentpage()
    })
  }

  handlePerPageChange = (perPage: number) => {
    this.setState({ perPage }, () => {
      this.setElementsForCurrentpage()
    })
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm }, () => {
      this.fetchCommands()
    })
  }

  createCommand = async () => {
    const api = new serviceCommands()
    const response = await api.store(null)

    if (response.success) {
      toast({ title: "Novo comando criado!" })
      this.fetchCommands()
    } else {
      toast({ title: "Novo comando não foi criado!" })
    }
  }

  render() {
    let paginationElement: React.ReactNode
    paginationElement = (
      <Pagination className='mt-3'>
        <PaginationContent>
          {this.state.currentPage !== 0 ? (
            <PaginationItem>
              <PaginationPrevious
                className='cursor-pointer'
                onClick={() => this.handlePageClick(false)}
              />
            </PaginationItem>
          ) : null}
          <PaginationItem>
            <PaginationLink>
              {this.state.currentPage + 1}
            </PaginationLink>
          </PaginationItem>
          {this.state.currentPage !== this.state.pageCount - 1 ? (
            <PaginationItem>
              <PaginationNext
                className='cursor-pointer'
                onClick={() => this.handlePageClick(true)}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    )

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <div className='h-screen'>
            {this.state.data ? (
              <>
                <h1 className='font-bold text-2xl mb-7'>
                  Tabela de comandos
                </h1>
                <div className='mb-5 flex justify-between items-center'>
                  <div className='flex items-center gap-3'>
                    {this.props.commandId ? null : <Plus className='cursor-pointer' onClick={this.createCommand} />}
                    <FormComponent onPerPageChange={this.handlePerPageChange} />
                  </div>
                  <SearchComponent onSearch={this.handleSearch} />
                </div>
                <div className='flex flex-col justify-end'>
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[10px]"></TableHead>
                          <TableHead>#</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead className="text-right">Setor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {this.state.elements}
                      </TableBody>
                    </Table>
                    {paginationElement}
                  </div>
                </div>
              </>
            ) : (
              <div className='h-full flex justify-center'>
                <BlocksLoading />
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className='cursor-pointer'
            onClick={() => this.props.router.back()}
          >
            Voltar
          </ContextMenuItem>
          <ContextMenuItem
            className='cursor-pointer'
            onClick={() => this.props.router.refresh()}
          >
            Atualizar
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  }
}