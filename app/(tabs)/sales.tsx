import { eachMonthOfInterval, format } from 'date-fns'
import { ChevronLeft, ChevronRight, ListFilter, X } from 'lucide-react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Header } from '@/components/header'
import { SalesPaymentInfo } from '@/components/sale-payment-info'
import { Text } from '@/components/text'
import * as schema from '@/db/schemas/sale'
import {
  type Sale,
  getAllSales,
  getSummarySales,
} from '@/functions/get-all-sales'
import { parseNumberToReal } from '@/lib/utils'
import BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import { Graph } from 'iconsax-react-native'
import colors from 'tailwindcss/colors'

type SaleProps = Sale & { pendingPayment: number }
type GroupSalesByDate = Record<string, SaleProps[]>

const ANIMATION_DURATION = 100

export default function SalesScreen() {
  const db = useSQLiteContext()

  const { data } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getAllSales(db),
  })

  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: () => getSummarySales(db),
  })

  const currentYear = new Date().getFullYear()
  const months = useMemo(() => {
    return eachMonthOfInterval({
      start: new Date(currentYear, 0, 1),
      end: new Date(currentYear, 11, 31),
    }).map(dateIsoString => format(dateIsoString, 'MMMM yy'))
  }, [currentYear])

  const [positionMonth, setPositionMonth] = useState(
    months.indexOf(format(new Date(), 'MMMM yy'))
  )
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(1)

  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpenBottomSheet = () => bottomSheetRef.current.expand()
  const handleCloseBottomSheet = () => bottomSheetRef.current.snapToIndex(0)

  function nextMonth() {
    if (positionMonth >= months.length - 1) return

    opacity.value = withTiming(0, { duration: ANIMATION_DURATION / 2 })
    translateY.value = withTiming(10, {
      duration: ANIMATION_DURATION,
      easing: Easing.inOut(Easing.ease),
    })

    setTimeout(() => {
      setPositionMonth(positionMonth + 1)
      translateY.value = -10
      opacity.value = 0

      opacity.value = withTiming(1, { duration: ANIMATION_DURATION / 2 })
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.inOut(Easing.ease),
      })
    }, ANIMATION_DURATION)
  }

  function prevMonth() {
    if (positionMonth <= 0) return

    opacity.value = withTiming(0, { duration: ANIMATION_DURATION / 2 })
    translateY.value = withTiming(-10, {
      duration: ANIMATION_DURATION,
      easing: Easing.inOut(Easing.ease),
    })

    setTimeout(() => {
      setPositionMonth(positionMonth - 1)
      translateY.value = 10
      opacity.value = 0

      opacity.value = withTiming(1, { duration: ANIMATION_DURATION / 2 })
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.inOut(Easing.ease),
      })
    }, ANIMATION_DURATION)
  }

  const dateTextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
    opacity: opacity.value,
  }))

  const { sales, stickyHeaderIndices } = useMemo(() => {
    const sales = []
    if (data?.sales) {
      const groupSalesByDate = data?.sales.reduce<GroupSalesByDate>(
        (acc, curr) => {
          const date = format(new Date(curr.createdAt), 'eeee, dd MMMM yyyy')
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(curr)
          return acc
        },
        {}
      )

      for (const date of Object.keys(groupSalesByDate)) {
        sales.push({ type: 'header', date })
        sales.push(
          ...groupSalesByDate[date].map(sale => ({ type: 'item', ...sale }))
        )
      }
    }
    const stickyHeaderIndices = sales
      .map((item, index) => (item.type === 'header' ? index : null))
      .filter(index => index !== null)

    return {
      sales,
      stickyHeaderIndices,
    }
  }, [data])

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
        <Header title="Vendas">
          <TouchableOpacity>
            <Graph color={colors.violet[100]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <ListFilter color={colors.violet[100]} />
          </TouchableOpacity>
        </Header>
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={prevMonth}>
            <ChevronLeft color={colors.violet[100]} />
          </TouchableOpacity>
          <Animated.Text
            className="font-nunito-semibold text-lg text-violet-100 capitalize"
            style={dateTextAnimatedStyle}
          >
            {months[positionMonth]}
          </Animated.Text>
          <TouchableOpacity onPress={nextMonth}>
            <ChevronRight color={colors.violet[100]} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center justify-between py-4 px-20 border-b border-b-zinc-700">
        <View className="items-center justify-center">
          <Text>Total</Text>
          <Text className="text-rose-500">
            {parseNumberToReal(summary?.totalSales)}
          </Text>
        </View>

        <View className="w-px h-full bg-zinc-700" />

        <View className="items-center justify-center">
          <Text>Pendente</Text>
          <Text className="text-rose-500">
            {parseNumberToReal(summary?.pendingPayment)}
          </Text>
        </View>
      </View>
      {sales.length ? (
        <FlatList
          contentContainerClassName="py-4 pb-24"
          data={sales}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          stickyHeaderIndices={stickyHeaderIndices}
          initialNumToRender={10}
          windowSize={5}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
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
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}
