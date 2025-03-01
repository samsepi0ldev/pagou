import { Header } from '@/components/header'
import { Calendar, CircleUserRound, DollarSign, NotebookText, Pencil, Trash2, Wallet } from 'lucide-react-native'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Text } from '@/components/text'

export default function SaleInfo () {
  return (
    <View className='flex-1 bg-zinc-900'>
      <View className='bg-violet-600'>
        <Header
          backButton
          title='Detalhes da venda'>
            <TouchableOpacity className='size-8 items-center justify-center'>
              <Pencil size={24} color={colors.violet[100]} />
            </TouchableOpacity>
            <TouchableOpacity className='size-8 items-center justify-center'>
              <Trash2 size={24} color={colors.violet[100]} />
            </TouchableOpacity>
        </Header>
      </View>
      <ScrollView contentContainerClassName='px-4 py-5 gap-6 flex-1'>
        <View className='flex-row items-center gap-4'>
          <CircleUserRound size={48} color={colors.zinc[500]} />
          <Text variant='heading-sub-title'>John Doe</Text>
        </View>
        <View className='gap-4'>
          <View className='flex-row gap-2 items-center'>
            <NotebookText strokeWidth={1} size={16} color={colors.zinc[500]} />
            <Text variant='description'>C&A</Text>
          </View>
          <View className='flex-row gap-2 items-center'>
            <Calendar strokeWidth={1} size={16} color={colors.zinc[500]} />
            <Text variant='description'>08/02/2024</Text>
          </View>
        </View>
        <View className='py-5 border-y border-y-zinc-800 flex-row items-center justify-evenly'>
          <View className='items-center justify-center'>
            <Text className='font-nunito-bold'>R$ 80,00</Text>
            <Text className='text-xs text-zinc-500'>Venda Total</Text>
          </View>

          <View className='w-px h-full bg-zinc-800' />

          <View className='items-center justify-center'>
            <Text className='font-nunito-bold text-emerald-500'>R$ 00,00</Text>
            <Text className='text-xs text-zinc-500'>Total Pago</Text>
          </View>
        </View>

        <View className='gap-4'>
          <TouchableOpacity className='flex-row items-center gap-4'>
            <DollarSign size={24} color={colors.zinc[500]} />
            <Text className='text-zinc-400'>Adicionar Pagamento</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center gap-4'>
            <Wallet size={24} color={colors.zinc[500]} />
            <Text className='text-zinc-400'>Ver Pagamentos</Text>
          </TouchableOpacity>
        </View>

        <View className='absolute bottom-0 left-0 right-0 py-6 border-t border-t-zinc-600 flex-row items-center justify-center'>
          <Text className='font-nunito-bold'>Total Pendente: </Text>
          <Text className='text-red-500'>R$ 80,00</Text>
        </View>
      </ScrollView>
    </View>
  )
}
