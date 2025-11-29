"use client";
import { useState } from 'react';
import { useStandings } from '../hooks/useStandings';
import Divider from './Divider';

export default function PublicMatchHistory() {
    const { getMatchHistory, isLoaded, getStandings, getStatistics } = useStandings();
     const [showFinalTable, setShowFinalTable] = useState(false);
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
  console.log(standings)
  const statistics = getStatistics();

  // Check if tournament is complete (all 12 matches played)
  const isTournamentComplete = matches.length >= 12;
  const champion = standings[0];

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="max-w-6xl px-4 mx-auto">
        <h2 className="text-3xl font-bold text-[#4A154B] text-center mb-4 font-heading">
          Match Results
        </h2>
        <Divider/>
      </div>
      {/* Tournament Final Visualization */}
      {isTournamentComplete && (
        <div className="mb-8 bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] rounded-xl p-6 text-white">
          <div className="text-center">
            <div className="mb-2 text-4xl">🏆</div>
            <h3 className="mb-2 text-2xl font-bold">TOURNAMENT COMPLETE!</h3>
            <p className="mb-4 text-lg">
              🎉 Congratulations 🎉 to <span className="text-[#D4AF37] font-bold">{champion?.name}</span> for winning the Winter League 2025!
            </p>
                <button
              onClick={() => setShowFinalTable(!showFinalTable)}
              className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-6 py-2 rounded-lg font-bold transition-colors"
            >
              {showFinalTable ? 'Hide Final Table' : 'View Final Standings'}
            </button>
          </div>
        </div>
      )}
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
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match._id || match.id} className="border-b hover:bg-gray-50"> {/* Updated key */}
                  <td className="p-3 font-semibold">Week {match.week}</td>
                  <td className="p-3">
                    <span className="font-semibold">{match.teamA}</span> vs <span className="font-semibold">{match.teamB}</span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-2xl font-bold text-[#4A154B]">
                      {match.scoreA} - {match.scoreB}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-center text-gray-600">
                    {new Date(match.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Statistics (Public) */}
      {matches.length > 0 && (
        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div>
              <div className="text-sm text-gray-600">Total Matches</div>
              <div className="text-xl font-bold text-[#4A154B]">{statistics.totalMatches}/12</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Goals</div>
              <div className="text-xl font-bold text-[#4A154B]">
                {statistics.totalGoals}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg. Goals</div>
              <div className="text-xl font-bold text-[#4A154B]">
                {statistics.averageGoals}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Leader</div>
              <div className="text-sm font-bold text-[#4A154B]">
                {statistics.leadingTeam?.name || 'TBD'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}