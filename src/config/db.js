import pkgClient from '@prisma/client';
import { neon, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import path from 'path';
import { config } from 'dotenv';
import ws from 'ws';

const { PrismaClient } = pkgClient;

// Ensure environment variables are loaded from the root directory
config({ path: path.resolve(process.cwd(), '.env') });

// Configure Neon to use the standard web socket constructor for Node.js environments
neonConfig.webSocketConstructor = ws;

// Create the native Neon database connection connection
const sql = neon(process.env.DATABASE_URL);
const adapter = new PrismaNeon(sql);

// Instantiate the Prisma Client passing the required adapter
const prisma = new PrismaClient({
  adapter: adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected via Prisma Neon Adapter");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
  console.log("👋 Database disconnected safely.");
};

export { prisma, connectDB, disconnectDB };
