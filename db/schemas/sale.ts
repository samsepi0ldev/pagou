import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { customerTable } from './customer'

export const saleTable = sqliteTable('sales', {
  id: int('id').primaryKey({ autoIncrement: true }),
  description: text('description').notNull(),
  price: int('price').notNull(),
  customerId: int('customer_id')
    .notNull()
    .references(() => customerTable.id),
  createdAt: text('created_at').notNull(),
})
