"use client";

import { useState, useEffect } from 'react';
import { 
  loadData, 
  saveData, 
  addMatch, 
  updateMatch, 
  deleteMatch, 
  updateTeams,
  resetData,
  getCurrentData 
} from '../localDB/standingsData'

export const useStandings = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const data = loadData();
    setTeams(data.teams);
    setMatches(data.matches);
    setIsLoaded(true);
  }, []);

  // Update local state when data changes
  const refreshData = () => {
    const data = getCurrentData();
    setTeams(data.teams);
    setMatches(data.matches);
  };

  // Add match result
  const addMatchResult = (week, teamA, teamB, scoreA, scoreB) => {
    const newMatch = addMatch({
      week,
      teamA,
      teamB,
      scoreA: parseInt(scoreA),
      scoreB: parseInt(scoreB)
    });
    
    refreshData();
    updateTeamStandings(teamA, teamB, scoreA, scoreB);
    
    return newMatch;
  };

  // Update team standings
  const updateTeamStandings = (teamAName, teamBName, scoreA, scoreB) => {
    const updatedTeams = teams.map(team => {
      if (team.name === teamAName) {
        return updateSingleTeam(team, scoreA, scoreB, scoreA > scoreB, scoreA === scoreB);
      }
      if (team.name === teamBName) {
        return updateSingleTeam(team, scoreB, scoreA, scoreB > scoreA, scoreA === scoreB);
      }
      return team;
    });
    
    setTeams(updatedTeams);
    updateTeams(updatedTeams);
  };

  // Helper to update single team stats
  const updateSingleTeam = (team, goalsFor, goalsAgainst, isWin, isDraw) => {
    const updated = { ...team };
    updated.played++;
    updated.goalsFor += goalsFor;
    updated.goalsAgainst += goalsAgainst;

    if (isWin) {
      updated.won++;
      updated.points += 3;
    } else if (isDraw) {
      updated.drawn++;
      updated.points += 1;
    } else {
      updated.lost++;
    }

    return updated;
  };

  // Update existing match
  const handleUpdateMatch = (matchId, newScoreA, newScoreB) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    // Reset teams and recalculate all matches
    const initialTeams = [
      { id: 1, name: "NY Legends", short: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 2, name: "NY Alpha", short: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 3, name: "NY GenZ", short: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 4, name: "Peel", short: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
    ];

    // Update the match
    updateMatch(matchId, { 
      scoreA: parseInt(newScoreA), 
      scoreB: parseInt(newScoreB) 
    });

    // Recalculate all standings
    const updatedMatches = matches.map(m => 
      m.id === matchId 
        ? { ...m, scoreA: parseInt(newScoreA), scoreB: parseInt(newScoreB) }
        : m
    );

    let recalculatedTeams = [...initialTeams];
    updatedMatches.forEach(match => {
      recalculatedTeams = recalculatedTeams.map(team => {
        if (team.name === match.teamA) {
          return updateSingleTeam(team, match.scoreA, match.scoreB, match.scoreA > match.scoreB, match.scoreA === match.scoreB);
        }
        if (team.name === match.teamB) {
          return updateSingleTeam(team, match.scoreB, match.scoreA, match.scoreB > match.scoreA, match.scoreA === match.scoreB);
        }
        return team;
      });
    });

    setTeams(recalculatedTeams);
    updateTeams(recalculatedTeams);
    refreshData();
  };

  // Delete match
  const handleDeleteMatch = (matchId) => {
    deleteMatch(matchId);
    
    // Recalculate standings without the deleted match
    const remainingMatches = matches.filter(m => m.id !== matchId);
    
    const initialTeams = [
      { id: 1, name: "NY Legends", short: "LEG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 2, name: "NY Alpha", short: "ALP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 3, name: "NY GenZ", short: "GEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
      { id: 4, name: "Peel F.C.", short: "PEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
    ];

    let recalculatedTeams = [...initialTeams];
    remainingMatches.forEach(match => {
      recalculatedTeams = recalculatedTeams.map(team => {
        if (team.name === match.teamA) {
          return updateSingleTeam(team, match.scoreA, match.scoreB, match.scoreA > match.scoreB, match.scoreA === match.scoreB);
        }
        if (team.name === match.teamB) {
          return updateSingleTeam(team, match.scoreB, match.scoreA, match.scoreB > match.scoreA, match.scoreA === match.scoreB);
        }
        return team;
      });
    });

    setTeams(recalculatedTeams);
    updateTeams(recalculatedTeams);
    refreshData();
  };

  // Get sorted standings
  const getStandings = () => {
    return teams
      .map(team => ({
        ...team,
        goalDifference: team.goalsFor - team.goalsAgainst
      }))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      })
      .map((team, index) => ({
        position: index + 1,
        ...team
      }));
  };

  // Get match history
  const getMatchHistory = () => {
    return [...matches].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  // Get statistics
  const getStatistics = () => {
    const currentStandings = getStandings();
    const totalMatches = matches.length;
    const totalGoals = teams.reduce((sum, team) => sum + team.goalsFor, 0);
    
    return {
      totalMatches,
      totalGoals,
      averageGoals: totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : 0,
      leadingTeam: currentStandings[0],
      mostGoals: teams.reduce((max, team) => team.goalsFor > max.goalsFor ? team : max, teams[0]),
      bestDefense: teams.reduce((min, team) => team.goalsAgainst < min.goalsAgainst ? team : min, teams[0]),
      isLoaded
    };
  };

  // Reset all data
  const handleResetStandings = () => {
    resetData();
    refreshData();
  };

  return {
    teams,
    matches,
    isLoaded,
    addMatchResult,
    updateMatch: handleUpdateMatch,
    deleteMatch: handleDeleteMatch,
    getStandings,
    getMatchHistory,
    getStatistics,
    resetStandings: handleResetStandings
  };
};