import { User2 } from 'lucide-react-native'
import React from 'react'
import { Image, View, type ImageProps } from 'react-native'
import colors from 'tailwindcss/colors'

interface AvatarProps {
  image?: ImageProps
}

export default function Avatar({ image }: AvatarProps) {
  return (
    <>
      {image ? (
        <Image className='rounded-2xl size-12' source={image} />
      ): (
        <View className='bg-zinc-400 size-12 rounded-2xl flex items-center justify-center'>
          <User2 size={24} color={colors.zinc[500]} />
        </View>
      )}
    </>
  )
}
