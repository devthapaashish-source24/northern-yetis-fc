import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ================== GET — FULL AGGREGATED STATS ==================
export async function GET() {
  const { default: clientPromise } = await import("../../../lib/mongodb");
  const client = await clientPromise;
  const db = client.db("northern-yetis-fc");
  const stats = db.collection("goals");

  // ░ TOP SCORERS TOTAL░
  const scorers = await stats.aggregate([
    { $group: {
        _id: "$player",
        team: { $first: "$team" },
        totalGoals: { $sum: "$score" }
    }},
    { $sort: { totalGoals: -1 }}
  ]).toArray();

  // ░ WEEKLY BREAKDOWN░
  const weekly = await stats.aggregate([
    { $group: {
      _id: { player:"$player", week:"$matchWeek" },
      team: { $first:"$team" },
      goals: { $sum:"$score" }
    }},
    { $sort: { "_id.player":1, "_id.week":1 }}
  ]).toArray();

  // restructure into table format:
  const weeklyTable = {};
  weekly.forEach(r=>{
    if(!weeklyTable[r._id.player]) weeklyTable[r._id.player]={player:r._id.player,team:r.team,Weeks:{}};
    weeklyTable[r._id.player].Weeks[`Week${r._id.week}`]=r.goals;
  });

  // convert to array + append totals
  const weeklyArr = Object.values(weeklyTable).map(p=>{
    const total = Object.values(p.Weeks).reduce((a,b)=>a+b,0);
    return {...p,totalGoals:total};
  }).sort((a,b)=>b.totalGoals-a.totalGoals);

  // ░ CARDS / DISCIPLINE░
  const cards = await stats.aggregate([
    { $match: { cardType: { $in:["yellow","red"] }}},
    { $group:{
        _id:"$player",
        team:{ $first:"$team" },
        yellow:{ $sum:{ $cond:[{ $eq:["$cardType","yellow"]},1,0] }},
        red:{ $sum:{ $cond:[{ $eq:["$cardType","red"]},1,0] }},
        total:{ $sum:1 }
    }},
    { $sort:{ total:-1, red:-1, yellow:-1 }}
  ]).toArray();

  return NextResponse.json({ success:true, scorers, weekly:weeklyArr, cards });
}


// POST: admin – record a goal
export async function POST(req) {
  const body = await req.json();
  const { player, team, matchWeek,score,cardType } = body;

  if (!player || !team || !matchWeek) {
    return NextResponse.json(
      { success: false, error: "player, team, matchWeek are required" },
      { status: 400 }
    );
  }
  console.log('apiData: ',[player,team,matchWeek,score,cardType])

  const { default: clientPromise } = await import("../../../lib/mongodb");
  const client = await clientPromise;
  const db = client.db("northern-yetis-fc");

  await db.collection("goals").insertOne({
    player,
    team,
    matchWeek:Number(matchWeek),
    score:Number(score),
    cardType,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, message: "Player Stats Recorded" });
}
