"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ChevronRight, Smartphone } from "lucide-react";

// Sample blog posts (replace with real data later)
const blogPosts = [
  {
    id: 1,
    title: "iPhone 16 vs Samsung S24: Which One Should You Buy in 2025?",
    excerpt:
      "Complete comparison of camera, battery, performance and real-world price in Bangladesh.",
    author: "Rahim Khan",
    date: "November 25, 2025",
    readTime: "6 min read",
    category: "Comparison",
    image: "/blog/iphone16-vs-s24.jpg", // put your image in public/blog/
    slug: "iphone-16-vs-samsung-s24-2025",
  },
  {
    id: 2,
    title: "Top 5 Best Camera Phones Under ৳40,000 in Bangladesh",
    excerpt:
      "We tested 15+ phones. These 5 give you real DSLR-like photos in 2025.",
    author: "Ayesha Islam",
    date: "November 20, 2025",
    readTime: "8 min read",
    category: "Buying Guide",
    image: "/blog/best-camera-phones.jpg",
    slug: "best-camera-phones-under-40000",
  },
  {
    id: 3,
    title: "How to Spot a Fake iPhone in Bangladesh (2025 Guide)",
    excerpt:
      "100% working tricks used by PhoneZone experts to check originality before buying.",
    author: "Karim Ahmed",
    date: "November 15, 2025",
    readTime: "5 min read",
    category: "Tips & Tricks",
    image: "/blog/fake-iphone-guide.jpg",
    slug: "how-to-spot-fake-iphone",
  },
  {
    id: 4,
    title: "Google Pixel 9 is Here! First Hands-On in Dhaka",
    excerpt:
      "We got the Pixel 9 two weeks early. Is it worth upgrading from Pixel 7/8?",
    author: "Rahim Khan",
    date: "November 10, 2025",
    readTime: "7 min read",
    category: "Review",
    image: "/blog/pixel-9-review.jpg",
    slug: "google-pixel-9-hands-on",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">PhoneZone Blog</h1>
          <p className="mt-4 text-xl opacity-90">
            Honest reviews • Buying guides • Latest phone news in Bangladesh
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-56 bg-gray-200">
                  {/* Replace with real image when available */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-2 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Never Miss a Deal or Review
          </h2>
          <p className="mt-4 text-xl opacity-90">
            Get new posts & exclusive offers directly in your inbox
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-lg text-gray-900 flex-1"
            />
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
