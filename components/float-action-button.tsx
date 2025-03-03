import { router } from 'expo-router'
import { Plus, UserPlus2, Wallet } from 'lucide-react-native'
import { Pressable, View } from 'react-native'
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export function FloaTActionButton() {
  const isOpen = useSharedValue(false)
  const firstValue = useSharedValue(30)
  const secondValue = useSharedValue(30)
  const firstWidth = useSharedValue(56)
  const secondWidth = useSharedValue(56)
  const opacity = useSharedValue(0)
  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0)
  )

  function handlePress() {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    }
    if (isOpen.value) {
      firstWidth.value = withTiming(56, { duration: 100 }, finish => {
        if (finish) {
          firstValue.value = withTiming(30, config)
        }
      })
      secondWidth.value = withTiming(56, { duration: 100 }, finish => {
        if (finish) {
          secondValue.value = withDelay(50, withTiming(30, config))
        }
      })
      opacity.value = withTiming(0, { duration: 50 })
    } else {
      firstValue.value = withDelay(200, withSpring(100))
      secondValue.value = withDelay(100, withSpring(170))
      firstWidth.value = withDelay(700, withSpring(200))
      secondWidth.value = withDelay(800, withSpring(200))
      opacity.value = withDelay(800, withSpring(1))
    }
    isOpen.value = !isOpen.value
  }

  const firstIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      firstValue.value,
      [30, 56],
      [0, 1],
      Extrapolation.CLAMP
    )
    return {
      bottom: firstValue.value,
      transform: [{ scale }],
    }
  })

  const firstWidthStyle = useAnimatedStyle(() => ({
    width: firstWidth.value,
  }))
  const secondWidthStyle = useAnimatedStyle(() => ({
    width: firstWidth.value,
  }))
  const opacityText = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const secondIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      secondValue.value,
      [30, 122],
      [0, 1],
      Extrapolation.CLAMP
    )
    return {
      bottom: secondValue.value,
      transform: [{ scale }],
    }
  })

  const progressStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${progress.value * 180}deg`,
      },
    ],
  }))

  return (
    <View className="absolute bottom-24 right-8">
      <Pressable onPress={() => router.push('/create-customer')}>
        <Animated.View
          style={[secondIcon, secondWidthStyle]}
          className="absolute bottom-0 right-0 bg-violet-500 rounded-full flex-row items-center"
        >
          <View className="size-16 items-center justify-center">
            <UserPlus2 size={24} color={colors.violet[100]} />
          </View>
          <Animated.Text
            style={opacityText}
            className="font-nunito-bold text-lg text-violet-100"
          >
            Novo cliente
          </Animated.Text>
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => router.push('/create-sale')}>
        <Animated.View
          style={[firstIcon, firstWidthStyle]}
          className="absolute bottom-0 right-0 bg-violet-500 rounded-full flex-row items-center"
        >
          <View className="size-16 items-center justify-center">
            <Wallet size={24} color={colors.violet[100]} />
          </View>
          <Animated.Text
            style={opacityText}
            className="font-nunito-bold text-lg text-violet-100"
          >
            Nova venda
          </Animated.Text>
        </Animated.View>
      </Pressable>

      <Pressable
        onPress={handlePress}
        className="absolute bottom-0 right-0 bg-violet-500 rounded-full"
      >
        <Animated.View
          className="size-16 items-center justify-center"
          style={progressStyle}
        >
          <Plus size={18} color={colors.violet[100]} />
        </Animated.View>
      </Pressable>
    </View>
  )
}
