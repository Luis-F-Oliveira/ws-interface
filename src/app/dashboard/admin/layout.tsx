'use client'

import { api } from '@/services/axios'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [isAdmin, setIsAdmin] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        api.get('access')
            .then((response) => {
                if (response.status === 200) {
                    setIsAdmin(true)
                }
            })
    }, [])

    console.log(isAdmin)

    if (!isAdmin) {
        return router.push('/dashboard')
    }

    return <div>{children}</div>
}
