'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import Show from './partials/show'
import Handle from './partials/handle'

export default function Page() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  let id: string | null = null

  if (action === 'handle') {
    id = searchParams.get('id')
  }

  return (
    <>
      {action === 'show' && <Show />}
      {action === 'handle' && <Handle id={id} />}
    </>
  )
}
