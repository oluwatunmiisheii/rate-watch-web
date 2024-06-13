'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area/scroll-area'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button/button'

export const Notifications = () => {
  const [notifications] = React.useState([
    {
      id: 1,
      title: 'New message',
      body: 'You have a new message from Jane Doe',
      time: '2m ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'New order',
      body: 'You have a new order from John Doe',
      time: '1h ago',
      isRead: true,
    },
    {
      id: 3,
      title: 'New customer',
      body: 'Jane Doe has joined your team',
      time: '5h ago',
      isRead: true,
    },
    {
      id: 4,
      title: 'New message',
      body: 'You have a new message from Jane Doe',
      time: '2m ago',
      isRead: false,
    },
    {
      id: 5,
      title: 'New order',
      body: 'You have a new order from John Doe',
      time: '1h ago',
      isRead: true,
    },
    {
      id: 6,
      title: 'New customer',
      body: 'Jane Doe has joined your team',
      time: '5h ago',
      isRead: true,
    },
  ])

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild disabled>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:bg-transparent focus:bg-transparent"
        >
          <span className="sr-only">Notifications</span>
          <svg
            data-slot="icon"
            fill="none"
            className="size-7"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            ></path>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="center" className="mt-2">
          <DropdownMenuLabel asChild>
            <div className="flex justify-between">
              <h2 className="text-base">Notifications</h2>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <div className="flex items-center flex-col justify-center h-[50vh] w-80 text-center">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="size-10 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                ></path>
              </svg>
              <div className="mt-6">
                <h2 className=" text-gray-800 text-base font-semibold">No notifications</h2>
                <p className="text-gray-500 text-base mt-2">
                  We&apos;ll let you know when there will be something to update you
                </p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[50vh] w-80">
                <ul className="space-y-3 py-5">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={twMerge(notification.isRead && 'opacity-60')}
                    >
                      <DropdownMenuItem className="block">
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-500">{notification.body}</p>
                        <time className="text-sm text-gray-500">{notification.time}</time>
                      </DropdownMenuItem>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <DropdownMenuSeparator />
              <div className="mx-3 py-2">
                <Button variant="link" size="sm" className="w-full">
                  Mark all as read
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
