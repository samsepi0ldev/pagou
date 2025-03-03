import * as Contacts from 'expo-contacts'
import { router } from 'expo-router'
import { ArrowLeft, X } from 'lucide-react-native'
import { useEffect, useId, useState } from 'react'
import {
  Alert,
  SectionList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { Contact } from '@/components/contact'
import { Text } from '@/components/text'
import { FlashList } from '@shopify/flash-list'

type ContactPops = {
  id: string
  name: string
  image: Contacts.Image
  phoneNumber: string | null
}

type SectionListDataProps = {
  title: string
  data: ContactPops[]
}

export default function ContactsScreen() {
  const [name, setName] = useState('')
  const [contacts, setContacts] = useState<(string | ContactPops)[]>([])
  async function fetchContacts() {
    try {
      const { status } = await Contacts.requestPermissionsAsync()

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name,
          sort: 'firstName',
        })

        const list = data
          .map(contact => ({
            id: contact.id ?? useId(),
            name: contact.name,
            image: contact.image,
            phoneNumber: contact.phoneNumbers
              ? contact.phoneNumbers[0].number
              : 'Erro ao ler numero',
          }))
          .reduce<SectionListDataProps[]>((acc, curr) => {
            const firstLetter = curr.name.charAt(0).toUpperCase()
            const existsEntry = acc.find(
              (entry: SectionListDataProps) => entry.title === firstLetter
            )

            if (existsEntry) {
              existsEntry.data.push(curr)
            } else {
              acc.push({ title: firstLetter, data: [curr] })
            }

            return acc
          }, [])

        const listOptimize = transformSectionsToFlatArray(list)
        setContacts(listOptimize)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Error')
    }
  }
  function transformSectionsToFlatArray(sections: SectionListDataProps[]) {
    const flatArray: (string | ContactPops)[] = []

    for (const section of sections) {
      flatArray.push(section.title)
      flatArray.push(...section.data)
    }
    return flatArray
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchContacts()
  }, [name])

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

      <FlashList
        data={contacts}
        contentContainerClassName="pb-20"
        className="px-4 py-8"
        renderItem={({ item }) => {
          if (typeof item === 'string') {
            return (
              <Text className="size-9 rounded-lg bg-violet-500 text-center align-middle mt-10 mb-2">
                {item}
              </Text>
            )
          }
          return <Contact data={item} />
        }}
        getItemType={item => {
          return typeof item === 'string' ? 'sectionHeader' : 'row'
        }}
        estimatedItemSize={contacts.length}
      />
    </View>
  )
}
