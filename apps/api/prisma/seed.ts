import { PrismaClient } from '@prisma/client';

// Seed some example items
const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      { title: 'Build the API', completed: true },
      { title: 'Build the frontend', completed: false },
      { title: 'Write tests', completed: false },
    ],
    skipDuplicates: true,
  });
  console.log('Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
