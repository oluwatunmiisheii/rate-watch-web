import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { signOut, auth } from 'auth'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
}

export const UserWidget = async () => {
  const session = await auth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-gray-600">
        <Avatar>
          <AvatarFallback className="bg-zinc-50 border border-zinc-300 uppercase">
            {getInitials(session?.user?.name ?? '')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="center" className="mt-2 max-w-56 py-3">
          <DropdownMenuItem className="focus:bg-transparent">
            <p className="text-ellipsis overflow-hidden text-sm">
              {session?.user?.email}
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-transparent">
            <form
              className="w-full"
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                type="submit"
              >
                Logout
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
