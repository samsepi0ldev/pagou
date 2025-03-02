import { useEffect, useId, useState } from 'react'
import { ArrowLeft, X } from 'lucide-react-native'
import { Alert, SectionList, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import * as Contacts from 'expo-contacts'
import { router } from 'expo-router'

import { Text } from '@/components/text'
import { Contact } from '@/components/contact'

type ContactPops = {
  id: string
  name: string
  image: Contacts.Image
  phoneNumber: string | null
}[]

type SectionListDataProps = {
  title: string
  data: ContactPops
}

export default function ContactsScreen () {
  const [name, setName] = useState('')
  const [contacts, setContacts] = useState<SectionListDataProps[]>([])
  async function fetchContacts () {
    try {
      const { status } = await Contacts.requestPermissionsAsync()

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name,
          sort: 'firstName'
        })

        const list = data.map((contact => ({
          id: contact.id ?? useId(),
          name: contact.name,
          image: contact.image,
          phoneNumber: contact.phoneNumbers ? contact.phoneNumbers[0].number : 'Erro ao ler numero'
        }))).reduce<SectionListDataProps[]>((acc, curr) => {
          const firstLetter = curr.name.charAt(0).toUpperCase()
          const existsEntry = acc.find((entry: SectionListDataProps) => entry.title === firstLetter)

          if (existsEntry) {
            existsEntry.data.push(curr)
          } else {
            acc.push({ title: firstLetter, data: [curr] })
          }

          return acc
        }, [])

        setContacts(list)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Error')
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [name])

  return (
    <View className='flex-1 bg-zinc-800'>
      <View className='bg-violet-600'>
        <View className='w-full h-16 flex-row items-center justify-between gap-10 px-4'>
          <TouchableOpacity onPress={router.back}>
            <ArrowLeft size={24}  color={colors.violet[100]} />
          </TouchableOpacity>
          <TextInput
            className='flex-1 text-lg font-nunito-bold text-violet-100'
            placeholderTextColor={colors.violet[100]}
            placeholder='Buscar'
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TouchableOpacity onPress={() => setName('')}>
            <X size={24} color={colors.violet[100]} />
          </TouchableOpacity>
        </View>
      </View>
      <SectionList
        contentContainerClassName='px-4 py-8 gap-3'
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Contact data={item} />
        )}
        renderSectionHeader={({ section }) => (
          <Text className='size-9 rounded-lg bg-violet-500 text-center align-middle mt-10'>
            {section.title}
          </Text>
        )}
      />
    </View>
  )
}