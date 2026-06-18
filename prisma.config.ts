import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // 🚀 HARDCODED VALUE BYPASSES SYSTEM LOADER INTERCEPTIONS ENTIRELY
    url: env("postgresql://neondb_owner:npg_NAZp2tIuaj9F@ep-super-bonus-at2ac3q3-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
