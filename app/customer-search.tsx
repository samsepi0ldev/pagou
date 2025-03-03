import { router } from 'expo-router'
import { ArrowLeft, X } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { CustomerCard } from '@/components/customer-card'
import { Text } from '@/components/text'

const customers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'John Doe',
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    name: 'Jane Smith',
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Alice Johnson',
  },
  {
    id: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
    name: 'Michael Brown',
  },
  {
    id: '2a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    name: 'Emily Davis',
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    name: 'David Wilson',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Sarah Martinez',
  },
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    name: 'James Anderson',
  },
  {
    id: 'b3c4d5e6-f7a8-9b0c-1d2e-3f4a5b6c7d8e',
    name: 'Linda Taylor',
  },
  {
    id: 'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
    name: 'Robert Thomas',
  },
]

export default function CustomerSearch() {
  const [name, setName] = useState('')

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
        data={customers}
        renderItem={({ item }) => (
          <CustomerCard id={item.id} name={item.name} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        windowSize={10}
      />
    </View>
  )
}
