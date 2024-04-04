import { SunMoon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

export function Theme() {
    const theme = Cookie.get('theme')
    const router = useRouter()

    const handleTheme = () => {
        if (theme === 'dark') {
            Cookie.set('theme', 'light')
        } else {
            Cookie.set('theme', 'dark')
        }

        router.refresh()
    }

    return <button onClick={handleTheme}><SunMoon className='dark:text-white' /></button>
}
