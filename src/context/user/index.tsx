import { IUser } from '@/@types/User'
import { ReactNode, createContext, useState, useContext } from 'react'
import { AxiosContext } from '..'

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
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })
    const { api } = useContext(AxiosContext)

    function loginUser(userData: IUser)
    {
        setUser(userData)
        sessionStorage.setItem('user', JSON.stringify(userData))
    }

    function logoutUser()
    {
        setUser(null)
        api.post('logout')
        sessionStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            { children }
        </UserContext.Provider>
    )
}