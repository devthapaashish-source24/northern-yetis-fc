export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  // Skip build entirely
  if (process.env.VERCEL_BUILDER === '1' || !process.env.MONGODB_URI) {
    return Response.json({
      success: true,
      message: "Init-DB skipped during build",
      buildTime: true
    });
  }

  try {
    // Lazy import inside function
    const { default: clientPromise } = await import('../../../lib/mongodb');

    const client = await clientPromise;
    const db = client.db("northern-yetis-fc");

    const teamsCollection = db.collection("teams");
    const matchesCollection = db.collection("matches");

    const initialTeams = [
      { name: "NY Legends", shortCode: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "NY Alpha", shortCode: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "NY GenZ", shortCode: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "Peel F.C.", shortCode: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 }
    ];

    await teamsCollection.deleteMany({});
    await teamsCollection.insertMany(initialTeams);
    await matchesCollection.deleteMany({});

    return Response.json({
      success: true,
      message: "Database initialized successfully!",
      teamsAdded: initialTeams.length
    });

  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
