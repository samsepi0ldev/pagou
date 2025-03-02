import { ChartLine, ListFilter, Search } from 'lucide-react-native'
import { View, TouchableOpacity, FlatList } from 'react-native'
import colors from 'tailwindcss/colors'

import { CustomerCard } from '@/components/customer-card'
import { Header } from '@/components/header'
import { Text } from '@/components/text'

export default function CustomersScreen () {
  return (
    <View className='flex-1 bg-zinc-800'>
      <View className='bg-violet-600'>
        <Header title='Clientes'>
          <View className='flex-row items-center gap-4'>
            <TouchableOpacity>
              <Search color={colors.violet[100]} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ChartLine color={colors.violet[100]} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ListFilter color={colors.violet[100]} />
            </TouchableOpacity>
          </View>
        </Header>
      </View>
      <FlatList
        data={Array.from({ length: 20 })}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <CustomerCard />
        )}
        initialNumToRender={10}
        windowSize={5}
        contentContainerClassName='pb-16'
      />
      <View className='flex-row px-5 py-6'>
        <Text variant='header'>Total Pendente: </Text>
        <Text variant='header' className='text-rose-600'>R$ 300,00</Text>
      </View>
    </View>
  )
}