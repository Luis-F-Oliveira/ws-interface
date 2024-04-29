'use client'

import { UserProvider } from "@/context/userContext"
import React from "react"

export default function LoginLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}