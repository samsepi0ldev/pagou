import { TouchableOpacity, View } from 'react-native'

import { Header } from '@/components/header'
import { Text } from '@/components/text'
import { router } from 'expo-router'
import { parseNumberToReal } from '../lib/utils'

export default function PaymentsFromSale() {
  return (
    <View className="flex-1">
      <View className="bg-violet-600">
        <Header backButton title="Pagamentos" />
      </View>
      <View className="flex-1 bg-zinc-900 px-4 py-5">
        <TouchableOpacity
          className="flex-row items-center justify-between pb-4 border-b border-b-zinc-800"
          onPress={() => router.push({ pathname: '/sale-payment-info' })}
        >
          <View className="flex-row items-center gap-4">
            <View className="size-4 rounded-full mb-0.5 bg-emerald-600" />
            <View>
              <Text>19/02/2025</Text>
              <Text variant="sm" className="text-zinc-400">
                {parseNumberToReal(100)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
