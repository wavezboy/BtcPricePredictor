import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const saveDataToFile = (tableName: string, data: any) => {
  const filePath = path.join(__dirname, "seed_data", `${tableName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Data from ${tableName} saved to ${filePath}`);
};

export const fetchData = async (table: string) => {
  try {
    let data;
    switch (table) {
      case "User":
        data = await prisma.user.findMany();
        break;
      case "Vendor":
        data = await prisma.vendor.findMany();
        break;
      // Add other cases as needed for additional tables
      default:
        throw new Error(`Unknown table: ${table}`);
    }
    console.log(`Data from ${table}:`, data);
    saveDataToFile(table, data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn(`Error fetching data from table "${table}":`, err.message);
    } else {
      console.warn(`Unexpected error fetching data from table "${table}"`);
    }
  }
};
