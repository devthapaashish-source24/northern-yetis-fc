"use client";
import { useState, useEffect } from "react";

export const usePlayerStats = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };
  async function addPlayerStats(player, team,matchWeek,score,cardType) {
    return submit('/api/playerStats', { player, team ,matchWeek,score,cardType},"Player Stats Recorded!");
  }
  async function submit(url, body, successMsg) {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        notify(successMsg);
      } else notify(data.error);
    } catch {
      notify("Server error");
    }
    setLoading(false);
  }

  return {
    message,
    loading,
    addPlayerStats
  };
};
