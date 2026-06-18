import 'dotenv/config';
import { PrismaClient } from "../generated/index.js";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon(
  { connectionString: process.env.DATABASE_URL }
);

const prisma = new PrismaClient({
  adapter: adapter,
  log: ["query", "error", "warn"]
});

export const connectDB = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("🚀 DB Connected via Prisma 7 + Neon Adapter");
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma };
