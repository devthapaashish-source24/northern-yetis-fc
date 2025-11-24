// data/standingsData.js

// This acts as our "shared database"
let standingsData = {
  teams: [
    { id: 1, name: "NY Legends", short: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { id: 2, name: "NY Alpha", short: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { id: 3, name: "NY GenZ", short: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    { id: 4, name: "Peel", short: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
  ],
  matches: [],
  lastUpdated: new Date().toISOString()
};
console.log('data',standingsData)

// Load data from localStorage (fallback for existing users)
export const loadData = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('nyfc_standings');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        standingsData = { ...standingsData, ...data };
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  }
  return standingsData;
};

// Save data to both our shared data and localStorage
export const saveData = (data) => {
  standingsData = {
    ...data,
    lastUpdated: new Date().toISOString()
  };
  
  // Also save to localStorage for backward compatibility
  if (typeof window !== 'undefined') {
    localStorage.setItem('nyfc_standings', JSON.stringify(standingsData));
  }
  
  return standingsData;
};

// CRUD Operations
export const addMatch = (matchData) => {
  const newMatch = {
    id: Date.now() + Math.random(),
    ...matchData,
    timestamp: new Date().toISOString()
  };
  
  standingsData.matches.push(newMatch);
  saveData(standingsData);
  return newMatch;
};

export const updateMatch = (matchId, updates) => {
  const matchIndex = standingsData.matches.findIndex(match => match.id === matchId);
  if (matchIndex !== -1) {
    standingsData.matches[matchIndex] = {
      ...standingsData.matches[matchIndex],
      ...updates
    };
    saveData(standingsData);
    return standingsData.matches[matchIndex];
  }
  return null;
};

export const deleteMatch = (matchId) => {
  standingsData.matches = standingsData.matches.filter(match => match.id !== matchId);
  saveData(standingsData);
  return true;
};

export const updateTeams = (teams) => {
  standingsData.teams = teams;
  saveData(standingsData);
  return teams;
};

export const resetData = () => {
  standingsData = {
    teams: [
      { id: 1, name: "NY Legends", short: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 2, name: "NY Alpha", short: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 3, name: "NY GenZ", short: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 4, name: "Peel F.C.", short: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
    ],
    matches: [],
    lastUpdated: new Date().toISOString()
  };
  saveData(standingsData);
  return standingsData;
};

// Get current data
export const getCurrentData = () => {
  return standingsData;
};