import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const USERS = [
  {
    id: 1,
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@example.com',
  },
  {
    id: 2,
    name: 'Bob Williams',
    username: 'bobw',
    email: 'bob@example.com',
  },
];

const COMPANIES = [
  {
    id: 1,
    name: 'Tech Solutions',
    catchPhrase: 'Innovating the future',
    bs: 'business intelligence',
    userId: 1,
  },
  {
    id: 2,
    name: 'Global Corp',
    catchPhrase: 'Global reach, local touch',
    bs: 'international trade',
    userId: 2,
  },
];

const INVOICES = [
  {
    id: 1,
    amount: 1500.0,
    userId: 1,
  },
  {
    id: 2,
    amount: 2500.0,
    userId: 2,
  },
];

async function seedDatabase() {
  await Promise.all(
    USERS.map(user => {
      return prisma.user.create({
        data: user,
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created user records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create user records', e);
    });

  await Promise.all(
    COMPANIES.map(company => {
      return prisma.company.create({
        data: company,
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created company records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create company records', e);
    });

  await Promise.all(
    INVOICES.map(invoice => {
      return prisma.invoice.create({
        data: invoice,
      });
    }),
  )
    .then(() => {
      console.info('[SEED] Successfully created invoice records');
    })
    .catch(e => {
      console.error('[SEED] Failed to create invoice records', e);
    });
}

seedDatabase()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
