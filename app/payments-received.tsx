import { TouchableOpacity, View } from 'react-native'
import { ChevronLeft, ChevronRight, CircleOff } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { eachMonthOfInterval, format } from 'date-fns'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'
import { Text } from '@/components/text'

const ANIMATION_DURATION = 100

export default function PaymentsReceived() {
  const currentYear = new Date().getFullYear()
  const months = useMemo(() => {
    return eachMonthOfInterval({
      start: new Date(currentYear, 0, 1),
      end: new Date(currentYear, 11, 31)
    }).map(dateIsoString => format(dateIsoString, 'MMMM yy'))
  }, [currentYear])

  const [positionMonth, setPositionMonth] = useState(months.indexOf(format(new Date(), 'MMMM yy')))
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(1)
  

  function nextMonth() {
    if (positionMonth >= months.length - 1) return

    opacity.value = withTiming(0, { duration: ANIMATION_DURATION / 2 })
    translateY.value = withTiming(10, {
      duration: ANIMATION_DURATION,
      easing: Easing.inOut(Easing.ease)
    })

    setTimeout(() => {
      setPositionMonth(positionMonth + 1)
      translateY.value = -10
      opacity.value = 0

      opacity.value = withTiming(1, { duration: ANIMATION_DURATION / 2 })
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.inOut(Easing.ease)
      })
    }, ANIMATION_DURATION)
  }

  function prevMonth() {
    if (positionMonth <= 0) return

    opacity.value = withTiming(0, { duration: ANIMATION_DURATION * 2 })
    translateY.value = withTiming(-10, {
      duration: ANIMATION_DURATION,
      easing: Easing.inOut(Easing.ease)
    })

    setTimeout(() => {
      setPositionMonth(positionMonth - 1)
      translateY.value = 10
      opacity.value = 0
      
      opacity.value = withTiming(1, { duration: ANIMATION_DURATION * 2 })
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.inOut(Easing.ease)
      })
    }, ANIMATION_DURATION)
  }

  const dateTextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: translateY.value
    }],
    opacity: opacity.value
  }))
  
  return (
    <View className='flex-1 bg-zinc-800'>
      <View className='bg-violet-600'>
        <Header
          backButton
          title='Pagamentos recebidos'
        />
        <View className='flex-row items-center justify-between px-6 py-4'>
          <TouchableOpacity onPress={prevMonth}>
            <ChevronLeft color={colors.violet[100]} />
          </TouchableOpacity>
          <Animated.Text
            className='text-lg font-nunito-semibold capitalize text-violet-100'
            style={dateTextAnimatedStyle}
          >
            {months[positionMonth]}
          </Animated.Text>
          <TouchableOpacity onPress={nextMonth}>
            <ChevronRight color={colors.violet[100]} />
          </TouchableOpacity>
        </View>
      </View>
      <View className='items-center justify-center gap-1 py-2'>
        <Text>Total Recebido</Text>
        <Text className='text-emerald-500'>R$ 1,100.00</Text>
      </View>
    </View>
  )
}
