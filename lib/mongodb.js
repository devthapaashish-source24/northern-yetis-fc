// lib/mongodb.js
import { MongoClient } from "mongodb";

// Get raw env var
const raw = process.env.MONGODB_URI;

if (!raw) {
  throw new Error("❌ Missing MONGODB_URI in environment variables");
}

// Clean it up in case it was pasted as `MONGODB_URI=...` or wrapped in quotes
let uri = raw.trim();

// remove wrapping quotes if present
if (uri.startsWith('"') && uri.endsWith('"')) {
  uri = uri.slice(1, -1);
}

// remove leading `MONGODB_URI=` if present
if (uri.startsWith("MONGODB_URI=")) {
  uri = uri.replace("MONGODB_URI=", "");
}

// OPTIONAL: if your password has @ but you meant %40, you can force-encode here
// but since you already added %40 in Vercel, you can leave this out.
// If you still see YetisFC2024@ in debug, uncomment next line:
// uri = uri.replace("YetisFC2024@", "YetisFC2024%40");

console.log("Mongo URI used by app:", uri.slice(0, 40) + "..."); // will show in Vercel logs

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
