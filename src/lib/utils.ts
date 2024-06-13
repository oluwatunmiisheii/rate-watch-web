import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateNumberInput = (input: string): string => {
  input = input.replace(/^0+/g, '')
  const formattedInput = input.replace(/[^\d.]/g, '')
  const parts = formattedInput.split('.')

  if (parts.length > 2) {
    return parts.slice(0, 2).join('.')
  }

  return formattedInput
}

export const formatNumberWithCommas = (value: string): string => {
  value = value.replace(/[,\s]/g, '')

  const parts = value.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (parts.length > 1) {
    return parts[1] ? `${parts[0]}.${parts[1]}` : `${parts[0]}.`
  } else {
    return parts[0]
  }
}
