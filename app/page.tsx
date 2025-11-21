import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
  <section className="relative bg-gradient-to-r from-[#4A154B] via-[#3A0E3A] to-[#2D0A2D] text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl px-4 mx-auto text-center">
          {/* Animated Club Logo */}
         <div className="flex justify-center mb-6">
  <div className="transition-all duration-300 animate-bounce hover:animate-pulse">
    <div className="p-2 transition-transform duration-300 transform bg-white shadow-2xl rounded-xl hover:scale-110">
      <Image
        src="/clubLogo.jpg"
        alt="Northern Yetis FC Logo"
        width={80}
        height={80}
        className="rounded-lg"
      />
    </div>
  </div>
</div>

          {/* Club Name */}
          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl font-heading">
            NORTHERN <span className="text-[#D4AF37]">YETIS</span> FC
          </h1>
          
          <p className="max-w-3xl mx-auto mb-8 text-xl font-light md:text-2xl">
            Your local football community - Passion, Unity, Excellence
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link 
              href="/events" 
              className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-all transform hover:scale-105 text-center"
            >
              Join Our Sessions
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-white hover:bg-white hover:text-[#4A154B] text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-all text-center"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="text-4xl font-bold text-[#4A154B] text-center mb-12 font-heading">
            JOIN OUR FOOTBALL FAMILY
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🥅",
                title: "Sunday Futsal",
                desc: "Weekly 5v5 sessions every Sunday morning 6-8 AM"
              },
              {
                icon: "⚽",
                title: "Training Sessions",
                desc: "Regular training to improve skills and fitness"
              },
              {
                icon: "👥",
                title: "Community First",
                desc: "Friendly environment for players of all levels"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 text-center bg-gray-50 rounded-xl">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#4A154B] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="p-8 bg-white shadow-sm rounded-2xl">
            <h2 className="text-3xl font-bold text-[#4A154B] text-center mb-8 font-heading">
              WEEKLY ACTIVITIES
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="text-center">
                <div className="text-5xl text-[#D4AF37] mb-4">🕕</div>
                <h3 className="text-2xl font-bold text-[#4A154B] mb-2">Sunday Futsal</h3>
                <p className="text-lg text-gray-700">6:00 AM - 8:00 AM</p>
                <p className="mt-2 text-gray-600">Indoor Futsal Court</p>
              </div>
              <div className="text-center">
                <div className="text-5xl text-[#D4AF37] mb-4">📅</div>
                <h3 className="text-2xl font-bold text-[#4A154B] mb-2">Ground Booking</h3>
                <p className="text-lg text-gray-700">Available Weekly</p>
                <p className="mt-2 text-gray-600">For teams and groups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white text-center">
        <div className="max-w-4xl px-4 mx-auto">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-heading">
            READY TO JOIN THE YETIS?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Come be part of our growing football community. All skill levels welcome!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link 
              href="/contact" 
              className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors text-center"
            >
              Get In Touch
            </Link>
            <Link 
              href="/events" 
              className="border-2 border-white hover:bg-white hover:text-[#4A154B] text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors text-center"
            >
              See Events
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer Note */}
      <section className="py-12 text-center bg-white">
        <div className="max-w-2xl px-4 mx-auto">
          <p className="text-lg text-gray-600">
            <strong>Northern Yetis FC</strong> - Building football dreams, one session at a time.
          </p>
          <p className="mt-2 text-gray-500">ESTD 2024</p>
        </div>
      </section>
    </div>
  );
}