import { drizzle } from 'drizzle-orm/expo-sqlite'
import type { SQLiteDatabase } from 'expo-sqlite'

import { eq, sql, sum } from 'drizzle-orm'
import * as schema from '../db/schemas'

export type Sale = {
  id: number
  description: string
  price: number
  createdAt: string
}

export async function getAllSales(db: SQLiteDatabase) {
  const drizzleDb = drizzle(db, { schema })
  const sales = await drizzleDb
    .select({
      id: schema.saleTable.id,
      description: schema.saleTable.description,
      price: schema.saleTable.price,
      pendingPayment:
        sql<number>`${schema.saleTable.price} - COALESCE(SUM(${schema.paymentTable.paid}), 0)`.as(
          'pendingPayments'
        ),
      createdAt: schema.saleTable.createdAt,
    })
    .from(schema.saleTable)
    .leftJoin(
      schema.paymentTable,
      eq(schema.saleTable.id, schema.paymentTable.saleId)
    )
    .groupBy(
      schema.saleTable.id,
      schema.saleTable.price,
      schema.saleTable.createdAt
    )
    .execute()
  return { sales }
}

export async function getSummarySales(db: SQLiteDatabase) {
  const drizzleDb = drizzle(db, { schema })
  const totalSales = await drizzleDb
    .select({
      sales: sum(schema.saleTable.price).mapWith(Number),
    })
    .from(schema.saleTable)
  const totalPayment = await drizzleDb
    .select({
      payments: sum(schema.paymentTable.paid).mapWith(Number),
    })
    .from(schema.paymentTable)

  return {
    pendingPayment: totalSales[0].sales - totalPayment[0].payments,
    totalSales: totalSales[0].sales,
  }
}
