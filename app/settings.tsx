import { View, Text } from 'react-native'
import React from 'react'
import { Header } from '@/components/header'

export default function Settings () {
  return (
    <View className='flex-1 bg-zinc-800'>
      <View className='bg-violet-600'>
        <Header
          backButton
          title='Configurações'
        />
      </View>
    </View>
  )
}
