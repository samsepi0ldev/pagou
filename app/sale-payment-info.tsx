import { Header } from '@/components/header'
import { parseNumberToReal } from 'lib/utils'
import { Trash2 } from 'lucide-react-native'
import { Text, TouchableNativeFeedback, View } from 'react-native'

export default function SalePaymentInfo() {
  return (
    <View className='flex-1'>
      <View className='bg-emerald-600'>
        <Header
          backButton
          title='Detalhe do Pagamento'
        />
      </View>
      <View className='flex-1 bg-zinc-900 px-4 py-5'>
        <View className='flex-row items-center justify-between pb-4 border-b border-b-zinc-800'>
          <View className='flex-row items-center gap-4'>
            <View className='size-4 rounded-full mb-0.5 bg-emerald-600' />
            <View>
              <Text className='text-zinc-100 text-base font-medium'>
                19/02/2025
              </Text>
              <Text className='text-sm text-zinc-400'>
                {parseNumberToReal(100)}
              </Text>
            </View>
          </View>
          <View className='size-9 rounded overflow-hidden items-center justify-center'>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#ffffff', false)}
            >
              <View className='size-9 rounded-full overflow-hidden items-center justify-center'>
                <Trash2 color='#fff' size={24} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  )
}
