import { Calendar, Check, HandCoins, NotebookText } from 'lucide-react-native'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { DateTimePickerAndroid, type DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { Header } from '@/components/header'
import { Input, InputIcon, InputRoot } from '@/components/input'
import { Text } from '@/components/text'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function CreateSale () {
  const [date, setDate] = useState(new Date())
  const { customer_id } = useLocalSearchParams()

  function handleDate (event: DateTimePickerEvent, selectedDate: Date) {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  function showDatePicker () {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleDate,
      mode: 'date'
    })
  }
  return (
    <View className='flex-1 bg-zinc-900'>
      <View className='bg-violet-600'>
        <Header
          backButton
          title='Registrar Venda'>
            <TouchableOpacity className='size-8 items-center justify-center'>
              <Check size={24} color={colors.violet[100]} />
            </TouchableOpacity>
        </Header>
      </View>
      <ScrollView contentContainerClassName='p-4 gap-4'>
        {!customer_id && (<Text>customer id not provided</Text>)}
        <InputRoot>
          <InputIcon>
            <NotebookText strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input
            placeholder='Descrição do serviço ou produto'
          />
        </InputRoot>

        <InputRoot>
          <InputIcon>
            <HandCoins strokeWidth={1} size={24} color={colors.zinc[300]} />
          </InputIcon>
          <Input
            placeholder='Valor'
          />
        </InputRoot>

        <TouchableOpacity onPress={showDatePicker}>
          <InputRoot>
            <InputIcon>
              <Calendar strokeWidth={1} size={24} color={colors.zinc[300]} />
            </InputIcon>
            <Text className='py-3'>{date.toLocaleDateString()}</Text>
          </InputRoot>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}
