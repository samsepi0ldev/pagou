import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite'
import { type ReactNode, Suspense, useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

import migrations from '@/drizzle/migrations'
import { addDummyData } from '@/utils/generate-data'

interface ProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()
const DATABASE_NAME = 'test3.db'
const expoDb = openDatabaseSync(DATABASE_NAME)
const db = drizzle(expoDb)

export function Provider({ children }: ProviderProps) {
  const { success, error } = useMigrations(db, migrations)

  // useEffect(() => {
  //   addDummyData(db)
  // }, [])

  if (error) {
    console.error(error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{error.message}</Text>
      </View>
    )
  }

  if (!success) return

  return (
    <Suspense
      fallback={
        <View className="flex-1 bg-violet-600 items-center justify-center">
          <ActivityIndicator color={colors.violet[100]} size="large" />
        </View>
      }
    >
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SQLiteProvider>
    </Suspense>
  )
}
