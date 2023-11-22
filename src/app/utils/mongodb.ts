// ./mongodb.ts

import { type Db, MongoClient, type MongoClientOptions } from "mongodb";

// Create cached connection variable
let cachedDB: Db | undefined;

// A function for connecting to MongoDB,
export default async function connectToDatabase(): Promise<Db> {
  // If the database connection is cached, use it instead of creating a new connection
  if (cachedDB) {
    return cachedDB;
  }
  const opts = {} satisfies MongoClientOptions;
  // If no connection is cached, create a new one
  const client = new MongoClient(process.env.MONGODB_URI as string, opts);
  await client.connect();
  const db: Db = client.db(process.env.DB_NAME);
  cachedDB = db;
  return cachedDB;
}
