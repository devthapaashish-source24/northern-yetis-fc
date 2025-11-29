import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; 
// Force dynamic rendering and prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Skip this route during build entirely
export const generateStaticParams = () => {
  return [];
}

const DB_NAME = "northern-yetis-fc";

// Helper: Calculate standings from matches
const calculateStandings = (teams, matches) => {
  const teamStats = {};
  
  // Initialize all teams with zero stats
  teams.forEach(team => {
    teamStats[team.name] = {
      ...team,
      played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0
    };
  });

  // Calculate stats from matches
  matches.forEach(match => {
    const teamA = teamStats[match.teamA];
    const teamB = teamStats[match.teamB];
    
    if (teamA && teamB) {
      // Update Team A
      teamA.played++;
      teamA.goalsFor += match.scoreA;
      teamA.goalsAgainst += match.scoreB;
      
      // Update Team B  
      teamB.played++;
      teamB.goalsFor += match.scoreB;
      teamB.goalsAgainst += match.scoreA;

      // Update points based on result
      if (match.scoreA > match.scoreB) {
        teamA.won++;
        teamA.points += 3;
        teamB.lost++;
      } else if (match.scoreA < match.scoreB) {
        teamB.won++;
        teamB.points += 3;
        teamA.lost++;
      } else {
        teamA.drawn++;
        teamB.drawn++;
        teamA.points += 1;
        teamB.points += 1;
      }
    }
  });

  // Calculate goal difference and return as array
  return Object.values(teamStats).map(team => ({
    ...team,
    goalDifference: team.goalsFor - team.goalsAgainst
  }));
};

// Validation helper
const validateMatchData = (data) => {
  const { week, teamA, teamB, scoreA, scoreB } = data;
  
  if (!week || !teamA || !teamB || scoreA === undefined || scoreB === undefined) {
    throw new Error('Missing required fields: week, teamA, teamB, scoreA, scoreB');
  }

  if (teamA === teamB) {
    throw new Error('Team cannot play against itself');
  }

  if (scoreA < 0 || scoreB < 0) {
    throw new Error('Scores cannot be negative');
  }

  if (week < 1 || week > 6) {
    throw new Error('Week must be between 1 and 6');
  }
};

// GET - Read all data
export async function GET() {
  // Skip during Vercel build
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV) {
    return Response.json({
      success: true,
      message: "Standings API skipped during build",
      buildTime: true
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const matches = await db.collection('matches')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    const teams = await db.collection('teams').find({}).toArray();
    const standings = calculateStandings(teams, matches);

    return Response.json({
      success: true,
      data: {
        teams: standings,
        matches: matches,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('GET Error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch standings' 
    }, { status: 500 });
  }
}

// POST - Create new match
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const body = await request.json();
    
    // Validate input
    validateMatchData(body);

    // Create new match
    const newMatch = {
      week: parseInt(body.week),
      teamA: body.teamA,
      teamB: body.teamB,
      scoreA: parseInt(body.scoreA),
      scoreB: parseInt(body.scoreB),
      timestamp: new Date().toISOString()
    };

    // Insert into database
    await db.collection('matches').insertOne(newMatch);

    // Get updated data and calculate standings
    const matches = await db.collection('matches').find({}).toArray();
    const teams = await db.collection('teams').find({}).toArray();
    const standings = calculateStandings(teams, matches);

    return Response.json({ 
      success: true, 
      data: {
        teams: standings,
        matches: matches
      },
      message: 'Match added successfully!' 
    });

  } catch (error) {
    console.error('POST Error:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}

// PUT - Update match
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const body = await request.json();
    const { matchId, scoreA, scoreB } = body;

    // Validate scores
    if (scoreA < 0 || scoreB < 0) {
      return Response.json({ 
        success: false, 
        error: 'Scores cannot be negative' 
      }, { status: 400 });
    }

    // Update match in database
    await db.collection('matches').updateOne(
      { _id: new ObjectId(matchId) },
      { 
        $set: { 
          scoreA: parseInt(scoreA),
          scoreB: parseInt(scoreB)
        } 
      }
    );

    // Get updated data and calculate standings
    const matches = await db.collection('matches').find({}).toArray();
    const teams = await db.collection('teams').find({}).toArray();
    const standings = calculateStandings(teams, matches);

    return Response.json({ 
      success: true, 
      data: {
        teams: standings,
        matches: matches
      },
      message: 'Match updated successfully!' 
    });

  } catch (error) {
    console.error('PUT Error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to update match' 
    }, { status: 500 });
  }
}

// DELETE - Remove match
export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get('matchId');

    // Delete match from database
    await db.collection('matches').deleteOne({ 
      _id: new ObjectId(matchId) 
    });

    // Get updated data and calculate standings
    const matches = await db.collection('matches').find({}).toArray();
    const teams = await db.collection('teams').find({}).toArray();
    const standings = calculateStandings(teams, matches);

    return Response.json({ 
      success: true, 
      data: {
        teams: standings,
        matches: matches
      },
      message: 'Match deleted successfully!' 
    });

  } catch (error) {
    console.error('DELETE Error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to delete match' 
    }, { status: 500 });
  }
}