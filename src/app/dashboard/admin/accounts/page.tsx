'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Terminal } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface PrincipalContextMenuProps {
  children: React.ReactNode
}

const PrincipalContextMenu: React.FC<PrincipalContextMenuProps> = ({ children }) => {
  const pathname = usePathname()

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <Link href={`${pathname}?action=show`}>
              Todos usuários
            </Link>
          </ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export default function Page() {
  return (
    <div className='pt-3'>
      <Alert>
        <Terminal />
        <AlertTitle>Observações</AlertTitle>
        <AlertDescription>
          Algumas observações
        </AlertDescription>
      </Alert>
      <PrincipalContextMenu>
        <div className='w-full h-screen mt-2'>

        </div>
      </PrincipalContextMenu>
    </div>
  )
}
