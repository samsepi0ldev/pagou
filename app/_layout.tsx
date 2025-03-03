import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native'
import colors from 'tailwindcss/colors'

import '../lib/date-fns'
import '../global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  })

  if (!fontsLoaded) return

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
        }}
        className="bg-zinc-900"
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="sale-payment-info"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="sale-info" options={{ headerShown: false }} />
          <Stack.Screen name="create-sale" options={{ headerShown: false }} />
          <Stack.Screen
            name="create-customer"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="payments-received"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="contacts" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen
            name="customer-details"
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar
          translucent
          style="light"
          backgroundColor={colors.violet[500]}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
