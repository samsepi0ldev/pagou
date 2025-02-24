import { User2 } from 'lucide-react-native'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { twMerge } from 'tailwind-merge'
import colors from 'tailwindcss/colors'

import { parseNumberToReal } from '../lib/utils'

export function CustomerCard () {
  return (
    <TouchableNativeFeedback>
      <View className='flex-row items-center px-4 py-2 gap-4 border-b border-b-zinc-700'>
        <View className='size-12 items-center justify-center rounded-full bg-zinc-600'>
          <User2 color={colors.zinc[800]} />
        </View>
        <View>
          <Text className='text-base text-zinc-100 font-semibold'>Flok</Text>
          <Text className={twMerge('text-sm text-emerald-500')}>
            {parseNumberToReal(1000)}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}