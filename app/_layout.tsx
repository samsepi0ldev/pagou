import React from 'react'
import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { SafeAreaView } from 'react-native'
import colors from 'tailwindcss/colors'

import '../global.css'

export default function Layout () {
  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: Constants.statusBarHeight
    }}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
      <StatusBar translucent style='dark' backgroundColor={colors.violet[500]} />
    </SafeAreaView>
  )
}
