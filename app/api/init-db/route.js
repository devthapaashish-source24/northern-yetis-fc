export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export async function GET() {
  // Completely skip any database operations
  if (process.env.NODE_ENV === 'production' || !process.env.MONGODB_URI) {
    return Response.json({ 
      success: true, 
      message: "Init DB API - call manually after deployment",
      status: "ready"
    });
  }

  // This part will only run in development with MongoDB URI
  try {
    const { default: clientPromise } = await import('../../../lib/mongodb');
    const client = await clientPromise;
    const db = client.db("northern-yetis-fc");

    // Your initialization code here...
    const teamsCollection = db.collection('teams');
    const matchesCollection = db.collection('matches');
    
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

  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}