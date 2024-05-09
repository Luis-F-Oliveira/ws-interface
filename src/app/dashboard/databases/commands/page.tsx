'use server'

import { api } from "@/services/axios"
import { Commands, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Commands[]> {
  const response = await api.get('commands')
  const commands: Commands[] = response.data
  return commands
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="pt-2">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
