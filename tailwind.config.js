/** @type {import('tailwindcss').Config} */

import { platformSelect } from 'nativewind/theme'

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'nunito-regular': platformSelect({
          ios: 'Nunito_400Regular',
          android: 'Nunito_400Regular',
          default: 'Nunito_400Regular'
        }),
        'nunito-medium': platformSelect({
          ios: 'Nunito_500Medium',
          android: 'Nunito_500Medium',
          default: 'Nunito_500Medium'
        }),
        'nunito-semibold': platformSelect({
          ios: 'Nunito_600SemiBold',
          android: 'Nunito_600SemiBold',
          default: 'Nunito_600SemiBold'
        }),
        'nunito-bold': platformSelect({
          ios: 'Nunito_700Bold',
          android: 'Nunito_700Bold',
          default: 'Nunito_700Bold'
        }),
      }
    },
  },
  plugins: [],
}