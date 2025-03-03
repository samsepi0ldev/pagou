import type * as Contacts from 'expo-contacts'
import { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Text } from '@/components/text'
import Avatar from './avatar'

interface ContactProps {
  data: {
    name: string
    image: Contacts.Image
    phoneNumber: string | null
  }
}

export const Contact = memo(
  ({ data: { image, name, phoneNumber } }: ContactProps) => {
    return (
      <TouchableOpacity className="py-1">
        <View className="flex-row gap-4">
          <Avatar image={image} />
          <View>
            <Text variant="header" className="text-2xl">
              {name}
            </Text>
            <Text variant="sm">{phoneNumber}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)
