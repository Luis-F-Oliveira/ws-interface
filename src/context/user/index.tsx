import { ReactNode, createContext, useState, useContext } from 'react'

interface User {
    id: number
    name: string
    email: string
}

interface Token {
    value: string
}

interface UserContextProps {
    user: User | null
    token: Token | null
    loginUser: (userData: User, token: Token) => void
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
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })
    const [token, setToken] = useState<Token | null>(() => {
        const savedToken = localStorage.getItem('jwt');
        return savedToken ? { value: savedToken } : null;
    })

    function loginUser(userData: User, token: Token)
    {
        setUser(userData)
        setToken(token)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('jwt', token.value)
    }

    function logoutUser()
    {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('jwt')
    }

    return (
        <UserContext.Provider value={{ user, token, loginUser, logoutUser }}>
            { children }
        </UserContext.Provider>
    )
}