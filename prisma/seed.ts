import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const USERS = [
  {
    id: 1,
    name: 'Alice Smith',
    username: 'alice',
    email: 'alice@example.com',
    phone: '555-1001',
    website: 'www.alicesmith.com',
    address: {
      street: '123 Maple Street',
      suite: 'Apt 1',
      city: 'Wonderland',
      zipcode: '12345',
      geo: {
        lat: '40.7128',
        lng: '-74.0060',
      },
    },
    company: {
      name: 'Alice Co.',
      catchPhrase: 'Innovating the future',
      bs: 'integrate scalable models',
    },
  },
  {
    id: 2,
    name: 'Bob Johnson',
    username: 'bobj',
    email: 'bob@example.com',
    phone: '555-1002',
    website: 'www.bobjohnson.com',
    address: {
      street: '456 Oak Avenue',
      suite: 'Suite 200',
      city: 'Metropolis',
      zipcode: '67890',
      geo: {
        lat: '34.0522',
        lng: '-118.2437',
      },
    },
    company: {
      name: 'Bob Industries',
      catchPhrase: 'Exceeding expectations',
      bs: 'deliver robust solutions',
    },
  },
  {
    id: 3,
    name: 'Carol Williams',
    username: 'carolw',
    email: 'carol@example.com',
    phone: '555-1003',
    website: 'www.carolwilliams.com',
    address: {
      street: '789 Pine Road',
      suite: 'Suite 300',
      city: 'Gotham',
      zipcode: '13579',
      geo: {
        lat: '51.5074',
        lng: '-0.1278',
      },
    },
    company: {
      name: 'Carol Corp.',
      catchPhrase: 'Empowering innovation',
      bs: 'streamline mission-critical tasks',
    },
  },
  {
    id: 4,
    name: 'David Brown',
    username: 'davidb',
    email: 'david@example.com',
    phone: '555-1004',
    website: 'www.davidbrown.com',
    address: {
      street: '101 Elm Street',
      suite: 'Apt 4B',
      city: 'Star City',
      zipcode: '24680',
      geo: {
        lat: '37.7749',
        lng: '-122.4194',
      },
    },
    company: {
      name: 'David Enterprises',
      catchPhrase: 'Building the future',
      bs: 'enhance user experiences',
    },
  },
  {
    id: 5,
    name: 'Eva Green',
    username: 'evag',
    email: 'eva@example.com',
    phone: '555-1005',
    website: 'www.evagreen.com',
    address: {
      street: '202 Birch Lane',
      suite: 'Unit 5',
      city: 'Coast City',
      zipcode: '11223',
      geo: {
        lat: '48.8566',
        lng: '2.3522',
      },
    },
    company: {
      name: 'Eva Solutions',
      catchPhrase: 'Innovate to elevate',
      bs: 'leverage next-gen technologies',
    },
  },
];

const COMPANIES = [
  {
    id: 1,
    name: 'Alice Co.',
    catchPhrase: 'Innovating the future',
    bs: 'integrate scalable models',
    userId: 1,
  },
  {
    id: 2,
    name: 'Bob Industries',
    catchPhrase: 'Exceeding expectations',
    bs: 'deliver robust solutions',
    userId: 2,
  },
  {
    id: 3,
    name: 'Carol Corp.',
    catchPhrase: 'Empowering innovation',
    bs: 'streamline mission-critical tasks',
    userId: 3,
  },
  {
    id: 4,
    name: 'David Enterprises',
    catchPhrase: 'Building the future',
    bs: 'enhance user experiences',
    userId: 4,
  },
  {
    id: 5,
    name: 'Eva Solutions',
    catchPhrase: 'Innovate to elevate',
    bs: 'leverage next-gen technologies',
    userId: 5,
  },
];

const INVOICES = [
  {
    id: 1,
    title: 'Invoice 1001',
    body: 'Invoice details for transaction 1001',
  },
  {
    id: 2,
    title: 'Invoice 1002',
    body: 'Invoice details for transaction 1002',
  },
  {
    id: 3,
    title: 'Invoice 1003',
    body: 'Invoice details for transaction 1003',
  },
  {
    id: 4,
    title: 'Invoice 1004',
    body: 'Invoice details for transaction 1004',
  },
  {
    id: 5,
    title: 'Invoice 1005',
    body: 'Invoice details for transaction 1005',
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
