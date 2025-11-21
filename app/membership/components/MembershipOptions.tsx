"use client";
interface MembershipOptionsProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export default function MembershipOptions({ selectedType, onSelectType }: MembershipOptionsProps) {
  const membershipOptions = [
    {
      type: "student",
      title: "STUDENT MEMBERSHIP",
      initialYear: "$20 for the first year",
      annualFee: "$20/year",
      popular: true,
      description: "Perfect for students passionate about football"
    },
    {
      type: "general", 
      title: "GENERAL MEMBERSHIP",
      initialYear: "$20 for the first year",
      annualFee: "$45/year",
      popular: false,
      description: "For football enthusiasts of all ages"
    },
    {
      type: "premium",
      title: "PREMIUM MEMBERSHIP", 
      initialYear: "Special benefits",
      annualFee: "$100/year",
      popular: false,
      description: "Premium features and exclusive access"
    }
  ];

  return (
    <div className="grid gap-6 mb-12 md:grid-cols-3">
      {membershipOptions.map((option, index) => (
        <div 
          key={index}
          className={`border-2 rounded-xl p-6 text-center transition-all hover:shadow-lg cursor-pointer ${
            selectedType === option.type 
              ? 'border-[#D4AF37] bg-gradient-to-b from-white to-amber-50 shadow-md' 
              : option.popular 
                ? 'border-[#D4AF37] bg-gradient-to-b from-white to-amber-50' 
                : 'border-gray-200 bg-white'
          }`}
          onClick={() => onSelectType(option.type)}
        >
          {option.popular && (
            <div className="bg-[#D4AF37] text-[#4A154B] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
              Most Popular
            </div>
          )}
          <h3 className="text-lg font-bold text-[#4A154B] mb-2">{option.title}</h3>
          <p className="mb-2 text-sm text-gray-600">{option.initialYear}</p>
          <div className="mb-3 text-2xl font-bold text-gray-900">{option.annualFee}</div>
          <p className="mb-4 text-xs text-gray-500">{option.description}</p>
          <div className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
            selectedType === option.type
              ? 'bg-[#4A154B] text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}>
            {selectedType === option.type ? 'SELECTED' : 'SELECT'}
          </div>
        </div>
      ))}
    </div>
  );
}