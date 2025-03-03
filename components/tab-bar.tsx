import {
  type BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { useLinkBuilder, useTheme } from '@react-navigation/native'
import { CircleUserRound, Home, PiggyBank, User2 } from 'lucide-react-native'
import { useState } from 'react'
import { type LayoutChangeEvent, Platform, View } from 'react-native'
import colors from 'tailwindcss/colors'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { TabBarButton } from './tab-bar-button'

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ width: 100, height: 20 })
  const tabPositionX = useSharedValue(0)

  const buttonWidth = dimensions.width / state.routes.length

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    }
  })

  function onTabbarLayout(e: LayoutChangeEvent) {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  return (
    <View
      onLayout={onTabbarLayout}
      className="flex-row items-center justify-between py-4 border bg-zinc-950"
    >
      <Animated.View
        className="absolute bg-violet-500 rounded-full mx-3"
        style={[
          animatedStyle,
          {
            width: buttonWidth - 25,
            height: dimensions.height - 15,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1200,
          })

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? colors.violet[100] : colors.zinc[100]}
            label={label}
          />
        )
      })}
    </View>
  )
}
