import { defineConfig } from 'prisma/config';


export default defineConfig({
  migrations: {
    seed: 'tsx ./prisma/seed.js',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
