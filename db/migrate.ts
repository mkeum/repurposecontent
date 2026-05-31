import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, client } from "./index";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "db/migrations" });
    console.log("Migrations completed successfully");
    await client.end();
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
