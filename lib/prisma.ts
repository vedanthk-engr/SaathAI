import { PrismaClient } from '@prisma/client';
import { SEED_PRODUCTS, SEED_ARTISANS, SEED_ORDERS, SEED_CRAFT_TRADITIONS } from './seedData';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// In-memory state store for fallback demo mode if Prisma/DB connection fails
export const memoryStore = {
  products: [...SEED_PRODUCTS],
  artisans: [...SEED_ARTISANS],
  orders: [...SEED_ORDERS],
  craftTraditions: [...SEED_CRAFT_TRADITIONS],
};
