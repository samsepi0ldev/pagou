import type React from 'react'
import { View, Text, type TextProps, type ViewProps } from 'react-native'

interface CardProps extends ViewProps {}

export function Card (props: CardProps) {
  return (
    <View className='border border-zinc-700 bg-zinc-800 rounded-xl' {...props} />
  )
}

interface CardContentProps extends ViewProps {}

export function CardContent (props: CardContentProps) {
  return (
    <View className='px-5 py-4 gap-4' {...props} />
  )
}

interface CardTitleProps extends TextProps {}

export function CardTitle (props: CardTitleProps) {
  return (
    <Text className='font-semibold text-zinc-100 mx-5 mt-4 mb-2' {...props} />
  )
}
