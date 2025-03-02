import { User2 } from 'lucide-react-native'
import { View, TouchableNativeFeedback } from 'react-native'
import { twMerge } from 'tailwind-merge'
import colors from 'tailwindcss/colors'

import { parseNumberToReal } from '../lib/utils'
import { Text } from '@/components/text'
import { router } from 'expo-router'

export function CustomerCard () {
  return (
    <TouchableNativeFeedback onPress={() => router.push('/customer-details')}>
      <View className='flex-row items-center p-4 gap-4 border-b border-b-zinc-700'>
        <View className='size-12 items-center justify-center rounded-full bg-zinc-600'>
          <User2 color={colors.zinc[800]} />
        </View>
        <View>
          <Text variant='title'>Flok</Text>
          <Text variant='sm' className='text-emerald-600'>
            {parseNumberToReal(1000)}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}