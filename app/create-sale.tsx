import { Check, HandCoins, NotebookText } from 'lucide-react-native'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'
import { Input, InputIcon, InputRoot } from '@/components/input'

export default function CreateSale () {
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
      </ScrollView>
    </View>
  )
}
