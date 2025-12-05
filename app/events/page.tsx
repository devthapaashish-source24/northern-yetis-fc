import VenueDirections from '../../components/VenueDirections'
import Divider from '../../components/Divider'
import DownloadSchedule from'../../components/DownloadSchedule'
import StandingsTable from'../../components/StandingsTable'
import PublicMatchInfo from '../../components/PublicMatchInfo'
import LeaderboardTabs from '../../components/LeaderboardTabs'
export default function EventsPage() {
  const teams = [
    {
      name: "NY Legends",
      players: [
        "Saujan Gurung (GK)", "Prakash Nepal", "Niraj Kandel", 
        "Bishal Shrestha", "Sunil Shrestha", "Yogendra Lamichhane", 
        "Govinda Shrestha", "Ritesh Mahato"
      ]
    },
    {
      name: "NY Alpha", 
      players: [
        "Mohit Gurung (GK)", "Bishal Ghimire", "Nabin Gurung",
        "Lachuman Jaisi", "Ashish Thapa", "Atit Gurung", "Bhupinder Singh"
      ]
    },
    {
      name: "NY GenZ",
      players: [
        "Birat (GK)", "Jimmy Ghimery", "Max Gurung", "Eugene Gurung",
        "Alvin Poudel", "Ram Papane", "Nisham Thajali", "Himesh Shahi"
      ]
    },
    {
      name: "Peel F.C.",
      players: ["Niraj Lama","Spandan Bhattarai","Shubham Pandit",
        "Raj Shrestha","Sonam Gurung","Suman Gurung","Bobin Furung","Keeran Bhatta","Ronish Makaju",]
    }
  ];

  const schedule = [
    { week: "Week 1", date: "Nov 30, 2025", games: [
      { time: "6-7 AM", match: "NY Legends Vs NY GenZ" },
      { time: "7-8 AM", match: "NY Alpha Vs Peel F.C." }
    ]},
    { week: "Week 2", date: "Dec 07, 2025", games: [
      { time: "6-7 AM", match: "NY Legends Vs Peel F.C." },
      { time: "7-8 AM", match: "NY Alpha Vs NY GenZ" }
    ]},
    { week: "Week 3", date: "Dec 14, 2025", games: [
      { time: "6-7 AM", match: "NY Legends Vs NY Alpha" },
      { time: "7-8 AM", match: "NY GenZ Vs Peel F.C." }
    ]},
    { week: "Week 4", date: "Dec 21, 2025", games: [
      { time: "6-7 AM", match: "NY Alpha Vs Peel F.C." },
      { time: "7-8 AM", match: "NY Legends Vs NY GenZ" }
    ]},
    { week: "Week 5", date: "Dec 28, 2025", games: [
      { time: "6-7 AM", match: "NY Alpha Vs NY GenZ" },
      { time: "7-8 AM", match: "NY Legends Vs Peel F.C." }
    ]},
    { week: "Week 6", date: "Jan 4, 2025", games: [
      { time: "6-7 AM", match: "NY GenZ Vs Peel F.C." },
      { time: "7-8 AM", match: "NY Legends Vs NY Alpha" }
    ]}
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white py-20">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl font-heading">
            WINTER <span className="text-[#D4AF37]">LEAGUE 2025</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl">
            Northern Yetis FC Indoor Soccer Tournament
          </p>
          <div className="mt-6 bg-[#D4AF37] text-[#4A154B] inline-block px-6 py-2 rounded-full font-bold">
            Nov 30, 2025 - Jan 4, 2025
          </div>
        </div>
      </section>

      {/* Tournament Schedule */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-[#4A154B] text-center mb-4 font-heading">
            TOURNAMENT SCHEDULE
          </h2>
            <Divider/> 
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schedule.map((week, index) => (
              <div key={index} className="p-6 border border-gray-200 bg-gray-50 rounded-xl">
                <div className="mb-4 text-center">
                  <h3 className="text-xl font-bold text-[#4A154B]">{week.week}</h3>
                  <p className="text-gray-600">{week.date}</p>
                </div>
                
                <div className="space-y-4">
                  {week.games.map((game, gameIndex) => (
                    <div key={gameIndex} className="p-4 bg-white border border-gray-300 rounded-lg">
                      <div className="mb-1 text-sm text-gray-500">{game.time}</div>
                      <div className="font-semibold text-gray-900">{game.match}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/* 3. Live Standings Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto">
          <StandingsTable />
        </div>
      </section>
        {/* 3. Match Results Table */}
         <section className="py-16 bg-gray-50">
        <PublicMatchInfo/>
      </section>
      {/* 4. scorers, cards Table */}
      <section className="py-16 bg-gray-50">
        <LeaderboardTabs />
      </section>
      {/* Participating Teams */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-[#4A154B] text-center mb-4 font-heading">
            PARTICIPATING TEAMS
          </h2>
          <Divider/>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teams.map((team, index) => (
              <div key={index} className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                <h3 className="text-xl font-bold text-[#4A154B] mb-4 text-center">{team.name}</h3>
                
                <div className="space-y-2">
                  {team.players.map((player, playerIndex) => (
                    <div key={playerIndex} className="flex items-center py-1">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">{player}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-[#4A154B] text-center mb-4 font-heading">
            Overall
          </h2>
          <Divider/>
        <div className="max-w-4xl px-4 mx-auto">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="text-3xl font-bold text-[#4A154B] mb-2">4</div>
              <div className="text-gray-600">Teams Competing</div>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="text-3xl font-bold text-[#4A154B] mb-2">12</div>
              <div className="text-gray-600">Total Matches</div>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="text-3xl font-bold text-[#4A154B] mb-2">6</div>
              <div className="text-gray-600">Weekend Games</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
     <section className="py-16 bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white text-center">
  <div className="max-w-4xl px-4 mx-auto">
    <h2 className="mb-6 text-3xl font-bold md:text-4xl font-heading">
      READY FOR SOME ACTION?
    </h2>
    <p className="max-w-2xl mx-auto mb-8 text-xl">
      Come support your favorite team every Sunday morning!
    </p>
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <DownloadSchedule/>
      <VenueDirections />
    </div>
  </div>
</section>
    </div>
  );
}