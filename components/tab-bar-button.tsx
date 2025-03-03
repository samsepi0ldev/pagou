import { CircleUserRound, Home, PiggyBank, User2 } from 'lucide-react-native'
import { useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

interface TabBarButtonProps {
  onPress: () => void
  onLongPress: () => void
  isFocused: boolean
  routeName: string
  color: string
  label: string
}

export function TabBarButton({
  color,
  isFocused,
  label,
  onLongPress,
  onPress,
  routeName,
}: TabBarButtonProps) {
  const icon = {
    index: props => <Home size={24} {...props} />,
    customers: props => <User2 size={24} {...props} />,
    sales: props => <PiggyBank size={24} {...props} />,
    account: props => <CircleUserRound size={24} {...props} />,
  }

  const scale = useSharedValue(0)

  const animateTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])
    return { opacity }
  })

  const animateIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
    const top = interpolate(scale.value, [0, 1], [0, 7])
    return {
      transform: [{ scale: scaleValue }],
      top,
    }
  })

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 300,
      }
    )
  }, [scale, isFocused])

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 gap-1 items-center justify-center"
    >
      <Animated.View style={animateIconStyle}>
        {icon[routeName]({
          color,
        })}
      </Animated.View>
      <Animated.Text
        className="text-xs font-nunito-bold"
        style={[
          {
            color,
          },
          animateTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  )
}
