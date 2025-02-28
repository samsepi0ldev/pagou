import { View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback } from 'react-native'
import { CircleMinus, CirclePlus, Cog } from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import { router } from 'expo-router'

import { Header } from '@/components/header'
import { Card, CardContent, CardTitle } from '@/components/card'
import { SalesPaymentInfo } from '@/components/sale-payment-info'

export default function HomeScreen () {
  return (
    <ScrollView className='flex-1 bg-zinc-900'>
      <View className='bg-violet-600'>
        <Header title=''>
          <TouchableOpacity>
            <Cog color='#fff' />
          </TouchableOpacity>
        </Header>
        <View className='items-center pb-4'>
          <Text className='text-base font-nunito-regular text-violet-100'>Valor pendente</Text>
          <View className='flex-row items-baseline mt-1'>
            <Text className='font-nunito-medium text-violet-100 mr-1'>R$</Text>
            <Text className='text-4xl font-nunito-medium text-violet-100'>780,00</Text>
          </View>
        </View>
      </View>
      <View className='flex-1 p-4 gap-4'>
        <Card>
          <CardTitle>Visao Geral</CardTitle>
         <CardContent>
          <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-1'>
                <CircleMinus color={colors.rose[600]} />
                <Text className='text-lg text-rose-600 font-semibold'>Vendas pendentes</Text>
              </View>
              <Text className='text-zinc-100 text-sm font-semibold'>7</Text>
            </View>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-1'>
                <CirclePlus color={colors.emerald[600]} />
                <Text className='text-lg text-emerald-600 font-semibold'>Vendas pagas</Text>
              </View>
              <Text className='text-zinc-100 text-sm font-semibold'>24</Text>
            </View>
         </CardContent>
        </Card>

        <Card>
          <CardTitle>Vendas pendentes recentes</CardTitle>
          {Array.from({ length: 3 }).map((_, i) => (
            <SalesPaymentInfo
              href='/sale-inf<FloaTActionButton />o'
              key={i.toString()}
              payment={{
                id: 1,
                description: 'C&A',
                price: 8000,
                totalPayment: 0
              }}
              paid={false}
            />
          ))}
   
          <TouchableNativeFeedback onPress={() => router.push('/sales')}>
            <View className='items-center justify-center py-4 mt-4 border-t border-t-zinc-700/50'>
              <Text className='text-zinc-100 font-medium'>Ver vendas</Text>
            </View>
          </TouchableNativeFeedback>
        </Card>

        <Card>
          <CardTitle>Pagamentos recentes</CardTitle>
          {Array.from({ length: 3 }).map((_, i) => (
            <SalesPaymentInfo
              href='/sale-payment-info' key={i.toString()}
              payment={{
                id: 1,
                description: '15/02/2025',
                price: 2000
              }}
              paid={true}
            />
          ))}
          <TouchableNativeFeedback>
            <View className='items-center justify-center py-4 mt-4 border-t border-t-zinc-700/50'>
              <Text className='text-zinc-100 font-medium'>Ver pagamentos</Text>
            </View>
          </TouchableNativeFeedback>
        </Card>
      </View>
    </ScrollView>
  )
}