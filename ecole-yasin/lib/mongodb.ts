import mongoose from "mongoose";

const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = { conn: null, promise: null };
}

/**
 * Ouvre une connexion MongoDB partagée entre les rechargements.
 */
export async function connectDB() {
  const cached = globalForMongoose.mongoose;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI n'est pas défini dans les variables d'environnement.");
    }

    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB ?? "ecole-yasin",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
