import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const customerTable = sqliteTable('customers', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  phoneNumber: text('phone_number').unique(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})
