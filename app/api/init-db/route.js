import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  try {
    // CONNECT
    const client = await clientPromise;
    const db = client.db("northern-yetis-fc");

    const matchesCollection = db.collection("matches");
    const teamsCollection = db.collection("teams");

    const initialTeams = [
      { name: "NY Legends", shortCode: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "NY Alpha", shortCode: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "NY GenZ", shortCode: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 },
      { name: "Peel F.C.", shortCode: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 }
    ];

    // RESET DB
    await teamsCollection.deleteMany({});
    await teamsCollection.insertMany(initialTeams);
    await matchesCollection.deleteMany({});

    return Response.json({
      success: true,
      message: "Database initialized successfully!",
      teamsAdded: initialTeams.length,
      collections: ["matches", "teams"],
    });
  } catch (error) {
    console.error("DB init error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
