import { Link, type LinkProps } from 'expo-router'
import React, { memo } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/text'
import { parseNumberToReal } from '../lib/utils'

type SaleType = {
  id: number
  description: string
  price: number
  pendingPayment?: number | undefined
}

interface SalesPaymentInfoProps extends LinkProps {
  payment: SaleType
  paid: boolean
}

export const SalesPaymentInfo = memo(
  ({ paid, payment, href }: SalesPaymentInfoProps) => {
    return (
      <Link href={href} asChild>
        <TouchableNativeFeedback>
          <View className="px-4 py-2">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-end gap-4">
                <View
                  className={twMerge(
                    'size-4 rounded-full mb-0.5',
                    paid ? 'bg-emerald-600' : 'bg-rose-600'
                  )}
                />
                <View>
                  <Text>{payment.description}</Text>
                  <Text variant="sm" className="text-zinc-400">
                    {parseNumberToReal(payment.price)}
                  </Text>
                </View>
              </View>
              {payment.pendingPayment !== undefined && (
                <View className="items-end">
                  <Text variant="sm">Restante</Text>
                  <Text className="text-xs text-rose-500">
                    {parseNumberToReal(payment.pendingPayment)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableNativeFeedback>
      </Link>
    )
  }
)
