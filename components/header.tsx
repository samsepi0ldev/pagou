import type React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'

interface HeaderProps {
  children?: React.ReactNode
  title: string
  backButton?: boolean
}

export function Header ({ children, title, backButton = false }: HeaderProps) {
  return (
    <View className='h-16 items-center justify-between px-4 flex-row'>
      <View className='flex-row items-center gap-4'>
        {backButton && (
          <View className='rounded-full overflow-hidden'>
            <TouchableNativeFeedback onPress={router.back}>
                <ArrowLeft size={24} color='#fff' />
            </TouchableNativeFeedback>
          </View>
        )}
        <Text className='text-2xl text-violet-50 font-nunito-bold'>{title}</Text>
      </View>
      <View className='flex-row gap-4'>
        {children}
      </View>
    </View>
  )
}