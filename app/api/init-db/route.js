import clientPromise from '../../../lib/mongodb';
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("northern-yetis-fc");

    //matches collection 
    const matchesCollection = db.collection('matches');
    console.log(matchesCollection)
    // teams collection
    const teamsCollection = db.collection('teams');
    
    // Insert initial teams data
    const initialTeams = [
      { name: "NY Legends", shortCode: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "NY Alpha", shortCode: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "NY GenZ", shortCode: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "Peel F.C.", shortCode: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 }
    ];

    await teamsCollection.deleteMany({}); // Clear existing
    await teamsCollection.insertMany(initialTeams);

    // Ensure matches collection exists (empty for now)
    await matchesCollection.deleteMany({}); // Clear existing

    return Response.json({ 
      success: true, 
      message: "Database initialized successfully!",
      teamsAdded: initialTeams.length,
      collections: ['matches', 'teams']
    });

  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}