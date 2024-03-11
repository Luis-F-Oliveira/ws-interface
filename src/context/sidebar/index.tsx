import { ReactNode, createContext, useState, useContext } from 'react'

interface SidebarContextProps {
    open: boolean
    updateState: () => void
}

const SidebarContext = createContext({} as SidebarContextProps)

export function useSidebar()
{
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useSidebar deve ser usado dentro de um SidebarProvider')
    }
    return context
}

interface SidebarProviderProps {
    children: ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps)
{
    const [open, setOpen] = useState<boolean>(false)

    function updateState()
    {
        setOpen(!open)
    }

    return (
        <SidebarContext.Provider value={{ open, updateState }}>
            { children }
        </SidebarContext.Provider>
    )
}