import { Check, Mail, Phone, Search, User } from 'lucide-react-native'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'
import { Input, InputIcon, InputRoot } from '@/components/input'
import { Link } from 'expo-router'

export default function EditCustomer() {
  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <Header backButton title="Registrar Cliente">
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
          <Input placeholder="Nome" />
        </InputRoot>

        <InputRoot>
          <InputIcon>
            <Phone strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input placeholder="Celular" />
        </InputRoot>

        <InputRoot>
          <InputIcon>
            <Mail strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input placeholder="E-mail" />
        </InputRoot>
      </ScrollView>
    </View>
  )
}
