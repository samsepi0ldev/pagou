import type React from 'react'
import { View, Text } from 'react-native'

interface HeaderProps {
  children?: React.ReactNode
  title: string
}

export function Header ({ children, title }: HeaderProps) {
  return (
    <View className='h-16 items-center justify-between px-4 flex-row'>
      <Text className='text-2xl text-violet-50'>{title}</Text>
      <View className='flex-row gap-4'>
        {children}
      </View>
    </View>
  )
}