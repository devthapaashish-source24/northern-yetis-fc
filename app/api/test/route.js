import clientPromise from '../../../lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // CRITICAL: Skip if no MongoDB URI (build environment)
  if (!process.env.MONGODB_URI) {
    return Response.json({ 
      success: true, 
      message: "Test API - MongoDB not configured during build",
      buildTime: true
    });
  }
  
  // Skip during Vercel build
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV) {
    return Response.json({ 
      success: true, 
      message: "Test API skipped during build",
      buildTime: true
    });
  }

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