import type React from 'react'
import { TextInput, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { cn } from '../lib/utils'

interface InputRootProps extends React.ComponentProps<typeof View> {}

export function InputRoot({ className, ...props }: InputRootProps) {
  return (
    <View
      className={cn(
        'rounded-lg border border-zinc-700 px-4 py-1 flex-row gap-2 items-center',
        className
      )}
      {...props}
    />
  )
}

interface InputIconProps extends React.ComponentProps<typeof View> {}

export function InputIcon({ className, ...props }: InputIconProps) {
  return <View className={cn('', className)} {...props} />
}

interface InputProps extends React.ComponentProps<typeof TextInput> {}

export function Input({
  className,
  placeholderTextColor,
  ...props
}: InputProps) {
  return (
    <TextInput
      className={cn('w-full text-lg text-zinc-100 font-nunito-regular')}
      placeholderTextColor={placeholderTextColor ?? colors.zinc[400]}
      {...props}
    />
  )
}
