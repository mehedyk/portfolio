import { MongoClient, type Db } from 'mongodb';

/** One client per warm function instance (avoids a new connection per request). */
let client: MongoClient | undefined;

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  client ??= new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 5000, appName: 'portfolio' });
  await client.connect(); // no-op when already connected
  return client.db(process.env.MONGODB_DB || 'portfolio');
}
