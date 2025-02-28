import { Check, NotebookText } from 'lucide-react-native'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'

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
      <ScrollView contentContainerClassName='p-4'>
        <View className='rounded-lg border border-zinc-700 px-4 py-1 flex-row gap-2 items-center'>
          <NotebookText strokeWidth={1} size={24} color={colors.zinc[300]} />
          <TextInput
            className='placeholder-zinc-100 text-lg text-zinc-100'
            placeholder='Descrição do serviço ou produto'
            placeholderTextColor={colors.zinc[400]}
          />
        </View>
      </ScrollView>
    </View>
  )
}
