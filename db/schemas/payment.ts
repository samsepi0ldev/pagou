import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { saleTable } from './sale'

export const paymentTable = sqliteTable('payments', {
  id: int('id').primaryKey({ autoIncrement: true }),
  paid: int('paid').notNull(),
  saleId: int('sale_id')
    .notNull()
    .references(() => saleTable.id),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
})
