import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { ChartLine, ListFilter, Search, X } from 'lucide-react-native'
import { useRef } from 'react'
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

const customers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'John Doe',
    balance: -15075,
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    name: 'Jane Smith',
    balance: 0,
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Alice Johnson',
    balance: -30050,
  },
  {
    id: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
    name: 'Michael Brown',
    balance: -7520,
  },
  {
    id: '2a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    name: 'Emily Davis',
    balance: 0,
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    name: 'David Wilson',
    balance: -50000,
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Sarah Martinez',
    balance: -2530,
  },
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    name: 'James Anderson',
    balance: 0,
  },
  {
    id: 'b3c4d5e6-f7a8-9b0c-1d2e-3f4a5b6c7d8e',
    name: 'Linda Taylor',
    balance: -12090,
  },
  {
    id: 'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
    name: 'Robert Thomas',
    balance: 0,
  },
]

export default function CustomersScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpenBottomSheet = () => bottomSheetRef.current.expand()
  const handleCloseBottomSheet = () => bottomSheetRef.current.snapToIndex(0)

  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <Header title="Clientes">
          <View className="flex-row items-center gap-4">
            <Link href="/customer-search">
              <Search color={colors.violet[100]} />
            </Link>
            <TouchableOpacity>
              <ChartLine color={colors.violet[100]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <ListFilter color={colors.violet[100]} />
            </TouchableOpacity>
          </View>
        </Header>
      </View>
      <FlatList
        data={customers}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <CustomerCard id={item.id} name={item.name} balance={item.balance} />
        )}
        initialNumToRender={10}
        windowSize={5}
        contentContainerClassName="pb-16"
        showsVerticalScrollIndicator={false}
      />
      <View className="flex-row px-5 py-6">
        <Text variant="header">Total Pendente: </Text>
        <Text variant="header" className="text-rose-600">
          R$ 300,00
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
