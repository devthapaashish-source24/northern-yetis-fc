"use client";
import { useState, useEffect } from "react";
import Divider from "./Divider";

export default function LeaderboardTabs() {
  const [tab, setTab] = useState("scorers");
  const [data, setData] = useState({ scorers: [], weekly: [], cards: [] });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/playerStats")
      .then(res => res.json())
      .then(setData)
      .catch(() => console.log("⚠ Failed to load stats"));
  }, []);

  return (
    <div className="max-w-6xl px-4 py-2 mx-auto md:px-6">

      {/* HEADER */}
      <div className="mb-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A154B] font-heading tracking-wide">
          Player Statistics Dashboard
        </h2>
        <div className="flex justify-center mt-4"><Divider/></div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 text-[15px] font-semibold">
        {[
          { id:"scorers", label:"🏆 Top Scorers" },
          { id:"weekly", label:"📅 Weekly Breakdown" },
          { id:"cards",   label:"🚨 Cards / Discipline" }
        ].map(b => (
          <button key={b.id} onClick={()=>setTab(b.id)}
            className={`px-6 py-2 rounded-full border transition shadow-sm
            ${tab===b.id
              ?"bg-[#4A154B] text-white border-[#4A154B]"
              :"bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}>
            {b.label}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Search player or team..."
          className="w-full p-3 pl-11 border rounded-lg shadow-sm focus:ring-2 
                     focus:ring-[#4A154B] text-[16px]"
          value={search}
          onChange={e => setSearch(e.target.value.toLowerCase())}
        />
        <span className="absolute left-3 top-3.5 text-gray-400 text-lg">🔍</span>
      </div>

      {/* ========================================================================== */}
      {/* 🟣 CARD 1 — TOP SCORERS */}
      {/* ========================================================================== */}
      {tab === "scorers" && (
        <div className="p-6 bg-white border border-gray-200 shadow-xl rounded-2xl">
          <h3 className="text-2xl font-extrabold text-[#4A154B] mb-6">🏆 Top Scorers</h3>

          <div className="overflow-x-auto border border-gray-200 shadow rounded-xl">
            <table className="min-w-full text-[17px] font-semibold">
              <thead className="bg-[#4A154B] text-white uppercase text-sm tracking-wider">
                <tr>
                  <th className="py-4 pl-5 text-left">Rank</th>
                  <th className="py-4 text-left">Player</th>
                  <th className="py-4 text-center">Team</th>
                  <th className="py-4 text-center text-yellow-300">Goals</th>
                </tr>
              </thead>

              <tbody>
                {data.scorers.length===0 && <tr><td colSpan={4} className="py-6 text-center">No data yet.</td></tr>}

                {data.scorers
                  .filter(p=>p._id?.toLowerCase().includes(search)||p.team?.toLowerCase().includes(search))
                  .map((p,i)=>(
                  <tr key={i}
                    className={`border-b  hover:bg-[#F5E9FF] transition text-lg cursor-pointer
                    ${i===0&&"bg- font-extrabold"}
                    ${i===1&&" font-bold"}
                    ${i===2&&" font-bold"}`}>
                    <td className="py-3 pl-5 text-[#4A154B] font-extrabold text-xl">
                      {i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}
                    </td>
                    <td className="py-3 font-bold">{p._id}</td>
                    <td className="py-3 text-center opacity-90">{p.team}</td>
                    <td className="py-3 text-2xl font-extrabold text-center text-green-600">{p.goals ?? p.totalGoals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================== */}
      {/* 🟣 CARD 2 — WEEKLY BREAKDOWN */}
      {/* ========================================================================== */}
      {tab === "weekly" && (
        <div className="p-6 bg-white border border-gray-200 shadow-xl rounded-2xl">
          <h3 className="text-2xl font-extrabold text-[#4A154B] mb-6">📅 Weekly Goal Breakdown</h3>

          <div className="overflow-x-auto border border-gray-200 shadow rounded-xl">
            <table className="min-w-full text-[16px] font-semibold">
              <thead className="bg-[#4A154B] text-white uppercase text-sm tracking-wider">
                <tr>
                  <th className="py-4 pl-5 text-left">Player</th>
                  <th className="py-4 text-center">Team</th>
                  {[1,2,3,4,5,6].map(w => <th key={w} className="py-4 text-center">W{w}</th>)}
                  <th className="py-4 text-center text-yellow-300">Total</th>
                </tr>
              </thead>

              <tbody>
                {data.weekly.length===0 && <tr><td colSpan={10} className="py-6 text-center">No weekly data.</td></tr>}

                {data.weekly
                  .filter(p=>p.player?.toLowerCase().includes(search)||p.team?.toLowerCase().includes(search))
                  .map((p,i)=>(
                  <tr key={i} className="border-b hover:bg-[#F5E9FF] transition text-lg cursor-pointer">
                    <td className="py-3 pl-5 font-bold">{i+1}. {p.player}</td>
                    <td className="text-center">{p.team}</td>
                    {[1,2,3,4,5,6].map(w=>(
                      <td key={w} className="text-xl text-center">{p.Weeks?.[`Week${w}`] ?? 0}</td>
                    ))}
                    <td className="text-xl font-extrabold text-center text-green-600">{p.totalGoals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================== */}
      {/* 🟣 CARD 3 — DISCIPLINE */}
      {/* ========================================================================== */}
      {tab === "cards" && (
        <div className="p-6 bg-white border border-gray-200 shadow-xl rounded-2xl">
          <h3 className="text-2xl font-extrabold text-[#4A154B] mb-6">🚨 Cards & Discipline Records</h3>

          <div className="overflow-x-auto border border-gray-200 shadow rounded-xl">
            <table className="min-w-full text-[16px] font-semibold">
              <thead className="bg-[#4A154B] text-white uppercase text-sm tracking-wider">
                <tr>
                  <th className="py-4 pl-5 text-left">Player</th>
                  <th className="py-4 text-center">Team</th>
                  <th className="py-4 text-center text-yellow-300">🟨</th>
                  <th className="py-4 text-center text-red-300">🟥</th>
                  <th className="py-4 text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {data.cards.length===0 && <tr><td colSpan={5} className="py-6 text-center">No discipline data.</td></tr>}

                {data.cards
                  .filter(p=>p._id?.toLowerCase().includes(search)||p.team?.toLowerCase().includes(search))
                  .map((p,i)=>(
                  <tr key={i} className="border-b hover:bg-[#F5E9FF] transition text-lg cursor-pointer">
                    <td className="py-3 pl-5 font-bold">{i+1}. {p._id}</td>
                    <td className="text-center">{p.team}</td>
                    <td className="text-xl font-extrabold text-center text-yellow-500">{p.yellow}</td>
                    <td className="text-xl font-extrabold text-center text-red-600">{p.red}</td>
                    <td className="text-center text-[19px] font-extrabold">{p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
