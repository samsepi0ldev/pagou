import { ChartLine, ListFilter, Search, X } from 'lucide-react-native'
import { FlatList, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { CustomerCard } from '@/components/customer-card'
import { Header } from '@/components/header'
import { Text } from '@/components/text'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef } from 'react'

export default function CustomersScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpenBottomSheet = () => bottomSheetRef.current.expand()
  const handleCloseBottomSheet = () => bottomSheetRef.current.snapToIndex(0)

  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <Header title="Clientes">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <Search color={colors.violet[100]} />
            </TouchableOpacity>
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
        data={Array.from({ length: 20 })}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <CustomerCard />}
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
        <BottomSheetView className="px-4">
          <TouchableOpacity
            className="size-12 absolute top-2 right-2 items-center justify-center"
            onPress={handleCloseBottomSheet}
          >
            <X size={24} color={colors.zinc[400]} />
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}
