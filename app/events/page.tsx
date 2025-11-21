import Link from "next/link";
export default function EventsPage() {
  const contacts = [
    { name: "PRAKASH NEPAL", phone: "226-580-9876" },
    { name: "NIRAJ KANDEL", phone: "647-866-1732" },
    { name: "BISHAL SHRESTHA", phone: "647-676-9026" },
    { name: "AMMAR KUMAR SHRESTHA", phone: "437-688-1982" },
    { name: "SUNIL SHRESTHA", phone: "647-867-3563" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white py-20">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <div className="inline-block bg-[#D4AF37] text-[#4A154B] px-6 py-2 rounded-full mb-6 font-bold uppercase tracking-widest text-sm">
            Coming Soon
          </div>
          <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl font-heading">
            WINTER <span className="text-[#D4AF37]">2025</span>
          </h1>
          <p className="mb-4 text-2xl font-light md:text-3xl">
            NORTHERN YETIS INDOOR SOCCER LEAGUE
          </p>
          <p className="text-xl opacity-90">
            Get ready for the most exciting indoor soccer tournament
          </p>
        </div>
      </section>

      {/* League Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            {/* League Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#4A154B] mb-8 font-heading">
                LEAGUE DETAILS
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Number of Clubs</span>
                  <span className="font-bold text-[#4A154B]">TBD</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Team Size</span>
                  <span className="font-bold text-[#4A154B]">7 Players</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Registration Fee</span>
                  <span className="font-bold text-[#4A154B]">$700 / Club</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Tournament Period</span>
                  <span className="font-bold text-[#4A154B]">End Nov - Early Jan</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Prize</span>
                  <span className="font-bold text-[#4A154B]">Shield & Medal</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-semibold text-gray-700">Venue</span>
                  <span className="font-bold text-[#4A154B] text-right">Brampton<br/><span className="text-sm text-gray-600">(Field TBD)</span></span>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#4A154B] mb-6 font-heading">
                TOURNAMENT HIGHLIGHTS
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-2 rounded-lg mr-4">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Championship Glory</h4>
                    <p className="text-sm text-gray-600">Win the prestigious shield and medals</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-2 rounded-lg mr-4">
                    ⚽
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">7v7 Format</h4>
                    <p className="text-sm text-gray-600">Fast-paced indoor soccer action</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-2 rounded-lg mr-4">
                    🏃
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Winter Competition</h4>
                    <p className="text-sm text-gray-600">Beat the cold with indoor excitement</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-2 rounded-lg mr-4">
                    👥
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Community Focus</h4>
                    <p className="text-sm text-gray-600">Bringing soccer enthusiasts together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Organizers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-[#4A154B] text-center mb-12 font-heading">
            CONTACT ORGANIZERS
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact, index) => (
              <div key={index} className="p-6 text-center bg-white shadow-sm rounded-xl">
                <div className="bg-[#4A154B] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">{contact.name.split(' ')[0].charAt(0)}</span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{contact.name}</h3>
                <a 
                  href={`tel:${contact.phone.replace(/-/g, '')}`}
                  className="text-[#D4AF37] hover:text-[#4A154B] font-medium transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white text-center">
        <div className="max-w-4xl px-4 mx-auto">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-heading">
            READY TO COMPETE?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Gather your team and get ready for the Winter 2025 Indoor Soccer League
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a 
              href="tel:2265809876"
              className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors text-center"
            >
              Call to Register
            </a>
            <Link 
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-[#4A154B] text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors text-center"
            >
              More Information
            </Link>
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-12 text-center bg-white">
        <div className="max-w-2xl px-4 mx-auto">
          <p className="text-lg text-gray-600">
            <strong>Official banner and detailed schedule</strong> coming soon!
          </p>
          <p className="mt-2 text-gray-500">Stay tuned for updates</p>
        </div>
      </section>
    </div>
  );
}