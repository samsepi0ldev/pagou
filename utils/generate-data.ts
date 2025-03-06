import { customerTable } from '@/db/schemas/customer'
import { paymentTable } from '@/db/schemas/payment'
import { saleTable } from '@/db/schemas/sale'
import { faker } from '@faker-js/faker'
import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite'
import AsyncStorage from 'expo-sqlite/kv-store'

function generateArrayPerson() {
  return Array.from({ length: 10 }, () => {
    return {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
    }
  })
}

function generateArraySales() {
  return Array.from({ length: 10 }, () => {
    return {
      description: faker.word.words(),
      price: faker.number.int({ min: 1000, max: 9999 }),
      createdAt: faker.date.anytime().toISOString(),
      customerId: faker.number.int({ min: 1, max: 10 }),
    }
  })
}

function generatePayments() {
  return Array.from({ length: 10 }, () => {
    return {
      saleId: faker.number.int({ min: 1, max: 10 }),
      paid: faker.number.int({ min: 1, max: 999 }),
    }
  })
}

export async function addDummyData(db: ExpoSQLiteDatabase) {
  const value = AsyncStorage.getItemSync('dbInitialized')
  if (value) return

  console.log('Deleting data')

  await db.delete(paymentTable).all()
  await db.delete(saleTable).all()
  await db.delete(customerTable).all()

  console.log('Insert data')

  const data = generateArrayPerson()
  const saleData = generateArraySales()
  const paymentData = generatePayments()

  await db.insert(customerTable).values(data)
  await db.insert(saleTable).values(saleData)
  await db.insert(paymentTable).values(paymentData)
}
