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
import { useAppContext } from '@/providers/app.provider'
import { UseMutationResult } from '@tanstack/react-query'

interface DeleteRateAlertProps {
  deleteRateAlert: UseMutationResult<any, Error, string, unknown>
}

export function DeleteRateAlert({ deleteRateAlert }: Readonly<DeleteRateAlertProps>) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { selectedAlert, setSelectedAlert } = useAppContext()

  if (isDesktop) {
    return (
      <Dialog
        open={!!selectedAlert}
        onOpenChange={(open) => {
          !open && setSelectedAlert(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete alert?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this alert? You’ll no longer receive notifications
              about this exchange rate.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-end gap-2">
            <Button
              onClick={() => {
                if (selectedAlert) {
                  deleteRateAlert.mutateAsync(selectedAlert).then(() => {
                    setSelectedAlert(null)
                  })
                }
              }}
              isLoading={deleteRateAlert.status === 'pending'}
            >
              Delete
            </Button>
            <Button variant="light" onClick={() => setSelectedAlert(null)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={!!selectedAlert}
      onOpenChange={(open) => {
        !open && setSelectedAlert(null)
      }}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete alert?</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete this alert? You’ll no longer receive notifications about
            this exchange rate.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <Button
            onClick={() => {
              if (selectedAlert) {
                deleteRateAlert.mutateAsync(selectedAlert).then(() => {
                  setSelectedAlert(null)
                })
              }
            }}
            isLoading={deleteRateAlert.status === 'pending'}
          >
            Delete
          </Button>
          <DrawerClose asChild>
            <Button variant="light">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
