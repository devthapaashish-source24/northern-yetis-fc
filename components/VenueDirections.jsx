"use client";
import { useState } from 'react';
export default function VenueDirections() {
  const [showDirections, setShowDirections] = useState(false);
  
  const venueInfo = {
    name: "Northern Yetis Sports Complex",
    address: "Infinite Sports | Brampton Indoor Turf",
    googleMaps: "https://maps.google.com/?q=Infinite Sports | Brampton Indoor Turf"
  };

  return (
    <div className="my-8">
      <button
        onClick={() => setShowDirections(!showDirections)}
        className="border-2 border-white hover:bg-white hover:text-[#4A154B] text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors"
      >
        Get Directions
      </button>

      {showDirections && (
        <div className="p-6 mt-6 bg-white border border-gray-200 shadow-lg rounded-xl">
          <h3 className="text-2xl font-bold text-[#4A154B] mb-4 font-heading">
            📍 Venue Location
          </h3>
          
          <div className="mb-6 space-y-3">
            <div className="flex items-start">
              <span className="w-20 font-semibold text-gray-800">Venue:</span>
              <span className='text-gray-600'>{venueInfo.name}</span>
            </div>
            <div className="flex items-start">
              <span className="w-20 font-semibold text-gray-800">Address:</span>
              <span className='text-gray-600'>{venueInfo.address}</span>
            </div>
            <div className="flex items-start">
              <span className="w-20 font-semibold text-gray-800">Times:</span>
              <span className='text-gray-600'>Sundays 6:00 AM - 8:00 AM</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={venueInfo.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4A154B] hover:bg-[#3A0E3A] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              🗺️ Open in Google Maps
            </a>
            <a
              href={`https://waze.com/ul?q=${encodeURIComponent(venueInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              🚗 Open in Waze
            </a>
          </div>
        </div>
      )}
    </div>
  );
}