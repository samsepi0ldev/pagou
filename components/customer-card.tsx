import { User2 } from 'lucide-react-native'
import { TouchableNativeFeedback, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import colors from 'tailwindcss/colors'

import { Text } from '@/components/text'
import { router } from 'expo-router'
import { cn, parseNumberToReal } from '../lib/utils'

interface CustomerCardProps {
  id: string
  name: string
  balance?: number
}

export function CustomerCard({ id, name, balance }: CustomerCardProps) {
  return (
    <TouchableNativeFeedback
      onPress={() =>
        router.push({
          pathname: '/customer-details',
          params: { customer_id: id },
        })
      }
    >
      <View className="flex-row items-center p-4 gap-4 border-b border-b-zinc-700">
        <View className="size-12 items-center justify-center rounded-full bg-zinc-600">
          <User2 color={colors.zinc[800]} />
        </View>
        <View>
          <Text variant="title">{name}</Text>
          {balance !== undefined && (
            <Text
              variant="sm"
              className={cn(
                balance === 0 ? 'text-emerald-500' : 'text-rose-600'
              )}
            >
              {parseNumberToReal(balance)}
            </Text>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}
