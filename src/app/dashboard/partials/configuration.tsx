'use client'

import { Badge } from "@/components/ui/badge"
import { api } from "@/services/axios"
import { Moon, Sun } from "lucide-react"
import React from "react"
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

function ShowAccesses() {
    const [access, setAccess] = React.useState<'loading' | string>('loading')

    React.useEffect(() => {
        api.get('access')
            .then((response) => {
                const { access } = response.data
                setAccess(access)
            })
    }, [])

    return <Badge className='capitalize'>{access}</Badge>
}

function useTheme() {
    const [theme, setTheme] = React.useState<string>('light')

    React.useEffect(() => {
        const theme = Cookie.get('theme')
        if (theme) {
            setTheme(theme)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        Cookie.set('theme', newTheme)
        setTheme(newTheme)
    }

    return { theme, toggleTheme }
}

function HandleTheme() {
    const { theme, toggleTheme } = useTheme()
    const router = useRouter()

    const handleThemeChange = () => {
        toggleTheme()
        router.refresh()
    }

    return (
        <div>
            {theme === 'dark' ? (
                <Moon onClick={handleThemeChange} className='cursor-pointer' size={20} />
            ) : (
                <Sun onClick={handleThemeChange} className='cursor-pointer' size={20} />
            )}
        </div>
    )
}

export function Configuration() {
    return (
        <div className='flex gap-3 items-center'>
            <ShowAccesses />
            <HandleTheme />
        </div>
    )
}