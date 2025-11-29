import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const DB_NAME = "northern-yetis-fc";

const calculateStandings = (teams, matches) => {
  const teamStats = {};

  teams.forEach(team => {
    teamStats[team.name] = {
      ...team,
      played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0
    };
  });

  matches.forEach(match => {
    const teamA = teamStats[match.teamA];
    const teamB = teamStats[match.teamB];

    if (!teamA || !teamB) return;

    teamA.played++;
    teamA.goalsFor += match.scoreA;
    teamA.goalsAgainst += match.scoreB;

    teamB.played++;
    teamB.goalsFor += match.scoreB;
    teamB.goalsAgainst += match.scoreA;

    if (match.scoreA > match.scoreB) {
      teamA.won++; teamA.points += 3; teamB.lost++;
    } else if (match.scoreA < match.scoreB) {
      teamB.won++; teamB.points += 3; teamA.lost++;
    } else {
      teamA.drawn++; teamB.drawn++;
      teamA.points++; teamB.points++;
    }
  });

  return Object.values(teamStats).map(t => ({
    ...t,
    goalDifference: t.goalsFor - t.goalsAgainst
  }));
};

export async function GET() {
  try {
    const { default: clientPromise } = await import("../../../lib/mongodb");
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const matches = await db.collection("matches").find({}).sort({ timestamp: -1 }).toArray();
    const teams = await db.collection("teams").find({}).toArray();

    return Response.json({
      success: true,
      data: {
        teams: calculateStandings(teams, matches),
        matches
      },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { default: clientPromise } = await import("../../../lib/mongodb");
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const body = await request.json();
    const newMatch = {
      week: Number(body.week),
      teamA: body.teamA,
      teamB: body.teamB,
      scoreA: Number(body.scoreA),
      scoreB: Number(body.scoreB),
      timestamp: new Date().toISOString()
    };

    await db.collection("matches").insertOne(newMatch);

    const matches = await db.collection("matches").find({}).toArray();
    const teams = await db.collection("teams").find({}).toArray();

    return Response.json({
      success: true,
      data: {
        teams: calculateStandings(teams, matches),
        matches
      },
    });
  } catch (error) {
    console.error("POST Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { matchId, scoreA, scoreB } = body;

    const { default: clientPromise } = await import("../../../lib/mongodb");
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection("matches").updateOne(
      { _id: new ObjectId(matchId) },
      { $set: { scoreA: Number(scoreA), scoreB: Number(scoreB) } }
    );

    const matches = await db.collection("matches").find({}).toArray();
    const teams = await db.collection("teams").find({}).toArray();

    return Response.json({
      success: true,
      data: {
        teams: calculateStandings(teams, matches),
        matches
      },
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("matchId");

    const { default: clientPromise } = await import("../../../lib/mongodb");
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection("matches").deleteOne({ _id: new ObjectId(matchId) });

    const matches = await db.collection("matches").find({}).toArray();
    const teams = await db.collection("teams").find({}).toArray();

    return Response.json({
      success: true,
      data: {
        teams: calculateStandings(teams, matches),
        matches
      },
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
