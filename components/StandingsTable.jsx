"use client";
import { useStandings } from '../hooks/useStandings';
import Divider from './Divider';
export default function StandingsTable() {
  const { getStandings, getStatistics } = useStandings();
  const standings = getStandings();
  const stats = getStatistics();

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-[#4A154B] mb-4 text-center font-heading">
        LEAGUE STANDINGS
      </h2>
    <Divider/>
      {/* Statistics Bar */}
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
        <div className="p-3 text-center rounded-lg bg-gray-50">
          <div className="text-sm text-gray-600">Total Matches</div>
          <div className="text-xl font-bold text-[#4A154B]">{stats.totalMatches}</div>
        </div>
        <div className="p-3 text-center rounded-lg bg-gray-50">
          <div className="text-sm text-gray-600">Total Goals</div>
          <div className="text-xl font-bold text-[#4A154B]">{stats.totalGoals}</div>
        </div>
        <div className="p-3 text-center rounded-lg bg-gray-50">
          <div className="text-sm text-gray-600">Avg. Goals</div>
          <div className="text-xl font-bold text-[#4A154B]">{stats.averageGoals}</div>
        </div>
        <div className="p-3 text-center rounded-lg bg-gray-50">
          <div className="text-sm text-gray-600">Leader</div>
          <div className="text-lg font-bold text-[#4A154B]">{stats.leadingTeam?.name}</div>
        </div>
      </div>

      {/* Premier League Style Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#4A154B] text-white">
              <th className="p-3 font-semibold text-left">POS</th>
              <th className="p-3 font-semibold text-left">TEAM</th>
              <th className="p-3 font-semibold text-center">PL</th>
              <th className="p-3 font-semibold text-center">W</th>
              <th className="p-3 font-semibold text-center">D</th>
              <th className="p-3 font-semibold text-center">L</th>
              <th className="p-3 font-semibold text-center">GF</th>
              <th className="p-3 font-semibold text-center">GA</th>
              <th className="p-3 font-semibold text-center">GD</th>
              <th className="p-3 font-semibold text-center">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr 
                key={team.id} 
                className={`border-b hover:bg-gray-50 ${
                  index < 2 ? 'bg-green-50' : index === standings.length - 1 ? 'bg-red-50' : ''
                }`}
              >
                <td className="p-3 font-bold">{team.position}</td>
                <td className="p-3 font-semibold">{team.name}</td>
                <td className="p-3 text-center">{team.played}</td>
                <td className="p-3 font-semibold text-center text-green-600">{team.won}</td>
                <td className="p-3 text-center text-yellow-600">{team.drawn}</td>
                <td className="p-3 text-center text-red-600">{team.lost}</td>
                <td className="p-3 text-center">{team.goalsFor}</td>
                <td className="p-3 text-center">{team.goalsAgainst}</td>
                <td className={`p-3 text-center font-semibold ${
                  team.goalDifference > 0 ? 'text-green-600' : team.goalDifference < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                </td>
                <td className="p-3 text-center font-bold text-[#4A154B]">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-green-100 border border-green-500"></div>
          Top Positions
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-red-100 border border-red-500"></div>
          Bottom Position
        </div>
      </div>
    </div>
  );
}