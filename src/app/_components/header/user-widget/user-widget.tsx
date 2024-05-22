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

export const UserWidget = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-gray-600">
        <Avatar>
          <AvatarFallback className="bg-zinc-50 border border-zinc-300">
            OA
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="center" className="mt-2 max-w-56 py-3">
          <DropdownMenuItem className="focus:bg-transparent">
            <p className="text-ellipsis overflow-hidden text-sm">
              Oluwatunmiseadenuga@gmail.com
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-transparent">
            <Button variant="outline" size="sm" className="w-full">
              Logout
              <span className="sr-only">Logout</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
