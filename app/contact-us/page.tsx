import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      {/* Header Section with your signature gradient */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-rose-600 to-rose-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Contact Information (Styles from Footer.tsx) */}
        <div className="md:w-1/3 p-8 text-lightRose1 flex flex-col justify-between gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
            <p className="text-sm opacity-90">
              Have a specific design in mind? Reach out and let&rsquo;s create
              something &quot;inch-perfect.&quot;
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl" />
              <div className="text-sm">
                <p className="font-bold">Lagos Headquarters</p>
                <p>Km 16 Obalende Expressway, Lekki Phase 1, Lagos.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-xl" />
              <a href="tel:+2347031099402" className="text-sm hover:underline">
                +234 703 109 9402
              </a>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-xl" />
              <p className="text-sm">prince.agboinou_wusu@yahoo.com</p>
            </div>
          </div>

          <div className="flex gap-5 text-xl">
            <FaLinkedinIn className="cursor-pointer hover:scale-110 transition" />
            <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:scale-110 transition" />
            <FaTwitter className="cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        {/* Contact Form (White Section) */}
        <div className="md:w-2/3 bg-white p-8 md:p-12">
          <form className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="border-b-2 border-gray-200 focus:border-rose-600 outline-none py-2 transition"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="border-b-2 border-gray-200 focus:border-rose-600 outline-none py-2 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-500">
                Subject
              </label>
              <select className="border-b-2 border-gray-200 focus:border-rose-600 outline-none py-2 bg-transparent transition">
                <option>Custom Outfit Inquiry</option>
                <option>Order Status</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-500">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what's on your mind..."
                className="border-b-2 border-gray-200 focus:border-rose-600 outline-none py-2 transition resize-none"
              ></textarea>
            </div>

            <button className="mt-4 bg-rose-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-rose-700 active:scale-95 transition-all w-full md:w-fit md:px-12">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
