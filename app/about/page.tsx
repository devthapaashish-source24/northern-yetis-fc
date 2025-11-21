import Image from "next/image";
import Link from "next/link";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white py-20">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold md:text-6xl font-heading">
            OUR <span className="text-[#D4AF37]">STORY</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl">
            Building champions on and off the field since 2024
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold text-[#4A154B] mb-6 font-heading">
                WHO WE ARE
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                Northern Yetis FC emerged from a passion for football and a vision to create 
                a club that represents excellence, community, and sportsmanship. Founded in 2024, 
                we've quickly become a force in local football.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                Our name reflects our resilience and strength - like the mighty yeti, we stand 
                strong in challenging conditions and thrive where others might falter.
              </p>
              <div className="bg-[#D4AF37] text-[#4A154B] p-6 rounded-lg">
                <h3 className="mb-3 text-2xl font-bold">Our Vision</h3>
                <p className="text-lg">
                  To be the most respected football club in the region, developing talent 
                  and fostering a lifelong love for the beautiful game.
                </p>
              </div>
            </div>
           <div className="relative w-full overflow-hidden h-80 rounded-2xl">
  <Image
    src="/aboutUs.jpg"
    alt="Northern Yetis FC Team Photo"
    fill
    className="object-cover object-top"  // This crops from top
    priority
  />
</div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="text-4xl font-bold text-[#4A154B] text-center mb-12 font-heading">
            OUR VALUES
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "PASSION",
                desc: "We play with heart and soul in every match",
                icon: "❤️"
              },
              {
                title: "DISCIPLINE",
                desc: "Commitment to training and team ethics",
                icon: "⚡"
              },
              {
                title: "UNITY",
                desc: "Stronger together as one team, one family",
                icon: "🤝"
              }
            ].map((value, index) => (
              <div key={index} className="p-6 text-center bg-white shadow-lg rounded-xl">
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="text-2xl font-bold text-[#4A154B] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { number: "2024", label: "ESTABLISHED" },
              { number: "50+", label: "PLAYERS" },
              { number: "15+", label: "MATCHES WON" },
              { number: "3", label: "TOURNAMENTS" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-4xl px-4 mx-auto">
          <h2 className="text-4xl font-bold text-[#4A154B] mb-6 font-heading">
            READY TO JOIN THE YETIS FAMILY?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-700">
            Whether you're a player, sponsor, or fan, there's a place for you in our club.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
           <Link href='/membership'>
             <button className="bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors">
              Join Our Team
            </button>
           </Link>
           <Link href='/contact'>
            <button className="border-2 border-[#4A154B] text-[#4A154B] hover:bg-[#4A154B] hover:text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors">
              Contact Us
            </button>
           </Link>
          </div>
        </div>
      </section>
    </div>
  );
}