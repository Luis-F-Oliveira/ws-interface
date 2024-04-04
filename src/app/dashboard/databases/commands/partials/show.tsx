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
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  perPage: z.number()
})

interface ShowProps { }

interface FormProps {
  onPerPageChange: (perPage: number) => void
}

interface ShowState {
  offset: number
  data: IData[]
  elements: React.ReactNode[]
  perPage: number
  currentPage: number
  pageCount: number
}

const SearchComponent = () => {
  return (
    <h1>Search</h1>
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
      data: [],
      elements: [],
      perPage: 8,
      currentPage: 0,
      pageCount: 0
    }
  }

  async componentDidMount() {
    await this.fetchCommands()
  }

  async fetchCommands() {
    const commandsServices = new serviceCommands()
    const response: serviceCommandsProps = await commandsServices.index()

    if (response.success && response.data) {
      this.setState({
        data: response.data,
        pageCount: Math.ceil(this.state.data.length / this.state.perPage),
      }, () => this.setElementsForCurrentpage())
    }
  }

  setElementsForCurrentpage() {
    let elements = this.state.data
      .slice(this.state.offset, this.state.offset + this.state.perPage)
      .map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>
              <Link href={'/'}>
                <SquareMousePointer />
              </Link>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.sector.name}</TableCell>
          </TableRow>
        )
      })
    this.setState({ elements: elements })
  }

  handlePageClick(isNext: boolean) {
    let newPage = this.state.currentPage
    if (isNext) {
      newPage = Math.min(this.state.currentPage + 1, this.state.pageCount - 1)
    } else {
      newPage = Math.max(this.state.currentPage - 1, 0)
    }
    const newOffset = newPage * this.state.perPage;
    this.setState({ currentPage: newPage, offset: newOffset }, () => {
      this.setElementsForCurrentpage();
    })
  }

  handlePerPageChange = (perPage: number) => {
    this.setState({ perPage }, () => {
      this.setElementsForCurrentpage()
    })
  };

  render() {
    let paginationElement
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
      <div className='h-full'>
        <h1 className='font-bold text-2xl mb-7'>
          Tabela de comandos
        </h1>
        <div className='mb-5 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Link href={'/dashboard/databases/commands?action=store'}>
              <Plus />
            </Link>
            <FormComponent onPerPageChange={this.handlePerPageChange} />
          </div>
          <Card className='p-2'>
            <SearchComponent />
          </Card>
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
      </div>
    )
  }
}