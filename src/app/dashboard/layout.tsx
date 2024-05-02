'use client'

import { Fragment, ReactNode } from "react"
import { Sidebar } from "./partials/sidebar"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Theme } from "./partials/theme"
import { UserProvider } from "@/context/userContext"


interface RootLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({
    children
}: RootLayoutProps) {
    const pathname = usePathname()
    const parts = pathname.split('/').filter(part => part !== '')
    return (
        <UserProvider>
            <main className='flex gap-3'>
                <Sidebar />
                <section className='my-3 mr-3 flex flex-col gap-2 w-full'>
                    <div className='flex justify-between items-center'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>WS - Interface</BreadcrumbPage>
                                </BreadcrumbItem>
                                {parts.map((part, index) => {
                                    const breadcrumbPath = '/' + parts.slice(0, index + 1).join('/')

                                    return (
                                        <Fragment key={index}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                {index === parts.length - 1 ? (
                                                    <BreadcrumbPage>{part.charAt(0).toUpperCase() + part.slice(1)}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={breadcrumbPath}>{part.charAt(0).toUpperCase() + part.slice(1)}</BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                        </Fragment>
                                    )
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Theme />
                    </div>
                    {children}
                </section>
            </main>
        </UserProvider>
    )
}