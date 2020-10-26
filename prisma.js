const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const SLEEP = 20

  await prisma.$connect()
  console.log(`connect`)
  const q1 = prisma
    .$executeRaw(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('1st query returned')
    })
    .catch((e) => {
      console.log('1st query errored', e.toString())
    })
  console.log(`1st sleep ${SLEEP} query sent async`)

  const q2 = prisma
    .$executeRaw(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('2nd query returned')
    })
    .catch((e) => {
      console.log('2nd query errored', e.toString())
    })
  console.log(`2nd sleep ${SLEEP} query sent async`)

  await q1
  await q2
}

main().finally(() => {
  prisma.$disconnect()
})
