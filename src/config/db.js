import 'dotenv/config'; // Ensures environment variables are parsed before the pool initializes

import pkgClient from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

const { PrismaClient } = pkgClient;

// Configure Neon to use WebSockets properly over standard Node network hooks
neonConfig.webSocketConstructor = ws;

// 1. Initialize the WebSocket driver connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

// 2. Instantiate the Prisma Client passing the required adapter property
const prisma = new PrismaClient({
  adapter: adapter, // ✅ This completely satisfies the Prisma 7 engine requirement!
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

// Helper validation connect verification check
const connectDB = async () => {
  try {
    // Under custom driver adapters, we execute a quick raw query check to test the pool
    await prisma.$queryRaw`SELECT 1`;
    console.log("🚀 DB Connected via Prisma 7 + Neon Adapter");
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
