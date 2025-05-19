'use client'

import { Button } from '@/components/ui/button/button'
import { toast } from 'sonner'
import { Show } from 'react-smart-conditional'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer/drawer'
import { useClerk } from '@clerk/nextjs'

export const DeleteUser = ({ email, id }: { email: string; id: string }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { signOut } = useClerk()

  const deleteAccount = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/delete-user?email=${email}&user_id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message)
      } else {
        toast.success('Account deleted successfully')
        signOut({ redirectUrl: '/' })
      }
    } catch (error) {
      toast.error('Internal Server Error')
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        className="w-full"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault()
          setShowDeleteDialog(true)
        }}
      >
        Delete Account
      </Button>
      <Show>
        <Show.If condition={isDesktop && showDeleteDialog}>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent
              className="sm:max-w-[425px]"
              forceMount
              onInteractOutside={(e) => e.preventDefault()}
              onFocusOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account? You will no longer be able to access
                  your account or receive notifications.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col justify-end gap-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    deleteAccount()
                  }}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
                <Button variant="light" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </Show.If>
        <Show.If condition={!isDesktop && showDeleteDialog}>
          <Drawer open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Delete account?</DrawerTitle>
                <DrawerDescription>
                  Are you sure you want to delete this account? You will no longer be able to access
                  your account or receive notifications.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="pt-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    deleteAccount()
                  }}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
                <DrawerClose asChild>
                  <Button variant="light">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Show.If>
      </Show>
    </>
  )
}
