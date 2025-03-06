import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { ArrowLeft, X } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { CustomerCard } from '@/components/customer-card'
import { getAllCustomers } from '@/functions/get-all-customers'

export default function CustomerSearch() {
  const [name, setName] = useState('%an%')
  const db = useSQLiteContext()

  const { data } = useQuery({
    queryKey: ['customers', name],
    queryFn: () => getAllCustomers(db, name),
  })

  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <View className="w-full h-16 flex-row items-center justify-between gap-10 px-4">
          <TouchableOpacity onPress={router.back}>
            <ArrowLeft size={24} color={colors.violet[100]} />
          </TouchableOpacity>
          <TextInput
            className="flex-1 text-lg font-nunito-bold text-violet-100"
            placeholderTextColor={colors.violet[100]}
            placeholder="Buscar"
            onChangeText={text => setName(text)}
            value={name}
            autoFocus
          />
          <TouchableOpacity onPress={() => setName('')}>
            <X size={24} color={colors.violet[100]} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        contentContainerClassName="pt-4 pb-20"
        data={data?.customers}
        renderItem={({ item }) => (
          <CustomerCard id={item.id} name={item.name} />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        windowSize={10}
      />
    </View>
  )
}
