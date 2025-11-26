"use client";

import { MapPin, Phone, Mail, Clock, Smartphone } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold">About PhoneZone</h1>
          <p className="mt-4 text-xl opacity-90">
            Your trusted local store for genuine smartphones since 2018
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-14">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              PhoneZone – We Sell Real Phones
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We are a family-owned mobile phone store offering brand-new and
              certified refurbished devices at the best prices in town. No fake
              products. No hidden fees. Just honest deals.
            </p>

            {/* Contact Info Grid */}
            <div className="mt-12 grid md:grid-cols-2 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Store Address</h3>
                  <p className="mt-1 text-gray-600">
                    Shop No. 45, Ground Floor
                    <br />
                    City Plaza Mall, MG Road
                    <br />
                    Dhaka 1205, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Call / WhatsApp
                  </h3>
                  <p className="mt-1 text-gray-600 text-lg font-medium">
                    <a
                      href="tel:+8801888888888"
                      className="text-indigo-600 hover:underline"
                    >
                      +880 1888-888888
                    </a>
                  </p>
                  <p className="text-gray-600 text-lg font-medium">
                    <a
                      href="tel:+8801777777777"
                      className="text-indigo-600 hover:underline"
                    >
                      +880 1777-777777
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="mt-1 text-gray-600">
                    <a
                      href="mailto:sales@phonezone.com"
                      className="text-indigo-600 hover:underline"
                    >
                      sales@phonezone.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Opening Hours</h3>
                  <p className="mt-1 text-gray-600">
                    Saturday – Thursday: 10:00 AM – 9:00 PM
                    <br />
                    Friday: 2:00 PM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
