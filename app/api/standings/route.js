// app/api/standings/route.js

// In-memory database (shared across all users)
let standingsData = {
  teams: [
    { id: 1, name: "NY Legends", short: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { id: 2, name: "NY Alpha", short: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { id: 3, name: "NY GenZ", short: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { id: 4, name: "Peel F.C.", short: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
  ],
  matches: [],
  lastUpdated: new Date().toISOString()
};

// Helper function to update team standings
function updateTeamStandings(teams, matches) {
  // Reset all teams
  const resetTeams = teams.map(team => ({
    ...team,
    played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0
  }));

  // Recalculate from all matches
  matches.forEach(match => {
    const teamA = resetTeams.find(t => t.name === match.teamA);
    const teamB = resetTeams.find(t => t.name === match.teamB);
    
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

  return resetTeams;
}

// GET - Read all data
export async function GET() {
  return Response.json(standingsData);
}

// POST - Create new match
export async function POST(request) {
  try {
    const body = await request.json();
    const { week, teamA, teamB, scoreA, scoreB } = body;

    // Create new match
    const newMatch = {
      id: Date.now() + Math.random(),
      week: parseInt(week),
      teamA,
      teamB,
      scoreA: parseInt(scoreA),
      scoreB: parseInt(scoreB),
      timestamp: new Date().toISOString()
    };

    // Add to matches
    standingsData.matches.push(newMatch);
    
    // Update team standings
    standingsData.teams = updateTeamStandings(standingsData.teams, standingsData.matches);
    standingsData.lastUpdated = new Date().toISOString();

    return Response.json({ 
      success: true, 
      data: standingsData,
      message: 'Match added successfully!' 
    });

  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to add match' 
    }, { status: 500 });
  }
}

// PUT - Update existing match
export async function PUT(request) {
  try {
    const body = await request.json();
    const { matchId, scoreA, scoreB } = body;

    // Find and update match
    const matchIndex = standingsData.matches.findIndex(match => match.id === matchId);
    if (matchIndex === -1) {
      return Response.json({ 
        success: false, 
        error: 'Match not found' 
      }, { status: 404 });
    }

    // Update match scores
    standingsData.matches[matchIndex].scoreA = parseInt(scoreA);
    standingsData.matches[matchIndex].scoreB = parseInt(scoreB);
    
    // Recalculate all standings
    standingsData.teams = updateTeamStandings(standingsData.teams, standingsData.matches);
    standingsData.lastUpdated = new Date().toISOString();

    return Response.json({ 
      success: true, 
      data: standingsData,
      message: 'Match updated successfully!' 
    });

  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to update match' 
    }, { status: 500 });
  }
}

// DELETE - Remove match
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = parseFloat(searchParams.get('matchId'));

    // Remove match
    standingsData.matches = standingsData.matches.filter(match => match.id !== matchId);
    
    // Recalculate standings
    standingsData.teams = updateTeamStandings(standingsData.teams, standingsData.matches);
    standingsData.lastUpdated = new Date().toISOString();

    return Response.json({ 
      success: true, 
      data: standingsData,
      message: 'Match deleted successfully!' 
    });

  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to delete match' 
    }, { status: 500 });
  }
}