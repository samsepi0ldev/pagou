import { Check } from 'lucide-react-native'
import { TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Header } from '@/components/header'

export default function CreateCustomer () {
  return (
    <View className='flex-1 bg-zinc-900'>
    <View className='bg-violet-600'>
      <Header
        backButton
        title='Registrar Cliente'>
          <TouchableOpacity className='size-8 items-center justify-center'>
            <Check size={24} color={colors.violet[100]} />
          </TouchableOpacity>
      </Header>
    </View>
      <View>
        <TextInput placeholder='Descrição do serviço ou produto' />
      </View>
    </View>
  )
}