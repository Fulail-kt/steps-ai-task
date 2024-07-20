// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const dbConnect = async () => {
//   try {
//     await prisma.$connect();
//     console.log("Database connected successfully!");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// export default dbConnect;


// config/db.js

import { PrismaClient } from "@prisma/client";
import { execSync } from 'child_process';

const prisma = new PrismaClient();

const dbConnect = async () => {
  try {
    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected successfully!");
    
    // Optionally push schema changes
    // Comment out this block if you don't want automatic schema updates
    try {
      console.log("Pushing schema changes...");
      execSync('npx prisma db push', { stdio: 'inherit' });
      console.log("Schema updated successfully.");
    } catch (schemaError) {
      console.error("Error updating schema:", schemaError);
    }
    
    return prisma;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // Optionally, you might want to exit the process here
    // process.exit(1);
  }
};



export { dbConnect, prisma };