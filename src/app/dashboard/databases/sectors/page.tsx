'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Handle } from './partials/handle'
import Index from './partials/index'

export default function Page() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  let id: string | null = null

  if (action === 'handle') {
    id = searchParams.get('id')
  }

  return (
    <>
      {action === 'index' && <Index />}
      {action === 'handle' && <Handle id={id} />}
    </>
  )
}
