"use client";

import { jsPDF } from "jspdf";

export default function DownloadSchedule() {
  const schedule = [
    { week: "Week 1", date: "Nov 30, 2025", games: [
      { time: "6:00-7:00 AM", match: "NY Legends vs NY GenZ", court: "Inifinity Sports | Brampton Field" },
      { time: "7:00-8:00 AM", match: "NY Alpha vs Peel F.C. ", court: "Inifinity Sports | Brampton Field" }
    ]},
    { week: "Week 2", date: "Dec 07, 2025", games: [
      { time: "6:00-7:00 AM", match: "NY Legends vs Peel F.C. ", court: "Inifinity Sports | Brampton Field" },
      { time: "7:00-8:00 AM", match: "NY Alpha vs NY GenZ", court: "Inifinity Sports | Brampton Field" }
    ]},
    { week: "Week 3", date: "Dec 14, 2025", games: [
      { time: "6:00-7:00 AM", match: "NY Legends vs NY Alpha", court: "Inifinity Sports | Brampton Field" },
      { time: "7:00-8:00 AM", match: "NY GenZ vs Peel F.C. ", court: "Inifinity Sports | Brampton Field" }
    ]},
    { week: "Week 4", date: "Dec 21, 2025", games: [
      { time: "6:00-7:00 AM", match: "NY Alpha vs Peel F.C. ", court: "Inifinity Sports | Brampton Field" },
      { time: "7:00-8:00 AM", match: "NY Legends vs NY GenZ", court: "Inifinity Sports | Brampton Field" }
    ]},
    { week: "Week 5", date: "Dec 28, 2025", games: [
      { time: "6:00-7:00 AM", match: "NY Alpha vs NY GenZ", court: "Inifinity Sports | Brampton Field" },
      { time: "7:00-8:00 AM", match: "NY Legends vs Peel F.C. ", court: "Inifinity Sports | Brampton Field" }
    ]},
    { week: "Week 6", date: "Jan 04, 2025", games: [
      { time: "6:00-7:00 AM", match: "NY GenZ vs Peel F.C. ", court: "Inifinity Sports | Brampton Field" },
      { time: "7:00-8:00 AM", match: "NY Legends vs NY Alpha", court: "Inifinity Sports | Brampton Field" }
    ]}
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Set colors
    const primaryColor = [74, 21, 75]; // #4A154B
    const accentColor = [212, 175, 55]; // #D4AF37
    
    // Add header with background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Club name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("NORTHERN YETIS FC", 105, 15, { align: "center" });
    
    // Tournament title
    doc.setFontSize(18);
    doc.text("WINTER LEAGUE 2025", 105, 25, { align: "center" });
    
    // Subtitle
    doc.setFontSize(14);
    doc.text("OFFICIAL TOURNAMENT SCHEDULE", 105, 32, { align: "center" });

    let yPosition = 50;

    // Tournament Information
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("TOURNAMENT INFORMATION", 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("• Tournament Period: November 30, 2025 - January 04, 2025", 20, yPosition);
    yPosition += 6;
    doc.text("• Session Times: Sundays 6:00 AM - 8:00 AM", 20, yPosition);
    yPosition += 6;
    doc.text("• Venue: Infinite Sports, Brampton, ON", 20, yPosition);
    yPosition += 6;
    doc.text("• Format: 5v5 Futsal | 40-minute matches", 20, yPosition);
    yPosition += 6;
    doc.text("• Participating Teams: NY Legends, NY Alpha, NY GenZ, Peel F.C. ", 20, yPosition);
    
    yPosition += 15;

    // Match Schedule Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("MATCH SCHEDULE", 20, yPosition);
    yPosition += 10;

    // Schedule Table Header
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(20, yPosition, 170, 8, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("WEEK", 25, yPosition + 6);
    doc.text("DATE", 50, yPosition + 6);
    doc.text("TIME", 80, yPosition + 6);
    doc.text("MATCH", 110, yPosition + 6);
    doc.text("COURT", 170, yPosition + 6);
    
    yPosition += 12;

    // Schedule Rows
    doc.setFont("helvetica", "normal");
    schedule.forEach((week, index) => {
      // Check for page break
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      week.games.forEach((game, gameIndex) => {
        doc.setFontSize(9);
        if (gameIndex === 0) {
          doc.text(week.week, 25, yPosition);
          doc.text(week.date, 50, yPosition);
        }
        doc.text(game.time, 80, yPosition);
        doc.text(game.match, 110, yPosition);
        doc.text(game.court, 170, yPosition);
        yPosition += 6;
      });
      yPosition += 3; // Space between weeks
    });

    yPosition += 10;

    // Rules Section (on new page if needed)
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("TOURNAMENT RULES & REGULATIONS", 20, yPosition);
    yPosition += 10;

    const rules = [
      "All teams must arrive 15 minutes before scheduled match time",
      "Proper indoor soccer shoes are mandatory - no outdoor cleats",
      "Team captains must report to officials 10 minutes before match",
      "Matches will start promptly at scheduled times - no delays",
      "Standard Futsal rules apply with NYFC tournament modifications",
      "Fair play and sportsmanship are expected from all participants",
      "Any disputes must be raised with tournament organizers immediately"
    ];

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    rules.forEach(rule => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text("• " + rule, 25, yPosition);
      yPosition += 6;
    });

    yPosition += 10;

    // Contact Information
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("CONTACT INFORMATION", 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Website: northern-yetis-fc.vercel.app", 20, yPosition);
    yPosition += 6;
    doc.text("Email: Northernyetisfc@gmail.com", 20, yPosition);
    yPosition += 6;
    doc.text("Live Scores: Available on our website during matches", 20, yPosition);

    yPosition += 15;

    // Footer
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("GOOD LUCK TO ALL TEAMS! 🏆⚽", 105, yPosition, { align: "center" });
    
    yPosition += 10;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Official Document - Northern Yetis FC Management", 105, yPosition, { align: "center" });
    yPosition += 5;
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yPosition, { align: "center" });

    // Save the PDF
    doc.save("Northern_Yetis_FC_Winter_League_Schedule.pdf");
  };

  return (
    <button 
      onClick={downloadPDF}
      className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-3"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download Schedule PDF
    </button>
  );
}