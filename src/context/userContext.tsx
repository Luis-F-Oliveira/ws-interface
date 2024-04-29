import React from "react"

interface IUserContext {
    user: IUser | null
    loginUser: (userData: IUser) => void
    logoutUser: () => void
}

export interface IUser {
    id: number
    name: string
    email: string
    is_bot: boolean
    access_id: number
    sector_id: number
    access: IAccess
}

interface IAccess {
    id: number
    name: string
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = React.createContext({} as IUserContext)

export const useUser = () => {
    const context = React.useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<IUser | null>(null)

    React.useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    function loginUser(user: IUser) {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    function logoutUser() {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}
