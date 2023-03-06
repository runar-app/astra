import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
if (!uri) {
  throw new Error("Please add your Mongo URI to .env");
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URL) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const selfGlobal = global as any;
  if (!selfGlobal._mongoClientPromise) {
    client = new MongoClient(uri, options);
    selfGlobal._mongoClientPromise = client.connect();
  }
  clientPromise = selfGlobal._mongoClientPromise as Promise<MongoClient>;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export const getDB = async () => {
  const client = await clientPromise;
  return client.db();
};
