import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateNumberInput = (input: string) => {
  if (input.startsWith('.')) {
    return ''
  }

  const formattedInput = input.replace(/[^0-9.]/g, '')

  if (formattedInput.split('.').length > 2) {
    return formattedInput.slice(0, -1)
  }

  return formattedInput
}
