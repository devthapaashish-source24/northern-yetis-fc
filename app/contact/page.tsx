import ContactForm from "./components/ContactForm";
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4A154B] to-[#3A0E3A] text-white py-20">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl font-heading">
            GET IN <span className="text-[#D4AF37]">TOUCH</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl">
            Ready to join the Yetis family? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#4A154B] mb-8 font-heading">
                CONTACT INFORMATION
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-3 rounded-lg mr-4">
                    📧
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">Northernyetisfc@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-3 rounded-lg mr-4">
                    📱
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Call/WhatsApp</h3>
                    <p className="text-gray-600">+1 (647) 866-1732</p>
                    <p className="text-gray-600">+1 (226) 580-9876</p>
                    <p className="text-gray-600">+1 (647) 676-9026</p>
                    <p className="text-gray-600">Available for inquiries</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-3 rounded-lg mr-4">
                    🏟️
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Training Location</h3>
                    <p className="text-gray-600">Northern Yetis Sports FC</p>
                    <p className="text-gray-600">123 Football Way, Sports City</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#D4AF37] text-[#4A154B] p-3 rounded-lg mr-4">
                    🕐
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Session Times</h3>
                    <p className="text-gray-600">Sunday: 6:00 AM - 8:00 AM</p>
                    <p className="text-gray-600">Futsal & Training Sessions</p>
                  </div>
                </div>
                {/* Social Media Section */}
<div className="mt-8">
  <h3 className="text-xl font-semibold text-[#4A154B] mb-4">Follow Us On Social Media</h3>
  <div className="flex space-x-4">
    {/* Facebook */}
    <a 
      href="https://www.facebook.com/NORTHERNYETISFC" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-[#1877F2] hover:bg-[#166FE5] text-white p-3 rounded-lg transition-colors flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      <span>Facebook</span>
    </a>

    {/* Instagram */}
    <a 
      href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fnorthernyetisfc%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExODk5Mk5tWllPaTVpQXVYMHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIIY2FsbHNpdGUBMgABHqch4aKRer2fePIlQBxvL-6T3HCrRDfFNy0tDZM5Q44uNYypMRZ63iSomZnK_aem_Ia1Zj-X6VJXEI3fOIWQCqQ&h=AT2ffJs1vJSNEs2TJlc7R-AXTpWfQGG2tELtpbxy-rNiAuCyFHmSEN1M5MK7Qjb_kONhRrFsNQrC6xPqoMwNyUD78CeMyaEoQXFMGCxjuV2eKxLaG99RMTpvkGnTNS4AEOM74VosqJEVS-mtcVoA" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-gradient-to-r from-[#405DE6] via-[#5851DB] via-[#833AB4] via-[#C13584] via-[#E1306C] to-[#FD1D1D] hover:opacity-90 text-white p-3 rounded-lg transition-colors flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.808 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.808-2.026 1.297-3.323 1.297z"/>
      </svg>
      <span>Instagram</span>
    </a>
  </div>
  <p className="mt-3 text-gray-600">
    Follow for session updates, match photos, and club announcements!
  </p>
</div>
              </div>
            </div>
            {/*  Contact Form */}
           <ContactForm/>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-[#4A154B] text-center mb-12 font-heading">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "How can I join Sunday futsal sessions?",
                answer: "Just reach out to us via email or WhatsApp! We'll get you connected with the team."
              },
              {
                question: "What should I bring to sessions?",
                answer: "Indoor shoes, water bottle, and sports attire. We provide the futsal balls!"
              },
              {
                question: "Is there any age restriction?",
                answer: "We welcome players 16 years and above. All skill levels are encouraged to join."
              },
              {
                question: "Can I book the ground for my team?",
                answer: "Yes! Contact us for ground availability and booking rates."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-[#4A154B] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}