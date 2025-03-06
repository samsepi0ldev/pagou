import { format } from 'date-fns'
import { router, useLocalSearchParams } from 'expo-router'
import { CircleUserRound, Pencil, Trash2 } from 'lucide-react-native'
import React, { useCallback, useMemo } from 'react'
import { FlatList, TouchableNativeFeedback, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'
import { SalesPaymentInfo } from '@/components/sale-payment-info'
import { Text } from '@/components/text'
import { getCustomerByID } from '@/functions/get-customer-by-id'
import { parseNumberToReal } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSQLiteContext } from 'expo-sqlite'

// type GroupSalesByDate = Record<string, typeof sales>

export default function CustomerDetails() {
  const db = useSQLiteContext()
  const { customer_id } = useLocalSearchParams()

  const { data: customer } = useQuery({
    queryKey: ['customer', customer_id],
    queryFn: () => getCustomerByID(db, Number(customer_id)),
  })

  // const { data, stickyHeaderIndices } = useMemo(() => {
  //   const data = []
  //   if (customer?.sales) {
  //     const groupSalesByDate = customer?.sales?.reduce<GroupSalesByDate>(
  //       (acc, curr) => {
  //         const date = format(new Date(curr.createdAt), 'eeee, dd MMMM yyyy')
  //         if (!acc[date]) {
  //           acc[date] = []
  //         }
  //         acc[date].push(curr)
  //         return acc
  //       },
  //       {}
  //     )

  //     for (const date of Object.keys(groupSalesByDate)) {
  //       data.push({ type: 'header', date })
  //       data.push(
  //         ...groupSalesByDate[date].map(sale => ({ type: 'item', ...sale }))
  //       )
  //     }
  //   }

  //   const stickyHeaderIndices = data
  //     .map((item, index) => (item.type === 'header' ? index : null))
  //     .filter(index => index !== null)

  //   return {
  //     data,
  //     stickyHeaderIndices,
  //   }
  // }, [customer])

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
          pendingPayment: item.pendingPayment,
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
          <Text variant="title">{customer?.name}</Text>
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
          <Text className="text-rose-500">
            {parseNumberToReal(customer?.totalSales ?? 0)}
          </Text>
        </View>

        <View className="w-px h-full bg-zinc-700" />

        <View className="items-center justify-center">
          <Text>Pendente</Text>
          <Text className="text-rose-500">
            {' '}
            {parseNumberToReal(customer?.pendingPayments ?? 0)}
          </Text>
        </View>
      </View>
      <FlatList
        contentContainerClassName="pt-4 pb-16"
        data={customer?.sales}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        // stickyHeaderIndices={stickyHeaderIndices}
        initialNumToRender={10}
        windowSize={5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
