import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaClient: PrismaClient | null = null;

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const adapter = new PrismaPg({
    connectionString,
    // Add timeout to prevent hanging
  });

  return new PrismaClient({
    adapter,
    // Disable logging during build to prevent hangs
    log:
      process.env.NODE_ENV === "production" ? [] : ["query", "error", "warn"],
  });
}

export function getPrisma(): PrismaClient {
  // Check cached instance
  if (prismaClient) return prismaClient;
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  // Create new instance
  const client = createPrismaClient();
  prismaClient = client;

  // Cache in global for development
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Maintain backward compatibility
export { getPrisma as prisma };

export async function checkDbConnexion(): Promise<boolean> {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error(`Database connection failed: ${error}`);
    return false;
  }
}
