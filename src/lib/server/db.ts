import { MongoClient, type Db, type Collection, type Document } from 'mongodb';
import { env } from '$env/dynamic/private';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let connectionAttempted = false;

const DB_NAME = 'voting_assistant';

export function shouldUseMock(): boolean {
  return env.USE_MOCK_DATA !== 'false' || !env.MONGODB_URI;
}

export async function getDb(): Promise<Db | null> {
  if (shouldUseMock()) return null;

  if (cachedDb) return cachedDb;

  if (connectionAttempted && !cachedDb) {
    return null;
  }

  try {
    connectionAttempted = true;
    const uri = env.MONGODB_URI;
    if (!uri) return null;

    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000
    });
    await client.connect();
    cachedClient = client;
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  } catch (err) {
    console.error('[db] MongoDB connection failed, falling back to mock:', err);
    cachedDb = null;
    cachedClient = null;
    return null;
  }
}

export async function getCollection<T extends Document = Document>(
  name: string
): Promise<Collection<T> | null> {
  const db = await getDb();
  if (!db) return null;
  return db.collection<T>(name);
}

export async function closeDb(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

export const COLLECTIONS = {
  abstimmungen: 'abstimmungen',
  parteiInteressen: 'parteiInteressen',
  communityVotes: 'communityVotes'
} as const;
