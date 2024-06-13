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
import { SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export const UserWidget = async () => {
  const user = await currentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-gray-600">
        <Avatar>
          <AvatarFallback className="bg-zinc-50 border border-zinc-300 uppercase">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="center" className="mt-2 max-w-56 py-3">
          <DropdownMenuItem className="focus:bg-transparent block text-center">
            <p className="text-ellipsis overflow-hidden text-sm capitalize">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-ellipsis overflow-hidden text-sm text-muted-foreground">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-transparent">
            <SignOutButton>
              <Button variant="light" size="sm" className="w-full">
                Logout
              </Button>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
