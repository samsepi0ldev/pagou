import { CircleOff } from 'lucide-react-native'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Text } from '@/components/text'

export function EmptyData() {
  return (
    <View className='flex-1 items-center justify-center gap-1'>
      <CircleOff size={64} color={colors.zinc[400]} />
      <Text variant='header' className='text-zinc-400 text-2xl'>Sem registro</Text>
      <Text className='text-zinc-400'>Nenhum pagamento encontrado</Text>
    </View>
  )
}