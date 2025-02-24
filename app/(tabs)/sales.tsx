import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { ChartLine, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react-native'
import { eachMonthOfInterval, format } from 'date-fns'

import { Header } from '@/components/header'
import { SalesPaymentInfo } from '@/components/sale-payment-info'

const sales = [
  { id: 1, description: 'Venda 1', price: 100, created_at: '2023-10-01T10:00:00Z' },
  { id: 2, description: 'Venda 2', price: 200, created_at: '2023-10-01T12:00:00Z' },
  { id: 3, description: 'Venda 3', price: 300, created_at: '2023-10-02T09:00:00Z' },
  { id: 4, description: 'Venda 4', price: 150, created_at: '2023-10-02T14:00:00Z' },
  { id: 5, description: 'Venda 5', price: 250, created_at: '2023-10-03T11:00:00Z' },
  { id: 6, description: 'Venda 6', price: 350, created_at: '2023-10-04T16:00:00Z' },
  { id: 7, description: 'Venda 7', price: 400, created_at: '2023-10-04T18:00:00Z' },
  { id: 8, description: 'Venda 8', price: 500, created_at: '2023-10-05T10:00:00Z' },
  { id: 9, description: 'Venda 9', price: 600, created_at: '2023-10-06T12:00:00Z' },
  { id: 10, description: 'Venda 10', price: 700, created_at: '2023-10-07T09:00:00Z' },
];

type GroupSalesByDate = Record<string, typeof sales>

export default function SalesScreen () {
  const [positionMonth, setPositionMonth] = useState(0)
  const currentYear = new Date().getFullYear()

  const months = eachMonthOfInterval({
    start: new Date(currentYear, 0, 1),
    end: new Date(currentYear, 11, 31)
  }).map(dateIsoString => format(dateIsoString, 'MMMM yy'))

  function nextMonth () {
    if (positionMonth >= months.length - 1) return
    setPositionMonth(positionMonth + 1)
  }

  function prevMonth () {
    if (positionMonth <= 0) return
    setPositionMonth(positionMonth - 1)
  }

  const groupSalesByDate = sales.reduce<GroupSalesByDate>((acc, curr) => {
    const date = format(new Date(curr.created_at), 'eeee, dd MMMM yyyy')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(curr)
    return acc
  }, {})

  const data = []
  for (const date of Object.keys(groupSalesByDate)) {
    data.push({ type: 'header', date })
    data.push(...groupSalesByDate[date].map(sale => ({ type: 'item', ...sale })))
  }

  const stickyHeaderIndices = data
    .map((item, index) => (item.type === 'header' ? index : null))
    .filter(index => index !== null)

  return (
    <View className='flex-1 bg-zinc-800'>
      <View className='bg-violet-600'>
        <Header title='Vendas'>
          <TouchableOpacity>
            <ChartLine color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity>
            <ListFilter color='#fff' />
          </TouchableOpacity>
        </Header>
        <View className='flex-row items-center justify-between px-6 py-4'>
          <TouchableOpacity onPress={prevMonth}>
            <ChevronLeft color='#fff' />
          </TouchableOpacity>
          <Text className='text-violet-100 text-lg font-medium'>{months[positionMonth]}</Text>
          <TouchableOpacity onPress={nextMonth}>
            <ChevronRight color='#fff' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex-row items-center justify-between py-4 px-20 border-b border-b-zinc-700'>
        <View className='items-center justify-center'>
          <Text className='text-zinc-100 font-semibold'>Total</Text>
          <Text className='text-rose-500'>R$ 200,00</Text>
        </View>

        <View className='w-px h-full bg-zinc-700' />

        <View className='items-center justify-center'>
          <Text className='text-zinc-100 font-semibold'>Pendente</Text>
          <Text className='text-rose-500'>R$ 200,00</Text>
        </View>
      </View>
      <FlatList
        contentContainerClassName='py-4'
        data={data}
        renderItem={({ item }) => item.type === 'header' ? (
          <Text className='text-zinc-100 text-sm font-semibold w-full bg-zinc-800 py-2 px-4'>{item.date}</Text>
        ) : (
          <SalesPaymentInfo
            paid={false}
            payment={{
              id: item.id,
              description: item.description,
              price: item.price,
              totalPayment: 0
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={stickyHeaderIndices}
      />
    </View>
  )
}