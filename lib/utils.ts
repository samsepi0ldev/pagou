export function parseNumberToReal (value: number) {
  return Intl
    .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(value / 100)
}
