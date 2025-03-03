import { Tabs } from 'expo-router'
import { CircleUserRound, Home, PiggyBank, User2 } from 'lucide-react-native'
import React from 'react'
import colors from 'tailwindcss/colors'

import { FloaTActionButton } from '@/components/float-action-button'
import { TabBar } from '@/components/tab-bar'

export default function Layout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.violet[600],
          tabBarInactiveTintColor: colors.zinc[100],
          tabBarBackground: undefined,
          tabBarStyle: {
            height: 64,
            borderTopWidth: 0,
            backgroundColor: colors.zinc[950],
            paddingTop: 8,
          },
        }}
        tabBar={props => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            title: 'Clientes',
            tabBarIcon: ({ color, size }) => (
              <User2 color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="sales"
          options={{
            title: 'Vendas',
            tabBarIcon: ({ color, size }) => (
              <PiggyBank color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Conta',
            tabBarIcon: ({ color, size }) => (
              <CircleUserRound color={color} size={size} />
            ),
          }}
        />
      </Tabs>
      <FloaTActionButton />
    </>
  )
}
