import { User2 } from 'lucide-react-native'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Text } from '@/components/text'
import type * as Contacts from 'expo-contacts'
import Avatar from './avatar'

interface ContactProps {
  data: {
    name: string
    image: Contacts.Image
    phoneNumber: string | null
  }
}

export function Contact({ data: { image, name, phoneNumber } }: ContactProps) {
  return (
    <View className='flex-row gap-4'>
      <Avatar image={image} />
      <View>
        <Text variant='header' className='text-2xl'>{name}</Text>
        <Text variant='sm'>{phoneNumber}</Text>
      </View>
    </View>
  )
}