import {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Calendar, Check, HandCoins, NotebookText } from 'lucide-react-native'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'
import { Input, InputIcon, InputRoot } from '@/components/input'
import { Text } from '@/components/text'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

export default function CreateSale() {
  const [date, setDate] = useState(new Date())
  const { customer_id } = useLocalSearchParams()

  function handleDate(event: DateTimePickerEvent, selectedDate: Date) {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  function showDatePicker() {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleDate,
      mode: 'date',
    })
  }
  return (
    <View className="flex-1 bg-zinc-800">
      <View className="bg-violet-600">
        <Header backButton title="Registrar Venda" />
      </View>
      <ScrollView contentContainerClassName="p-4 gap-4">
        {!!customer_id && <Text>{customer_id}</Text>}
        <InputRoot>
          <InputIcon>
            <NotebookText strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input placeholder="Descrição do serviço ou produto" />
        </InputRoot>

        <InputRoot>
          <InputIcon>
            <HandCoins strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input placeholder="Valor" />
        </InputRoot>

        <TouchableOpacity onPress={showDatePicker}>
          <InputRoot>
            <InputIcon>
              <Calendar strokeWidth={1} size={24} color={colors.zinc[300]} />
            </InputIcon>
            <Input value={date.toLocaleDateString()} readOnly />
          </InputRoot>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-lg bg-violet-500  px-4 py-4 flex-row gap-2 items-center justify-center"
        >
          <Text variant="header" className="leading-0">
            Salvar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
