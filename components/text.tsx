import { cva, type VariantProps } from 'class-variance-authority'
import { Text as PrimitiveText, type TextProps } from 'react-native'

import { cn } from '../lib/utils'

interface TextPropsTypes extends TextProps, VariantProps<typeof textVariants> {}

const textVariants = cva('text-violet-100', {
  variants: {
    variant: {
      heading: 'text-4xl font-nunito-medium',
      'heading-sub-title': 'text-3xl font-nunito-medium',
      title: 'text-lg font-nunito-semibold',
      subtitle: 'font-nunito-semibold',
      description: 'font-nunito-regular text-zinc-500',
      header: 'text-lg font-nunito-bold',
      base: 'text-base font-nunito-medium',
      sm: 'text-sm font-nunito-medium'
    }
  },
  defaultVariants: {
    variant: 'base'
  }
})

export function Text ({ className, variant, ...props }: TextPropsTypes) {
  return (
    <PrimitiveText
      className={cn(textVariants({ className, variant }))}
      {...props}
    />
  )
}