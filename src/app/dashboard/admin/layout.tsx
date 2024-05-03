'use client'

import BlocksLoading from '@/components/loading/blocks'
import { api } from '@/services/axios'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [isAdmin, setIsAdmin] = React.useState<'loading' | 'denied' | 'released'>('loading')
    const router = useRouter()

    React.useEffect(() => {
        api.get('access')
        .then((response) => {
            const { access } = response.data

            if (access === 'admin') {
                setIsAdmin('released')
            } else {
                setIsAdmin('denied')
            }
        })
        .catch(() => {
            setIsAdmin('denied')
        })
    }, [])

    if (isAdmin === 'loading') {
        return <div className='flex justify-center items-center h-full'><BlocksLoading /></div>
    }

    if (isAdmin === 'denied') {
        return router.push('/dashboard')
    } else {
        return <div>{children}</div>
    }
}
