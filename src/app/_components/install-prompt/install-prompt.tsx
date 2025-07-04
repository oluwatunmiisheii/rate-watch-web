'use client'
import { Button } from '@/components/ui/button/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/popover'
import { AppWindow, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function InstallPrompt() {
  const [open, setOpen] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<any>(null)

  let isIOS = true
  if (typeof window !== 'undefined' && 'navigator' in window) {
    isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  }

  useEffect(() => {
    try {
      setIsStandalone(
        window.matchMedia('(display-mode: standalone)').matches ||
          (window.navigator as any).standalone,
      )
    } catch (error) {
      console.error('Error checking standalone mode:', error)
    }
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)

      if (!isStandalone) {
        timeout = setTimeout(() => setOpen(true), 2000)
      }
    }

    const handleAppInstalled = () => {
      setInstallPrompt(null)
      setOpen(false)
      setIsStandalone(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      timeout && clearTimeout(timeout)
    }
  }, [isStandalone])

  function installApp() {
    if (installPrompt) {
      installPrompt.prompt()
      installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
      })
    }
    setOpen(false)
  }

  if (isStandalone || isIOS || !installPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <motion.button
            initial={{ y: 0, scale: 1 }}
            animate={{
              y: [-10, 0, -10],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
            }}
            whileHover={{
              scale: 1.1,
              y: 0,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => installApp()}
          >
            <div className="relative h-11 w-32 rounded-3xl flex items-center justify-center bg-[#1D4ED8] text-white">
              Install
              <div className="mt-1 relative ml-2">
                <AppWindow className="size-6" />
                <Plus className="size-3 absolute top-4 left-4 bg-white text-primary rounded-full p-[1px]" />
              </div>
            </div>
          </motion.button>
        </PopoverTrigger>

        {isIOS && (
          <PopoverContent className="w-80" side="top">
            <div className="space-y-2">
              <h4 className="font-medium">Install Rate Watch</h4>
              <ol className="list-decimal ml-5 text-sm text-gray-600 space-y-1">
                <li>Tap the share icon</li>
                <li>Scroll down and tap &quot;Add to Home Screen&quot;</li>
                <li>Tap &quot;Add&quot; in the top right</li>
              </ol>
              <div className="flex justify-end mt-2">
                <Button size="sm" onClick={() => setOpen(false)}>
                  Got it
                </Button>
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}
