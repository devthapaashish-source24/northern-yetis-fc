"use client";

import { useState } from "react";

interface RegistrationFormProps {
  selectedMembership: string;
}

export default function RegistrationForm({ selectedMembership }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    phoneNumber: "",
    paymentMethod: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const membershipFee = selectedMembership === "student" ? "$20" : 
                         selectedMembership === "general" ? "$45" : "$100";

    const mailtoLink = `mailto:Northernyetisfc@gmail.com?subject=Membership Registration - ${formData.firstName} ${formData.lastName}&body=${encodeURIComponent(
      `MEMBERSHIP REGISTRATION DETAILS:\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nDate of Birth: ${formData.dateOfBirth}\nAddress: ${formData.address}\nGender: ${formData.gender}\nPhone: ${formData.phoneNumber}\nMembership Type: ${selectedMembership.toUpperCase()}\nMembership Fee: ${membershipFee}\nPayment Method: ${formData.paymentMethod}\n\n---\nSent from Northern Yetis FC Website`
    )}`;
    
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-8 border border-gray-200 bg-gray-50 rounded-2xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#4A154B] mb-2 font-heading">
          MEMBERSHIP REGISTRATION
        </h2>
        <p className="text-gray-600">
          Selected: <span className="font-semibold text-[#4A154B]">
            {selectedMembership.toUpperCase()} MEMBERSHIP
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
              placeholder="Enter last name"
            />
          </div>
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
            placeholder="your.email@gmail.com"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
            placeholder="Enter your address"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Preferred Payment Method *
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
            >
              <option value="">Select Payment Method</option>
              <option value="etransfer">E-Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>

        {formData.paymentMethod === "etransfer" && (
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <p className="text-sm text-blue-800">
              <strong>E-Transfer Instructions:</strong> Send payment to <strong>Northernyetisfc@gmail.com</strong>
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#F0C350] text-[#4A154B] py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-colors"
        >
          COMPLETE REGISTRATION
        </button>

        <p className="text-sm text-center text-gray-600">
          You'll be redirected to email to complete your registration
        </p>
      </form>
    </div>
  );
}