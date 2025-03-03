import { format } from 'date-fns'
import { router } from 'expo-router'
import { CircleUserRound, Pencil, Trash2 } from 'lucide-react-native'
import React, { useCallback, useMemo } from 'react'
import { FlatList, TouchableNativeFeedback, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'
import { SalesPaymentInfo } from '@/components/sale-payment-info'
import { Text } from '@/components/text'

const sales = [
  {
    id: 1,
    description: 'Venda 1',
    price: 100,
    created_at: '2023-10-01T10:00:00Z',
  },
  {
    id: 2,
    description: 'Venda 2',
    price: 200,
    created_at: '2023-10-01T12:00:00Z',
  },
  {
    id: 3,
    description: 'Venda 3',
    price: 300,
    created_at: '2023-10-02T09:00:00Z',
  },
  {
    id: 4,
    description: 'Venda 4',
    price: 150,
    created_at: '2023-10-02T14:00:00Z',
  },
  {
    id: 5,
    description: 'Venda 5',
    price: 250,
    created_at: '2023-10-03T11:00:00Z',
  },
  {
    id: 6,
    description: 'Venda 6',
    price: 350,
    created_at: '2023-10-04T16:00:00Z',
  },
  {
    id: 7,
    description: 'Venda 7',
    price: 400,
    created_at: '2023-10-04T18:00:00Z',
  },
  {
    id: 8,
    description: 'Venda 8',
    price: 500,
    created_at: '2023-10-05T10:00:00Z',
  },
  {
    id: 9,
    description: 'Venda 9',
    price: 600,
    created_at: '2023-10-06T12:00:00Z',
  },
  {
    id: 10,
    description: 'Venda 10',
    price: 700,
    created_at: '2023-10-07T09:00:00Z',
  },
]

type GroupSalesByDate = Record<string, typeof sales>

export default function CustomerDetails() {
  const { data, stickyHeaderIndices } = useMemo(() => {
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
      data.push(
        ...groupSalesByDate[date].map(sale => ({ type: 'item', ...sale }))
      )
    }

    const stickyHeaderIndices = data
      .map((item, index) => (item.type === 'header' ? index : null))
      .filter(index => index !== null)

    return {
      data,
      stickyHeaderIndices,
    }
  }, [])

  const renderItem = useCallback(({ item }) => {
    return item.type === 'header' ? (
      <Text variant="sm" className="w-full bg-zinc-800 py-2 px-4 capitalize">
        {item.date}
      </Text>
    ) : (
      <SalesPaymentInfo
        href="/sale-info"
        paid={false}
        payment={{
          id: item.id,
          description: item.description,
          price: item.price,
          totalPayment: 0,
        }}
      />
    )
  }, [])

  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <Header backButton title="Detalhes do cliente">
          <TouchableNativeFeedback
            onPress={() => router.push({ pathname: '/edit-customer' })}
          >
            <View>
              <Pencil size={24} color={colors.violet[100]} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View>
              <Trash2 size={24} color={colors.violet[100]} />
            </View>
          </TouchableNativeFeedback>
        </Header>
      </View>
      <View className="px-4 pt-6 pb-2">
        <View className="flex-row items-center gap-4">
          <CircleUserRound size={48} color={colors.zinc[500]} />
          <Text variant="title">John Doe</Text>
        </View>
        <TouchableNativeFeedback
          onPress={() =>
            router.push({
              pathname: '/create-sale',
              params: {
                customer_id: '01955576-8403-70d4-9698-ef6fa932ae52',
              },
            })
          }
        >
          <View className="w-min self-end">
            <Text className="uppercase text-violet-400 px-2 py-0.5">
              Adicionar venda
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View className="flex-row items-center justify-between py-4 px-20 border-y border-y-zinc-700">
        <View className="items-center justify-center">
          <Text>Total</Text>
          <Text className="text-rose-500">R$ 200,00</Text>
        </View>

        <View className="w-px h-full bg-zinc-700" />

        <View className="items-center justify-center">
          <Text>Pendente</Text>
          <Text className="text-rose-500">R$ 200,00</Text>
        </View>
      </View>
      <FlatList
        contentContainerClassName="pt-4 pb-16"
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={stickyHeaderIndices}
        initialNumToRender={10}
        windowSize={5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
