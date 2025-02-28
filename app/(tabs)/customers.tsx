import { CustomerCard } from '@/components/customer-card'
import { Header } from '@/components/header'
import { ChartLine, ListFilter, Search, User2 } from 'lucide-react-native'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import colors from 'tailwindcss/colors'

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
      <ScrollView>
        {Array.from({ length: 20 }, (_, i) => (
          <CustomerCard key={i.toString()} />
        ))}
      </ScrollView>
    </View>
  )
}