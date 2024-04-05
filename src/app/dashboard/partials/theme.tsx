import { SunMoon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

export function Theme() {
    const theme = Cookie.get('theme')
    const router = useRouter()

    const handleTheme = () => {
        if (theme === 'light') {
            Cookie.set('theme', 'dark')
        } else {
            Cookie.set('theme', 'light')
        }

        router.refresh()
    }

    return <button onClick={handleTheme}><SunMoon className='dark:text-white' /></button>
}
