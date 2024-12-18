import { prisma } from '@/../db';
import { actionDelayFn, loaderDelayFn, shuffle } from './utils';

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> & Required<Pick<TValue, TKey>>;

export type Invoice = {
  id: number;
  title: string;
  body: string;
};

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export async function fetchInvoices() {
  return loaderDelayFn(async () => {
    const invoices = await prisma.invoice.findMany();
    return invoices;
  });
}

export async function fetchInvoiceById(id: number) {
  return loaderDelayFn(async () => {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return invoice;
  });
}

export async function postInvoice(partialInvoice: Partial<Invoice>) {
  return actionDelayFn(async () => {
    if (partialInvoice.title?.includes('error')) {
      console.log('error');
      throw new Error('Ouch!');
    }
    const invoice = await prisma.invoice.create({
      data: {
        title: partialInvoice.title ?? `New Invoice ${String(Date.now()).slice(0, 5)}`,
        body:
          partialInvoice.body ??
          shuffle(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`.split(
              ' ',
            ),
          ).join(' '),
      },
    });
    return invoice;
  });
}

export async function patchInvoice({ id, ...updatedInvoice }: PickAsRequired<Partial<Invoice>, 'id'>) {
  return actionDelayFn(async () => {
    if (updatedInvoice.title?.toLowerCase()?.includes('error')) {
      throw new Error('Ouch!');
    }
    const invoice = await prisma.invoice.update({
      where: { id },
      data: updatedInvoice,
    });
    return invoice;
  });
}

export type UsersSortBy = 'name' | 'id' | 'email';

export async function fetchUsers({ filterBy, sortBy }: { filterBy?: string; sortBy?: UsersSortBy } = {}) {
  return loaderDelayFn(async () => {
    const users = await prisma.user.findMany({
      where: filterBy
        ? {
            name: {
              contains: filterBy,
            },
          }
        : undefined,
      orderBy: sortBy ? { [sortBy]: 'asc' } : undefined,
    });
    return users;
  });
}

export async function fetchUserById(id: number) {
  return loaderDelayFn(async () => {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  });
}

export async function fetchRandomNumber() {
  return loaderDelayFn(() => {
    return Math.random();
  });
}
