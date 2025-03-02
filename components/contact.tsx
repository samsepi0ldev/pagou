import { TouchableOpacity, View } from 'react-native'
import type * as Contacts from 'expo-contacts'

import { Text } from '@/components/text'
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
    <TouchableOpacity>
      <View className='flex-row gap-4'>
        <Avatar image={image} />
        <View>
          <Text variant='header' className='text-2xl'>{name}</Text>
          <Text variant='sm'>{phoneNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}