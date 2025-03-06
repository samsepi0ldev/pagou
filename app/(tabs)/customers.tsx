import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { Graph } from 'iconsax-react-native'
import { ListFilter, Search, X } from 'lucide-react-native'
import { useMemo, useRef } from 'react'
import {
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { CustomerCard } from '@/components/customer-card'
import { Header } from '@/components/header'
import { Text } from '@/components/text'
import { getAllCustomers } from '@/functions/get-all-customers'
import { parseNumberToReal } from '@/lib/utils'

export default function CustomersScreen() {
  const db = useSQLiteContext()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpenBottomSheet = () => bottomSheetRef.current.expand()
  const handleCloseBottomSheet = () => bottomSheetRef.current.snapToIndex(0)

  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getAllCustomers(db),
  })

  const { totalPendingPayments } = useMemo(() => {
    if (data?.customers) {
      const totalPendingPayments = data.customers.reduce(
        (acc, curr) => acc + curr.pendingPayment,
        0
      )
      return { totalPendingPayments }
    }
    return { totalPendingPayments: 0 }
  }, [data])

  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <Header title="Clientes">
          <View className="flex-row items-center gap-4">
            <Link href="/customer-search">
              <Search color={colors.violet[100]} />
            </Link>
            <TouchableOpacity>
              <Graph color={colors.violet[100]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <ListFilter color={colors.violet[100]} />
            </TouchableOpacity>
          </View>
        </Header>
      </View>
      <FlatList
        data={data?.customers}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <CustomerCard
            id={item.id}
            name={item.name}
            balance={item.pendingPayment}
          />
        )}
        initialNumToRender={10}
        windowSize={5}
        contentContainerClassName="pb-16"
        showsVerticalScrollIndicator={false}
      />
      <View className="flex-row px-5 py-6">
        <Text variant="header">Total Pendente: </Text>
        <Text variant="header" className="text-rose-600">
          {parseNumberToReal(totalPendingPayments)}
        </Text>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[0.01, 248]}
        backgroundStyle={{
          backgroundColor: colors.zinc[700],
        }}
        handleComponent={() => null}
      >
        <BottomSheetView className="px-6 py-4 flex-1">
          <TouchableOpacity onPress={handleCloseBottomSheet}>
            <View className="size-10 absolute top-2 right-0 items-center justify-center bg-zinc-600 rounded-md">
              <X size={24} color={colors.zinc[400]} />
            </View>
          </TouchableOpacity>
          <Text variant="title" className="mb-10 text-2xl">
            Ordenar clientes por:
          </Text>
          <View>
            <TouchableNativeFeedback>
              <View className="py-2">
                <Text className="text-lg">Data de criação crescente</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View className="py-2">
                <Text className="text-lg">Data de criação decrescente</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View className="py-2">
                <Text className="text-lg">Nome crescente</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View className="py-2">
                <Text className="text-lg">Nome decrescente</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}
