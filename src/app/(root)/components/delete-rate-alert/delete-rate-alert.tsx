import * as React from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button/button'
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

interface DeleteRateAlertProps {
  open: boolean
  onClose(): void
  onDelete(): void
  status: 'pending' | 'idle' | 'error' | 'success'
}

export function DeleteRateAlert({
  open,
  onClose,
  onDelete,
  status,
}: DeleteRateAlertProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(open) => {
          !open && onClose()
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete alert?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this alert? You’ll no longer
              receive notifications about this exchange rate.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-end gap-2">
            <Button onClick={onDelete} isLoading={status === 'pending'}>
              Delete
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        !open && onClose()
      }}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete alert?</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete this alert? You’ll no longer receive
            notifications about this exchange rate.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <Button onClick={onDelete} isLoading={status === 'pending'}>
            Delete
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
