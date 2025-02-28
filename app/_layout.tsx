import React from 'react'
import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { SafeAreaView, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { useFonts } from 'expo-font'

import '../global.css'
import { Plus } from 'lucide-react-native'
import { FloaTActionButton } from '@/components/float-action-button'

export default function Layout () {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold
  })

  if (!fontsLoaded) return

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: Constants.statusBarHeight
    }} className='bg-zinc-900'>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='sale-payment-info' options={{ headerShown: false }} />
        <Stack.Screen name='sale-info' options={{ headerShown: false }} />
        <Stack.Screen name='create-sale' options={{ headerShown: false }} />
        <Stack.Screen name='create-customer' options={{ headerShown: false }} />
      </Stack>
      <StatusBar translucent style='dark' backgroundColor={colors.violet[500]} />
    </SafeAreaView>
  )
}
