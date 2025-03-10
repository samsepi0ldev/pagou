import { Header } from '@/components/header'
import {
  Calendar,
  CircleUserRound,
  DollarSign,
  NotebookText,
  Pencil,
  Trash2,
  Wallet,
  X,
} from 'lucide-react-native'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Text } from '@/components/text'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { useRef } from 'react'

export default function SaleInfo() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpenBottomSheet = () => bottomSheetRef.current.expand()
  const handleCloseBottomSheet = () => bottomSheetRef.current.snapToIndex(0)
  return (
    <View className="flex-1 bg-zinc-900">
      <View className="bg-violet-600">
        <Header backButton title="Detalhes da venda">
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/edit-sale' })}
            className="size-8 items-center justify-center"
          >
            <Pencil size={24} color={colors.violet[100]} />
          </TouchableOpacity>
          <TouchableOpacity className="size-8 items-center justify-center">
            <Trash2 size={24} color={colors.violet[100]} />
          </TouchableOpacity>
        </Header>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 py-5 gap-6 flex-1"
      >
        <View className="flex-row items-center gap-4">
          <CircleUserRound size={48} color={colors.zinc[500]} />
          <Text variant="heading-sub-title">John Doe</Text>
        </View>
        <View className="gap-4">
          <View className="flex-row gap-2 items-center">
            <NotebookText strokeWidth={1} size={16} color={colors.zinc[500]} />
            <Text variant="description">C&A</Text>
          </View>
          <View className="flex-row gap-2 items-center">
            <Calendar strokeWidth={1} size={16} color={colors.zinc[500]} />
            <Text variant="description">08/02/2024</Text>
          </View>
        </View>
        <View className="py-5 border-y border-y-zinc-800 flex-row items-center justify-evenly">
          <View className="items-center justify-center">
            <Text className="font-nunito-bold">R$ 80,00</Text>
            <Text className="text-xs text-zinc-500">Venda Total</Text>
          </View>

          <View className="w-px h-full bg-zinc-800" />

          <View className="items-center justify-center">
            <Text className="font-nunito-bold text-emerald-500">R$ 00,00</Text>
            <Text className="text-xs text-zinc-500">Total Pago</Text>
          </View>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="flex-row items-center gap-4"
            onPress={handleOpenBottomSheet}
          >
            <DollarSign size={24} color={colors.zinc[500]} />
            <Text className="text-zinc-400">Adicionar Pagamento</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center gap-4"
            onPress={() => router.push({ pathname: '/payments-from-sale' })}
          >
            <Wallet size={24} color={colors.zinc[500]} />
            <Text className="text-zinc-400">Ver Pagamentos</Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-0 left-0 right-0 py-6 border-t border-t-zinc-600 flex-row items-center justify-center">
          <Text className="font-nunito-bold">Total Pendente: </Text>
          <Text className="text-red-500">R$ 80,00</Text>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[0.01, '60%']}
        backgroundStyle={{
          backgroundColor: colors.zinc[700],
        }}
        handleComponent={() => null}
      >
        <BottomSheetView className="px-4 pt-16">
          <TouchableOpacity
            className="size-10 absolute top-4 right-4 items-center justify-center bg-zinc-600 rounded-md"
            onPress={handleCloseBottomSheet}
          >
            <X size={24} color={colors.zinc[400]} />
          </TouchableOpacity>
          <View className="flex-row items-center justify-between border-b border-b-zinc-600 pb-3 px-4">
            <View className="items-center">
              <Text>Valor da venda</Text>
              <Text className="text-rose-600">R$ 100,00</Text>
            </View>
            <View className="items-center">
              <Text>Valor pago</Text>
              <Text className="text-emerald-600">R$ 0,00</Text>
            </View>
            <View className="items-center">
              <Text>Restante</Text>
              <Text className="text-zinc-400">R$ 100,00</Text>
            </View>
          </View>
          <View className="items-center justify-center pt-8">
            <Text>Quanto o cliente vai pagar?</Text>
            <TextInput
              className="text-4xl text-green-600 mb-8"
              placeholder="R$ 0,00"
              placeholderTextColor={colors.zinc[400]}
            />
            <View className="items-center justify-center gap-2">
              <TouchableOpacity className="w-72 px-4 py-1.5 bg-zinc-600 items-center justify-center rounded-md">
                <Text variant="title">Pagar parcial</Text>
              </TouchableOpacity>
              <Text variant="sm">ou</Text>
              <TouchableOpacity className="w-72 px-4 py-1.5 bg-violet-600 items-center justify-center rounded-md">
                <Text variant="title">Pagar total</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}
