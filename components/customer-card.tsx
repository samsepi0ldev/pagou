import { User2 } from 'lucide-react-native'
import { View, TouchableNativeFeedback } from 'react-native'
import { twMerge } from 'tailwind-merge'
import colors from 'tailwindcss/colors'

import { parseNumberToReal } from '../lib/utils'
import { Text } from '@/components/text'

export function CustomerCard () {
  return (
    <TouchableNativeFeedback>
      <View className='flex-row items-center px-4 py-2 gap-4 border-b border-b-zinc-700'>
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