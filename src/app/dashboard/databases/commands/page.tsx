'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import Show from './partials/show'
import Handle from './partials/handle'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const action = searchParams.get('action')
  let id: string | null = null
  let commandId: string | null = null

  if (action === 'handle') {
    id = searchParams.get('id')
  }

  if (action === 'show') {
    commandId = searchParams.get('command')
  }

  return (
    <>
      {action === 'show' && <Show commandId={commandId} router={router} />}
      {action === 'handle' && <Handle id={id} />}
    </>
  )
}
