import React, { memo } from 'react'
import { View, TouchableNativeFeedback } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Link, type LinkProps } from 'expo-router'

import { Text } from '@/components/text'
import { parseNumberToReal } from '../lib/utils'

type SaleType = {
  id: number
  description: string
  price: number
  totalPayment?: number | undefined
}

interface SalesPaymentInfoProps extends LinkProps {
  payment: SaleType
  paid: boolean
}

export const SalesPaymentInfo = memo(({ paid, payment, href }: SalesPaymentInfoProps) => {
  return (
    <Link href={href} asChild>
      <TouchableNativeFeedback>
        <View className='px-4 py-2'>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-end gap-4'>
              <View className={twMerge(
                'size-4 rounded-full mb-0.5',
                paid ? 'bg-emerald-600' : 'bg-rose-600'
              )} />
              <View>
                <Text>
                  {payment.description}
                </Text>
                <Text variant='sm' className='text-zinc-400'>
                  {parseNumberToReal(payment.price)}
                </Text>
              </View>
            </View>
            {(payment.totalPayment !== undefined) && (
              <View className='items-end'>
                <Text variant='sm'>Restante</Text>
                <Text className='text-xs text-rose-500'>
                  {parseNumberToReal(payment.price - payment.totalPayment)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
    </Link>
  )
})
