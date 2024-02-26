import { useUser } from "@/context/user"
import { Navigate } from "react-router-dom"
import { ReactNode } from "react"

interface PrivateRouteProps {
    children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps)
{
    const { user } = useUser()

    if (!user) {
        return <Navigate to={'/login'} replace />
    }

    return children
}