"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Join Sunday Futsal",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, subject, message } = formData;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:contact@northernyetisfc.com?subject=${encodeURIComponent(subject)} - From ${encodeURIComponent(name)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Northern Yetis FC Website`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-8 bg-gray-50 rounded-2xl">
      <h2 className="text-2xl font-bold text-[#4A154B] mb-6 font-heading">
        SEND US A MESSAGE
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Subject *
          </label>
          <select 
            name="subject" 
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
          >
            <option value="Join Sunday Futsal">Join Sunday Futsal</option>
            <option value="Ground Booking Inquiry">Ground Booking Inquiry</option>
            <option value="General Information">General Information</option>
            <option value="Partnership Opportunity">Partnership Opportunity</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
            placeholder="Tell us about your interest in joining our sessions..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#4A154B] hover:bg-[#3A0E3A] text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors"
        >
          Send Message via Email
        </button>
        
        <p className="text-sm text-center text-gray-600">
          This will redirect to email dialog to send us a message
        </p>
      </form>
    </div>
  );
}