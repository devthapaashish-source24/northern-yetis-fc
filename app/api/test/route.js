// app/api/test/route.js
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("northern-yetis-fc");
    
    // Test by listing collections to prove it works
    const collections = await db.listCollections().toArray();
    
    return Response.json({ 
      success: true, 
      message: "MongoDB connected successfully!",
      database: db.databaseName,
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message
    }, { status: 500 });
  }
}