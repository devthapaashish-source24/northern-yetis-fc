"use client";

import { useState } from "react";
import MembershipOptions from "./components/MembershipOptions";
import RegistrationForm from "./components/RegistrationForm";

export default function MembershipPage() {
  const [selectedMembership, setSelectedMembership] = useState("student");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white py-16">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl font-heading">
            BECOME A <span className="text-[#D4AF37]">MEMBER</span>
          </h1>
          <p className="text-xl opacity-90">
            Join Northern Yetis FC - Affordable membership for everyone!
          </p>
        </div>
      </section>

      {/* Membership Content */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#4A154B] mb-4 font-heading">
              FLEXIBLE MEMBERSHIP OPTIONS
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Choose the plan that works best for you. All members get access to our Sunday sessions!
            </p>
          </div>

          <MembershipOptions 
            selectedType={selectedMembership}
            onSelectType={setSelectedMembership}
          />

          <RegistrationForm selectedMembership={selectedMembership} />
        </div>
      </section>

      {/* Affordable Pricing Banner */}
      <section className="py-12 bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white text-center">
        <div className="max-w-2xl px-4 mx-auto">
          <h2 className="mb-4 text-2xl font-bold font-heading">
            🎉 AFFORDABLE FOOTBALL FOR EVERYONE!
          </h2>
          <p className="text-lg opacity-90">
            Starting at just <strong>$20/year</strong> - Less than $0.40 per week!
          </p>
          <p className="mt-2 text-sm opacity-80">
            Quality football experience without breaking the bank
          </p>
        </div>
      </section>
    </div>
  );
}