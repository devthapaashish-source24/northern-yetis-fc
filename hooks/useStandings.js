"use client";
import { useState, useEffect } from 'react';

export const useStandings = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load data from API
useEffect(() => {
  const loadData = async () => {
    try {
      console.log('🔄 FETCHING DATA FROM API...');
      const response = await fetch('/api/standings');
      const data = await response.json();
      console.log('📥 FULL API RESPONSE:', data);
      
      if (data.success) {
        console.log('✅ API SUCCESS - Teams:', data.data.teams);
        console.log('✅ API SUCCESS - Matches:', data.data.matches);
        setTeams(data.data.teams);
        setMatches(data.data.matches);
      } else {
        console.error('❌ API ERROR:', data.error);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('❌ NETWORK ERROR:', error);
      setIsLoaded(true);
    }
  };
  loadData();
}, []);

  // Show temporary message
  const showMessage = (text, duration = 3000) => {
    setMessage(text);
    setTimeout(() => setMessage(''), duration);
  };

  // Add match result - UPDATED response structure
 const addMatchResult = async (week, teamA, teamB, scoreA, scoreB) => {
  setLoading(true);
  try {
    console.log('📤 SENDING DATA:', { week, teamA, teamB, scoreA, scoreB });
    console.log('📤 DATA TYPES:', {
      week: typeof week,
      teamA: typeof teamA, 
      teamB: typeof teamB,
      scoreA: typeof scoreA,
      scoreB: typeof scoreB
    });
    
    const response = await fetch('/api/standings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ week, teamA, teamB, scoreA, scoreB })
    });
    
    const result = await response.json();
    console.log('📥 API RESPONSE:', result);
    
    if (result.success) {
      setTeams(result.data.teams);
      setMatches(result.data.matches);
      showMessage('✅ Match added successfully!');
    } else {
      showMessage('❌ Failed to add match: ' + result.error);
    }
  } catch (error) {
    console.error('❌ NETWORK ERROR:', error);
    showMessage('❌ Error adding match');
  } finally {
    setLoading(false);
  }
};

  // Update match - NEEDS TO BE ADDED to API route
  const updateMatch = async (matchId, scoreA, scoreB) => {
    setLoading(true);
    try {
      const response = await fetch('/api/standings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, scoreA, scoreB })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTeams(result.data.teams);
        setMatches(result.data.matches);
        showMessage('✅ Match updated successfully!');
      } else {
        showMessage('❌ Failed to update match: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating match:', error);
      showMessage('❌ Error updating match');
    } finally {
      setLoading(false);
    }
  };

  // Delete match - NEEDS TO BE ADDED to API route
  const deleteMatch = async (matchId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/standings?matchId=${matchId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTeams(result.data.teams);
        setMatches(result.data.matches);
        showMessage('🗑️ Match deleted successfully!');
      } else {
        showMessage('❌ Failed to delete match: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting match:', error);
      showMessage('❌ Error deleting match');
    } finally {
      setLoading(false);
    }
  };

  // Reset all data - You can remove this or keep for admin
  const resetStandings = async () => {
    setLoading(true);
    try {
      showMessage('🔄 Reset feature coming soon...');
      // We'll implement this later with proper admin controls
    } catch (error) {
      console.error('Error resetting standings:', error);
      showMessage('❌ Error resetting data');
    } finally {
      setLoading(false);
    }
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

  return {
    teams,
    matches,
    isLoaded,
    loading,
    message,
    addMatchResult,
    updateMatch,
    deleteMatch,
    getStandings,
    getMatchHistory,
    getStatistics,
    resetStandings,
    showMessage
  };
};