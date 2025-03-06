import { drizzle } from 'drizzle-orm/expo-sqlite'
import type { SQLiteDatabase } from 'expo-sqlite'

import { eq, sql, sum } from 'drizzle-orm'
import * as schema from '../db/schemas'

export async function getCustomerByID(db: SQLiteDatabase, id: number) {
  const drizzleDb = drizzle(db, { schema })

  const totalSummary = drizzleDb.$with('total_summary').as(
    drizzleDb
      .select({
        customerId: schema.saleTable.customerId,
        totalSales: sql<number>`COALESCE(SUM(${schema.saleTable.price}), 0)`.as(
          'totalSales'
        ),
        saleIds: sql<string>`GROUP_CONCAT(${schema.saleTable.id})`.as(
          'saleIds'
        ),
      })
      .from(schema.saleTable)
      .groupBy(schema.saleTable.customerId)
  )

  const totalPayments = drizzleDb.$with('total_payments').as(
    drizzleDb
      .select({
        totalPayments:
          sql<number>`COALESCE(SUM(${schema.paymentTable.paid}), 0)`.as(
            'totalPayments'
          ),
        customerId: schema.saleTable.customerId,
      })
      .from(schema.paymentTable)
      .innerJoin(
        schema.saleTable,
        eq(schema.paymentTable.saleId, schema.saleTable.id)
      )
      .groupBy(schema.saleTable.customerId)
  )

  const [result] = await drizzleDb
    .with(totalSummary, totalPayments)
    .select({
      totalSales: sql<number>`COALESCE(${totalSummary.totalSales}, 0)`.as(
        'totalSales'
      ),
      pendingPayments:
        sql<number>`COALESCE(${totalSummary.totalSales}, 0) - COALESCE(${totalPayments.totalPayments}, 0)`.as(
          'pendingPayments'
        ),
    })
    .from(totalSummary)
    .leftJoin(
      totalPayments,
      eq(totalSummary.customerId, totalPayments.customerId)
    )
    .where(eq(totalSummary.customerId, id))
    .execute()

  const allSales = drizzleDb.$with('all_sales').as(
    drizzleDb
      .select({
        id: schema.saleTable.id,
        description: schema.saleTable.description,
        price: schema.saleTable.price,
        customerId: schema.saleTable.customerId,
        pendingPayment: sql<number>`
          ${schema.saleTable.price} - COALESCE(SUM(${schema.paymentTable.paid}), 0)
        `.as('pendingPayment'),
        createdAt: schema.saleTable.createdAt,
      })
      .from(schema.saleTable)
      .leftJoin(
        schema.paymentTable,
        eq(schema.saleTable.id, schema.paymentTable.saleId)
      )
      .groupBy(
        schema.saleTable.id,
        schema.saleTable.description,
        schema.saleTable.price,
        schema.saleTable.createdAt,
        schema.saleTable.customerId
      )
  )

  const [customer] = await drizzleDb
    .with(allSales)
    .select({
      id: schema.customerTable.id,
      name: schema.customerTable.name,
      sales: sql`
        '[' || COALESCE(
          GROUP_CONCAT(
            '{' ||
              '"id": ' || ${allSales.id} || ',' ||
              '"description": "' || ${allSales.description} || '",' ||
              '"price": ' || ${allSales.price} || ',' ||
              '"pendingPayment": ' || ${allSales.pendingPayment} || ',' ||
              '"createdAt": "' || ${allSales.createdAt} || '"'
            || '}'
          ), ''
        ) || ']'
      `.as('sales'),
    })
    .from(schema.customerTable)
    .leftJoin(allSales, eq(allSales.customerId, schema.customerTable.id))
    .where(eq(schema.customerTable.id, id))

  return {
    ...customer,
    sales: JSON.parse(customer.sales as string),
    ...result,
  }
}
