import Image from "next/image";
import {
  Smartphone,
  Shield,
  Truck,
  HeadphonesIcon,
  Globe,
  Star,
} from "lucide-react";
export default function Home() {
  return (
    <div className="min-h-screen items-center  bg-zinc-50 font-sans dark:bg-black">
      <>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Welcome to <span className="text-yellow-400">PhoneZone</span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Your trusted marketplace for new, refurbished, and premium
                pre-owned smartphones. We bring you the best devices at
                unbeatable prices — with warranty, fast delivery, and zero
                hassle.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <a
                  href="/products"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Happy Customers" },
                { number: "10K+", label: "Phones Sold" },
                { number: "99%", label: "Satisfaction Rate" },
                { number: "24/7", label: "Support Available" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-bold text-indigo-600">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why Choose PhoneZone?
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                We’re more than just a store — we’re your phone partner.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: Shield,
                  title: "100% Genuine Products",
                  desc: "Every phone is verified, tested, and comes with warranty.",
                },
                {
                  icon: Truck,
                  title: "Fast & Free Delivery",
                  desc: "Same-day dispatch. Free shipping nationwide.",
                },
                {
                  icon: HeadphonesIcon,
                  title: "24/7 Customer Support",
                  desc: "Real humans ready to help — chat, call, or email.",
                },
                {
                  icon: Smartphone,
                  title: "Best Price Guarantee",
                  desc: "Found it cheaper? We’ll match it.",
                },
                {
                  icon: Star,
                  title: "Easy Returns",
                  desc: "30-day hassle-free returns. No questions asked.",
                },
                {
                  icon: Globe,
                  title: "Global Brands",
                  desc: "iPhone, Samsung, Google, Xiaomi, OnePlus & more.",
                },
              ].map((feature, i) => (
                <div key={i} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-5 group-hover:bg-indigo-600 transition">
                    <feature.icon className="w-8 h-8 text-indigo-600 group-hover:text-white transition" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Our Mission
                </h2>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                  To make premium smartphones accessible to everyone by offering
                  genuine devices at fair prices, backed by transparent grading,
                  trusted warranties, and exceptional customer care.
                </p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Our Vision
                </h2>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                  To become the most trusted phone marketplace in the world —
                  where quality meets affordability, and every customer feels
                  confident in their purchase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team / Final CTA */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to find your perfect phone?
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands who’ve already upgraded smarter with PhoneZone.
            </p>
            <div className="mt-10">
              <a
                href="/products"
                className="inline-block bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition shadow-lg"
              >
                Browse All Phones
              </a>
            </div>

            {/* Optional: Add team photos or testimonials here later */}
          </div>
        </section>
      </>
    </div>
  );
}
