import { Link, useLocalSearchParams } from 'expo-router'
import { Check, Mail, Phone, Search, User } from 'lucide-react-native'
import { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'
import { Input, InputIcon, InputRoot } from '@/components/input'

type CustomerLocalSearchParams = {
  name?: string
  phoneNumber?: string
}

export default function CreateCustomer() {
  const { name, phoneNumber } =
    useLocalSearchParams<CustomerLocalSearchParams>()
  const [customer, setCustomer] = useState({
    name,
    phoneNumber,
    email: '',
  })
  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <Header backButton title="Registrar Cliente">
          <Link href="/contacts" className="size-8 items-center justify-center">
            <Search size={24} color={colors.violet[100]} />
          </Link>

          <TouchableOpacity className="size-8 items-center justify-center">
            <Check size={24} color={colors.violet[100]} />
          </TouchableOpacity>
        </Header>
      </View>
      <ScrollView contentContainerClassName="p-4 gap-4">
        <InputRoot>
          <InputIcon>
            <User strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input
            placeholder="Nome"
            value={customer.name}
            onChangeText={text => setCustomer({ ...customer, name: text })}
          />
        </InputRoot>

        <InputRoot>
          <InputIcon>
            <Phone strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input
            placeholder="Celular"
            value={customer.phoneNumber}
            onChangeText={text =>
              setCustomer({ ...customer, phoneNumber: text })
            }
          />
        </InputRoot>

        <InputRoot>
          <InputIcon>
            <Mail strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input
            placeholder="E-mail"
            value={customer.email}
            onChangeText={text => setCustomer({ ...customer, email: text })}
          />
        </InputRoot>
      </ScrollView>
    </View>
  )
}
