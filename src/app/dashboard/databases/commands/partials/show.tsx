'use client'

import React from 'react'
import { IData, serviceCommands, serviceCommandsProps } from '@/services/commands'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CardHeader, CardTitle } from '@/components/ui/card'
import { SquareMousePointer } from 'lucide-react'
import Link from 'next/link'

function FetchData() {
  const [data, setData] = React.useState<IData[]>([])
  const commandsServices = new serviceCommands()

  async function fetchCommands() {
    const response: serviceCommandsProps = await commandsServices.index()

    if (response.success && response.data) {
      setData(response.data)
    }
  }

  React.useEffect(() => {
    fetchCommands()
  }, [])

  console.log(data)

  return (
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
        {data.map((item, index) => (
          <TableRow key={index}>
            <Link href={'/'}>
              <TableCell>
                <SquareMousePointer />
              </TableCell>
            </Link>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.sector.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function Show() {
  return (
    <div>
      <h1 className='font-bold text-2xl mb-7'>
        Tabela de comandos
      </h1>
      <div className='mb-5'>
        cadastrar, pesquisar
      </div>
      <React.Suspense>
        <FetchData />
      </React.Suspense>
    </div>
  )
}

