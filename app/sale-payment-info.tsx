import { Trash2 } from 'lucide-react-native'
import { TouchableNativeFeedback, View } from 'react-native'

import { Header } from '@/components/header'
import { Text } from '@/components/text'
import { parseNumberToReal } from '../lib/utils'

export default function SalePaymentInfo() {
  return (
    <View className="flex-1">
      <View className="bg-violet-600">
        <Header backButton title="Detalhes do Pagamento" />
      </View>
      <View className="flex-1 bg-zinc-900 px-4 py-5">
        <View className="flex-row items-center justify-between pb-4 border-b border-b-zinc-800">
          <View className="flex-row items-center gap-4">
            <View className="size-4 rounded-full mb-0.5 bg-emerald-600" />
            <View>
              <Text>19/02/2025</Text>
              <Text variant="sm" className="text-zinc-400">
                {parseNumberToReal(100)}
              </Text>
            </View>
          </View>
          <View className="size-9 rounded overflow-hidden items-center justify-center">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ffffff', false)}
            >
              <View className="size-9 rounded-full overflow-hidden items-center justify-center">
                <Trash2 color="#fff" size={24} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  )
}
