export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET() {

  // Skip entirely during Vercel build
  if (process.env.VERCEL_BUILDER === '1' || !process.env.MONGODB_URI) {
    return Response.json({
      success: true,
      message: "Test API skipped during build",
      buildTime: true
    });
  }

  try {
    // Lazy import MongoDB ONLY at runtime
    const { default: clientPromise } = await import('../../../lib/mongodb');

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
