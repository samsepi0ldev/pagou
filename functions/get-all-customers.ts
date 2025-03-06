import { eq, ilike, like } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import type { SQLiteDatabase } from 'expo-sqlite'

import { sql } from 'drizzle-orm'
import * as schema from '../db/schemas'

export type Customer = {
  id: number
  name: string
  phoneNumber: string
  email: string
}

export async function getAllCustomers(db: SQLiteDatabase, find?: string) {
  const drizzleDb = drizzle(db, { schema })

  const customers = await drizzleDb
    .select({
      id: schema.customerTable.id,
      name: schema.customerTable.name,
      phoneNumber: schema.customerTable.phoneNumber,
      email: schema.customerTable.email,
      pendingPayment: sql<number>`COALESCE(SUM(${schema.saleTable.price} - COALESCE(${schema.paymentTable.paid}, 0)), 0)`,
    })
    .from(schema.customerTable)
    .where(find ? like(schema.customerTable.name, `%${find}%`) : undefined)
    .leftJoin(
      schema.saleTable,
      eq(schema.customerTable.id, schema.saleTable.customerId)
    )
    .leftJoin(
      schema.paymentTable,
      eq(schema.saleTable.id, schema.paymentTable.saleId)
    )
    .groupBy(schema.customerTable.id, schema.customerTable.name)
    .execute()
  return { customers }
}
