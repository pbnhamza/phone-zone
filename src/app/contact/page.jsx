"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Contact PhoneZone</h1>
          <p className="mt-4 text-xl opacity-90">
            We’re here to help! Call, WhatsApp, email or visit us.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Visit Our Store
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      Shop No. 45, Ground Floor
                      <br />
                      City Plaza Mall, MG Road
                      <br />
                      Dhaka 1205, Bangladesh
                    </p>
                    <a
                      href="https://maps.google.com/?q=PhoneZone+Dhaka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
                    >
                      → Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Call or WhatsApp
                    </h3>
                    <p className="mt-2 text-xl font-bold text-gray-800">
                      <a
                        href="tel:+8801888888888"
                        className="text-indigo-600 hover:underline"
                      >
                        +880 1717-736181
                      </a>
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      <a
                        href="tel:+8801777777777"
                        className="text-indigo-600 hover:underline"
                      >
                        +880 1717-736181
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Available 10 AM – 9 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Email Us
                    </h3>
                    <p className="mt-2 text-gray-600">
                      <a
                        href="mailto:sales@phonezone.com"
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        sales@phonezone.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      We reply within 1 hour
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Opening Hours
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Saturday – Thursday: <strong>10:00 AM – 9:00 PM</strong>
                      <br />
                      Friday: <strong>2:00 PM – 10:00 PM</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Hi, I want to know about iPhone 15 prices..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                We usually reply on WhatsApp within <strong>5 minutes</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
