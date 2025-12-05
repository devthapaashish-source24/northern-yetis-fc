"use client";
import { useState } from "react";
import { usePlayerStats } from "../hooks/usePlayerStats";
import { TEAMS, PLAYERS } from "../lib/players";

export default function AdminStatsPage() {
  const { addPlayerStats, message, loading } = usePlayerStats();
const [playerStats,setplayerStats] = useState({player:'',team:'',score:'',matchWeek:'',cardType:"none"})
  const submit = async () => {
    // if (!player || !team) return alert("Enter player + team!");
    // alert([player, team, matchWeek, score, cardType])
    await addPlayerStats(playerStats.player,playerStats.team,playerStats.matchWeek,playerStats.score,playerStats.cardType);
    setplayerStats({player:'',team:'',score:'',matchWeek:'',cardType:"none"});
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-10 mb-6 bg-gray-100 md:px-10">
      <div className="w-full max-w-xl bg-white shadow-[0_0_30px_rgba(0,0,0,0.07)] rounded-2xl p-7">

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A154B] text-center mb-6">
          Admin Match Stats Entry
        </h1>

        {message && (
          <div className="p-3 mb-6 font-semibold text-center text-green-700 bg-green-100 border border-green-300 rounded-lg">
            {message}
          </div>
        )}

        <div className="space-y-5">

          {/* PLAYER SELECT */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Player</label>
            <select
              value={playerStats.player}
              onChange={e => setplayerStats({...playerStats,player:e.target.value})}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4A154B]"
            >
              <option value="">Select Player</option>
              {PLAYERS.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* TEAM SELECT */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Team</label>
            <select
              value={playerStats.team}
              onChange={(e) => setplayerStats({...playerStats,team:e.target.value})}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4A154B]"
            >
              <option value="">Select Team</option>
              {TEAMS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* WEEK */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Match Week</label>
            <select
              value={playerStats.matchWeek}
              onChange={(e) => setplayerStats({...playerStats,matchWeek:e.target.value})}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4A154B]"
              disabled={loading}
            >
              <option value="">Select Week</option>
              {[1,2,3,4,5,6].map(w => (
                <option key={w} value={w}>Week {w}</option>
              ))}
            </select>
          </div>

          {/* SCORE */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Goals Scored</label>
            <input
              type="number"
              value={playerStats.score}
              onChange={(e)=>setplayerStats({...playerStats,score:e.target.value})}
              min="0"
              required
              disabled={loading}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4A154B]"
              placeholder="Enter goals scored"
            />
          </div>

          {/* CARDS */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Card Type</label>
            <select
              value={playerStats.cardType}
              onChange={e => setplayerStats({...playerStats,cardType:e.target.value})}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4A154B]"
            >
              <option value="none">No Card</option>
              <option value="yellow">Yellow Card</option>
              <option value="red">Red Card</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full p-3 mt-2 bg-[#4A154B] text-white text-lg font-semibold rounded-lg 
            hover:bg-[#3A0E3A] disabled:opacity-50 transition-all"
          >
            {loading ? "Saving..." : "Submit"}
          </button>

        </div>
      </div>
    </div>
  );
}
