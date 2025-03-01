import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function parseNumberToReal (value: number) {
  return Intl
    .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(value / 100)
}

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
