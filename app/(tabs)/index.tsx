import { View, TouchableOpacity, ScrollView, TouchableNativeFeedback } from 'react-native'
import { CircleMinus, CirclePlus, Cog } from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import { Link, router } from 'expo-router'

import { Header } from '@/components/header'
import { Card, CardContent, CardTitle } from '@/components/card'
import { SalesPaymentInfo } from '@/components/sale-payment-info'
import { Text } from '@/components/text'

const sales = [
  { id: 1, description: 'Venda 1', price: 100, created_at: '2023-10-01T10:00:00Z', totalPayment: 100 },
  { id: 2, description: 'Venda 2', price: 200, created_at: '2023-10-01T12:00:00Z', totalPayment: 100 },
  { id: 3, description: 'Venda 3', price: 300, created_at: '2023-10-02T09:00:00Z', totalPayment: 300 },
]

export default function HomeScreen () {
  return (
    <ScrollView className='flex-1 bg-zinc-900'>
      <View className='bg-violet-600'>
        <Header title=''>
          <Link href='/settings'>
            <Cog color='#fff' />
          </Link>
        </Header>
        <View className='items-center pb-4'>
          <Text>Valor pendente</Text>
          <View className='flex-row items-baseline mt-1'>
            <Text variant='heading' className='text-base mr-1'>R$</Text>
            <Text variant='heading'>780,00</Text>
          </View>
        </View>
      </View>
      <View className='flex-1 p-4 gap-4'>
        <Card>
          <CardTitle>Visão Geral</CardTitle>
         <CardContent>
          <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-1'>
                <CircleMinus color={colors.rose[600]} />
                <Text variant='title' className='text-rose-600'>Vendas pendentes</Text>
              </View>
              <Text variant='sm'>7</Text>
            </View>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-1'>
                <CirclePlus color={colors.emerald[600]} />
                <Text variant='title' className='text-emerald-600'>Vendas pagas</Text>
              </View>
              <Text variant='sm'>24</Text>
            </View>
         </CardContent>
        </Card>

        <Card>
          <CardTitle>Vendas pendentes recentes</CardTitle>
          {sales.map(sale => (
            <SalesPaymentInfo
              href='/sale-info'
              key={sale.id}
              payment={{
                id: sale.id,
                description: sale.description,
                price: sale.price,
                totalPayment: sale.totalPayment,
              }}
              paid={sale.totalPayment === sale.price}
            />
          ))}
   
          <TouchableNativeFeedback onPress={() => router.push('/sales')}>
            <View className='items-center justify-center py-4 mt-4 border-t border-t-zinc-700/50'>
              <Text>Ver vendas</Text>
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
          <TouchableNativeFeedback onPress={() => router.push('/payments-received')}>
            <View className='items-center justify-center py-4 mt-4 border-t border-t-zinc-700/50'>
              <Text>Ver pagamentos</Text>
            </View>
          </TouchableNativeFeedback>
        </Card>
      </View>
    </ScrollView>
  )
}