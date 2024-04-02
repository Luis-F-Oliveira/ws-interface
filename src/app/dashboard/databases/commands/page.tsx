'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import Show from './partials/show'

export default function Page() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')

  return (
    <>
      {action === 'show' && <Show />}
    </>
  )
}
