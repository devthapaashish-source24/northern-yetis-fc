"use client";

import { useState } from 'react';
import { useStandings } from '../hooks/useStandings';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';

export default function MatchHistory() {
  const { getMatchHistory, isLoaded, updateMatch, deleteMatch, addMatchResult, getStandings } = useStandings();
  const { isAuthenticated } = useAuth();
  const [editingMatch, setEditingMatch] = useState(null);
  const [editForm, setEditForm] = useState({ scoreA: '', scoreB: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMatch, setNewMatch] = useState({
    week: '', teamA: '', teamB: '', scoreA: '', scoreB: ''
  });
  const [message, setMessage] = useState('');
  const [showFinalTable, setShowFinalTable] = useState(false);

  const teams = ["NY Legends", "NY Alpha", "NY GenZ", "Peel"];

  const showMessage = (text, duration = 3000) => {
    setMessage(text);
    setTimeout(() => setMessage(''), duration);
  };

  if (!isLoaded) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
        </div>
      </div>
    );
  }

  const matches = getMatchHistory();
  const standings = getStandings();

  const handleEdit = (match) => {
    setEditingMatch(match);
    setEditForm({
      scoreA: match.scoreA.toString(),
      scoreB: match.scoreB.toString()
    });
  };

  const handleSaveEdit = () => {
    if (!editingMatch) return;
    updateMatch(editingMatch.id, parseInt(editForm.scoreA), parseInt(editForm.scoreB));
    setEditingMatch(null);
    setEditForm({ scoreA: '', scoreB: '' });
    showMessage('✅ Match updated successfully! Standings recalculated.');
  };

  const handleDelete = (matchId) => {
    if (confirm("Are you sure you want to delete this match?")) {
      deleteMatch(matchId);
      showMessage('🗑️ Match deleted successfully! Standings recalculated.');
    }
  };

  const handleAddMatch = (e) => {
    e.preventDefault();
    addMatchResult(
      parseInt(newMatch.week),
      newMatch.teamA,
      newMatch.teamB,
      parseInt(newMatch.scoreA),
      parseInt(newMatch.scoreB)
    );
    setNewMatch({ week: '', teamA: '', teamB: '', scoreA: '', scoreB: '' });
    setShowAddForm(false);
    showMessage('✅ New match added successfully! Standings updated.');
  };

  // Check if tournament is complete (all 12 matches played)
  const isTournamentComplete = matches.length >= 12;
  const champion = standings[0];

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      {/* Success Message */}
      {message && (
        <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50 animate-fade-in">
          <div className="flex items-center">
            <div className="mr-3 text-green-600">✓</div>
            <span className="font-semibold text-green-800">{message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#4A154B] font-heading">
          MATCH HISTORY
        </h2>
        
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 border border-green-200 rounded-lg bg-green-50">
              <span className="text-sm font-semibold text-green-800">Admin Mode</span>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              {showAddForm ? 'Cancel' : 'Add Match'}
            </button>
          </div>
        )}
      </div>

      {/* Tournament Final Visualization */}
      {isTournamentComplete && (
        <div className="mb-8 bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] rounded-xl p-6 text-white">
          <div className="text-center">
            <div className="mb-2 text-4xl">🏆</div>
            <h3 className="mb-2 text-2xl font-bold">TOURNAMENT COMPLETE!</h3>
            <p className="mb-4 text-lg">
              Congratulations to <span className="text-[#D4AF37] font-bold">{champion?.name}</span> for winning the Winter League 2025!
            </p>
            <button
              onClick={() => setShowFinalTable(!showFinalTable)}
              className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-6 py-2 rounded-lg font-bold transition-colors"
            >
              {showFinalTable ? 'Hide Final Table' : 'View Final Standings'}
            </button>
          </div>

          {showFinalTable && (
            <div className="p-6 mt-6 text-gray-800 bg-white rounded-lg">
              <h4 className="text-xl font-bold text-center mb-4 text-[#4A154B]">FINAL STANDINGS</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {standings.map((team, index) => (
                  <div 
                    key={team.id}
                    className={`p-4 rounded-lg border-2 text-center ${
                      index === 0 
                        ? 'bg-yellow-100 border-yellow-400' 
                        : index === 1
                        ? 'bg-gray-100 border-gray-300'
                        : index === 2
                        ? 'bg-orange-100 border-orange-300'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="mb-2 text-2xl font-bold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </div>
                    <div className="mb-1 text-lg font-bold">{team.name}</div>
                    <div className="text-sm text-gray-600">{team.points} pts</div>
                    <div className="text-xs text-gray-500">
                      {team.won}W {team.drawn}D {team.lost}L
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Champion Details */}
              {champion && (
                <div className="mt-6 p-4 bg-gradient-to-r from-[#D4AF37] to-[#F0C350] rounded-lg text-center">
                  <div className="mb-2 text-3xl">👑 CHAMPIONS 👑</div>
                  <div className="text-2xl font-bold text-[#4A154B] mb-2">{champion.name}</div>
                  <div className="text-lg text-[#4A154B]">
                    {champion.points} Points • {champion.won} Wins • GD: +{champion.goalDifference}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Admin Login (Public can see login button) */}
      {!isAuthenticated && (
        <div className="mb-6">
          <AdminLogin />
        </div>
      )}

      {/* Add Match Form (Admin Only) */}
      {showAddForm && isAuthenticated && (
        <div className="p-6 mb-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-[#4A154B] mb-4">Add New Match</h3>
          <form onSubmit={handleAddMatch} className="grid gap-4 md:grid-cols-5">
            <select
              value={newMatch.week}
              onChange={(e) => setNewMatch({...newMatch, week: e.target.value})}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B]"
            >
              <option value="">Week</option>
              {[1,2,3,4,5,6].map(w => <option key={w} value={w}>Week {w}</option>)}
            </select>

            <select
              value={newMatch.teamA}
              onChange={(e) => setNewMatch({...newMatch, teamA: e.target.value})}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B]"
            >
              <option value="">Team A</option>
              {teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <input
              type="number"
              value={newMatch.scoreA}
              onChange={(e) => setNewMatch({...newMatch, scoreA: e.target.value})}
              required
              min="0"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B]"
              placeholder="Score A"
            />

            <select
              value={newMatch.teamB}
              onChange={(e) => setNewMatch({...newMatch, teamB: e.target.value})}
              required
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B]"
            >
              <option value="">Team B</option>
              {teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <input
              type="number"
              value={newMatch.scoreB}
              onChange={(e) => setNewMatch({...newMatch, scoreB: e.target.value})}
              required
              min="0"
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B]"
              placeholder="Score B"
            />

            <div className="flex justify-end gap-4 md:col-span-5">
              <button
                type="submit"
                className="bg-[#4A154B] hover:bg-[#3A0E3A] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Add Match
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Match History Table (Public - Everyone can see) */}
      {matches.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <div className="mb-4 text-6xl">⚽</div>
          <p className="text-lg">No matches played yet</p>
          <p className="mt-2 text-sm">Match results will appear here after games are completed</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#4A154B] text-white">
                <th className="p-3 font-semibold text-left">Week</th>
                <th className="p-3 font-semibold text-left">Match</th>
                <th className="p-3 font-semibold text-center">Score</th>
                <th className="p-3 font-semibold text-center">Date</th>
                {/* Actions column only shows for admins */}
                {isAuthenticated && (
                  <th className="p-3 font-semibold text-center">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">Week {match.week}</td>
                  <td className="p-3">
                    <span className="font-semibold">{match.teamA}</span> vs <span className="font-semibold">{match.teamB}</span>
                  </td>
                  
                  <td className="p-3 text-center">
                    {editingMatch?.id === match.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          value={editForm.scoreA}
                          onChange={(e) => setEditForm({...editForm, scoreA: e.target.value})}
                          className="w-12 p-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-[#4A154B]"
                          min="0"
                        />
                        <span className="font-bold">-</span>
                        <input
                          type="number"
                          value={editForm.scoreB}
                          onChange={(e) => setEditForm({...editForm, scoreB: e.target.value})}
                          className="w-12 p-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-[#4A154B]"
                          min="0"
                        />
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-[#4A154B]">
                        {match.scoreA} - {match.scoreB}
                      </span>
                    )}
                  </td>
                  
                  <td className="p-3 text-sm text-center text-gray-600">
                    {new Date(match.timestamp).toLocaleDateString()}
                  </td>
                  
                  {/* Actions cells only show for admins */}
                  {isAuthenticated && (
                    <td className="p-3 text-center">
                      {editingMatch?.id === match.id ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingMatch(null)}
                            className="px-3 py-1 text-sm text-white transition-colors bg-gray-500 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(match)}
                            className="px-3 py-1 text-sm text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(match.id)}
                            className="px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Statistics (Public - Everyone can see) */}
      {matches.length > 0 && (
        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div>
              <div className="text-sm text-gray-600">Total Matches</div>
              <div className="text-xl font-bold text-[#4A154B]">{matches.length}/12</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Goals</div>
              <div className="text-xl font-bold text-[#4A154B]">
                {matches.reduce((sum, match) => sum + match.scoreA + match.scoreB, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg. Goals</div>
              <div className="text-xl font-bold text-[#4A154B]">
                {(matches.reduce((sum, match) => sum + match.scoreA + match.scoreB, 0) / matches.length).toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Leader</div>
              <div className="text-sm font-bold text-[#4A154B]">
                {standings[0]?.name || 'TBD'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}