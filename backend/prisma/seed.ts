import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: 'c395154e-db32-4432-a598-feb704381c4a',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento para programadores',
            maximumAttendees: 120
        }
    })
}

seed().then(() => {
    console.log('Database Seeded!')
    prisma.$disconnect()
})