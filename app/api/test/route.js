import clientPromise from '../../../lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {

  // Detect Vercel build environment correctly
  if (process.env.VERCEL_BUILDER === '1') {
    return Response.json({
      success: true,
      message: "Test API skipped during Vercel build",
      buildTime: true
    });
  }

  // Detect missing MongoDB URI (local build)
  if (!process.env.MONGODB_URI) {
    return Response.json({
      success: true,
      message: "MongoDB not configured (likely build stage)",
      buildTime: true
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("northern-yetis-fc");

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
