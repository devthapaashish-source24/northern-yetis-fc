"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#4A154B] text-white shadow-xl sticky top-0 z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:py-3 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Club Name */}
            <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-90">
  <Image
    src='/clubLogo.jpg'
    alt="Northern Yetis FC Logo"
    width={50}
    height={50}
    className="rounded-lg"
    priority
  />          
            {/* Club Name */}
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide uppercase font-heading">
                Northern Yetis FC
              </span>
              <span className="text-xs font-medium tracking-widest text-gold-200">
                ESTD 2024
              </span>
            </div>
          </Link>
          {/* Desktop Navigation Links */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link 
              href="/" 
              className="text-white hover:text-[#F0C350] font-semibold transition-colors duration-200 uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#F0C350] pb-1"
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className="text-white hover:text-[#F0C350] font-semibold transition-colors duration-200 uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#F0C350] pb-1"
            >
              Events
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-[#F0C350] font-semibold transition-colors duration-200 uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#F0C350] pb-1"
            >
              About us
            </Link>
            <Link 
              href="/contact" 
              className="text-white hover:text-[#F0C350] font-semibold transition-colors duration-200 uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#F0C350] pb-1"
            >
              Contact
            </Link>
            <Link href='/membership'>
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#F0C350] hover:from-[#F0C350] hover:to-[#D4AF37] text-[#4A154B] px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Membership
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white hover:text-[#F0C350] focus:outline-none transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#3A0E3A] border-t border-[#2D0A2D] py-4">
            <div className="flex flex-col px-4 space-y-4">
              <Link
                href="/"
                className="text-white hover:text-[#F0C350] font-semibold py-3 transition-colors uppercase tracking-wide border-l-4 border-transparent hover:border-[#F0C350] pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/events"
                className="text-white hover:text-[#F0C350] font-semibold py-3 transition-colors uppercase tracking-wide border-l-4 border-transparent hover:border-[#F0C350] pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-[#F0C350] font-semibold py-3 transition-colors uppercase tracking-wide border-l-4 border-transparent hover:border-[#F0C350] pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-[#F0C350] font-semibold py-3 transition-colors uppercase tracking-wide border-l-4 border-transparent hover:border-[#F0C350] pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link href='/membership'>
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#F0C350] hover:from-[#F0C350] hover:to-[#D4AF37] text-[#4A154B] px-6 py-4 rounded-lg font-bold uppercase tracking-wider transition-all duration-200 w-full mt-4">
                Membership
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}