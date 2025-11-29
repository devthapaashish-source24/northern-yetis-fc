"use client";
import { useState } from 'react';
import { useStandings } from '../hooks/useStandings';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';

export default function MatchHistory() {
  // Hook states - handles API calls and loading
  const { 
    getMatchHistory, 
    isLoaded, 
    updateMatch, 
    deleteMatch, 
    addMatchResult, 
    getStandings,
    loading,
    showMessage,
    message 
  } = useStandings();
  
  const { isAuthenticated } = useAuth();
  
  // Local component states
  const [editingMatch, setEditingMatch] = useState(null);
  const [editForm, setEditForm] = useState({ scoreA: '', scoreB: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMatch, setNewMatch] = useState({
    week: '', teamA: '', teamB: '', scoreA: '', scoreB: ''
  });
  const [showFinalTable, setShowFinalTable] = useState(false);

  const teams = ["NY Legends", "NY Alpha", "NY GenZ", "Peel F.C."];

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

  // Match editing handlers
  const handleEdit = (match) => {
    setEditingMatch(match);
    setEditForm({
      scoreA: match.scoreA.toString(),
      scoreB: match.scoreB.toString()
    });
  };

  const handleSaveEdit = () => {
    if (!editingMatch) return;
    updateMatch(editingMatch._id, parseInt(editForm.scoreA), parseInt(editForm.scoreB));
    setEditingMatch(null);
    setEditForm({ scoreA: '', scoreB: '' });
  };

  const handleDelete = (matchId) => {
    if (confirm("Are you sure you want to delete this match?")) {
      deleteMatch(matchId);
    }
  };

  // Add new match handler - connects to MongoDB via hook
const handleAddMatch = (e) => {
  e.preventDefault();
  
  // ✅ Frontend validation
  if (newMatch.teamA === newMatch.teamB) {
    showMessage('❌ Teams cannot play against themselves');
    return;
  }

  if (newMatch.scoreA < 0 || newMatch.scoreB < 0) {
    showMessage('❌ Scores cannot be negative');
    return;
  }

  // Proceed with API call
  addMatchResult(
    parseInt(newMatch.week),
    newMatch.teamA,
    newMatch.teamB,
    parseInt(newMatch.scoreA),
    parseInt(newMatch.scoreB)
  );
  setNewMatch({ week: '', teamA: '', teamB: '', scoreA: '', scoreB: '' });
  setShowAddForm(false);
};

  // Tournament completion check
  const isTournamentComplete = matches.length >= 12;
  const champion = standings[0];

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#4A154B] font-heading">
            ADMIN PANEL - MATCH MANAGEMENT
          </h2>
        </div>
        <AdminLogin />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      {/* Success message from API operations */}
      {message && (
        <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50 animate-fade-in">
          <div className="flex items-center">
            {/* <div className="mr-3 text-green-600">✓</div> */}
            <span className="font-semibold text-green-800">{message}</span>
          </div>
        </div>
      )}

      {/* Header with admin controls */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#4A154B] font-heading">
          MATCH HISTORY - ADMIN
        </h2>
        
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 border border-green-200 rounded-lg bg-green-50">
            <span className="text-sm font-semibold text-green-800">Admin Mode</span>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            disabled={loading}
            className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {showAddForm ? 'Cancel' : 'Add Match'}
          </button>
        </div>
      </div>

      {/* Tournament completion banner */}
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

          {/* Final standings display */}
          {showFinalTable && (
            <div className="p-6 mt-6 text-gray-800 bg-white rounded-lg">
              <h4 className="text-xl font-bold text-center mb-4 text-[#4A154B]">FINAL STANDINGS</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {standings.map((team, index) => (
                  <div 
                    key={team.id}
                    className={`p-4 rounded-lg border-2 text-center ${
                      index === 0 ? 'bg-yellow-100 border-yellow-400' : 
                      index === 1 ? 'bg-gray-100 border-gray-300' :
                      index === 2 ? 'bg-orange-100 border-orange-300' : 
                      'bg-white border-gray-200'
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
              
              {/* Champion details */}
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

      {/* Add match form - Data goes to MongoDB via API */}
      {showAddForm && (
        <div className="p-6 mb-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-[#4A154B] mb-4">Add New Match</h3>
          <form onSubmit={handleAddMatch} className="grid gap-4 md:grid-cols-5">
            <select
              value={newMatch.week}
              onChange={(e) => setNewMatch({...newMatch, week: e.target.value})}
              required
              disabled={loading}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] disabled:opacity-50"
            >
              <option value="">Week</option>
              {[1,2,3,4,5,6].map(w => <option key={w} value={w}>Week {w}</option>)}
            </select>

            <select
              value={newMatch.teamA}
              onChange={(e) => setNewMatch({...newMatch, teamA: e.target.value})}
              required
              disabled={loading}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] disabled:opacity-50"
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
              disabled={loading}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] disabled:opacity-50"
              placeholder="Score A"
            />

            <select
              value={newMatch.teamB}
              onChange={(e) => setNewMatch({...newMatch, teamB: e.target.value})}
              required
              disabled={loading}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] disabled:opacity-50"
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
              disabled={loading}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] disabled:opacity-50"
              placeholder="Score B"
            />

            <div className="flex justify-end gap-4 md:col-span-5">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4A154B] hover:bg-[#3A0E3A] text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Match'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Match history table - Data fetched from MongoDB */}
      {matches.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <div className="mb-4 text-6xl">⚽</div>
          <p className="text-lg">No matches played yet</p>
          <p className="mt-2 text-sm">Add matches using the button above</p>
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
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match._id} className="border-b hover:bg-gray-50"> {/* Use _id from MongoDB */}
                  <td className="p-3 font-semibold">Week {match.week}</td>
                  <td className="p-3">
                    <span className="font-semibold">{match.teamA}</span> vs <span className="font-semibold">{match.teamB}</span>
                  </td>
                  
                  <td className="p-3 text-center">
                    {
                      editingMatch?._id === match._id ? ( <div className="flex items-center justify-center gap-2">
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
                    )
                    }
                  </td>
                  
                  <td className="p-3 text-sm text-center text-gray-600">
                    {new Date(match.timestamp).toLocaleDateString()}
                  </td>
                  
                  <td className="p-3 text-center">
                    {editingMatch?._id === match._id ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={handleSaveEdit}
                          disabled={loading}
                          className="px-3 py-1 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
                        >
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingMatch(null)}
                          disabled={loading}
                          className="px-3 py-1 text-sm text-white transition-colors bg-gray-500 rounded hover:bg-gray-600 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(match)}
                          disabled={loading}
                          className="px-3 py-1 text-sm text-white transition-colors bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(match._id)} 
                          disabled={loading}
                          className="px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}