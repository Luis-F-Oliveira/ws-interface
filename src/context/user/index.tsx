import { IUser } from '@/@types/User'
import { ReactNode, createContext, useState, useContext } from 'react'

interface UserContextProps {
    user: IUser | null
    loginUser: (userData: IUser) => void
    logoutUser: () => void
}

const UserContext = createContext({} as UserContextProps)

export function useUser()
{
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um UserProvider')
    }
    return context
}

interface UserProviderProps {
    children: ReactNode
}

export function UserProvider({ children }: UserProviderProps)
{
    const [user, setUser] = useState<IUser | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })

    function loginUser(userData: IUser)
    {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    function logoutUser()
    {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            { children }
        </UserContext.Provider>
    )
}