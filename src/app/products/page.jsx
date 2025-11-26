"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Phone, Clock, DollarSign } from "lucide-react";

// ডামি ডাটা (পরে Firebase থেকে নিবে)
const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    desc: "Titanium design with A17 Pro chip",
    price: 1199,
    img: "https://i.ibb.co.com/27HWLHgz/apple-iphone-15-pro-1.jpg",
    date: "Oct 2024",
  },
  {
    id: 2,
    title: "Samsung S24 Ultra",
    desc: "200MP camera & S Pen included",
    price: 1299,
    img: "https://i.ibb.co.com/xSQYV3Hw/samsung-galaxy-s23-ultra.jpg",
    date: "Jan 2024",
  },
  {
    id: 3,
    title: "Google Pixel 9 Pro",
    desc: "Best Android camera experience",
    price: 999,
    img: "https://i.ibb.co.com/Vc8fLGtZ/Pixel-8-Pro-Bay-1840.jpg",
    date: "Aug 2024",
  },
  {
    id: 4,
    title: "OnePlus 12",
    desc: "120Hz display & 100W fast charging",
    price: 899,
    img: "https://i.ibb.co.com/hJqPsyJ4/One-Plus-11-featured-image-packshot-review-Recovered.jpg",
    date: "Dec 2023",
  },
  {
    id: 5,
    title: "Xiaomi 14 Pro",
    desc: "Leica camera & Snapdragon 8 Gen 3",
    price: 799,
    img: "https://i.ibb.co.com/Vcrcb8MP/Xiaomi-13-Pro.jpg",
    date: "Nov 2024",
  },
  {
    id: 6,
    title: "Sony-Xperia-1-V",
    desc: "Unique glyph interface design",
    price: 699,
    img: "https://i.ibb.co.com/ds7BVZ48/Sony-Xperia-1-V.jpg",
    date: "Jul 2024",
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Latest Phones
          </h1>
          <p className="text-xl text-gray-600">
            Discover the best smartphones of 2024-2025
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search phones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-200 outline-none text-lg"
            />
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition">
            <Filter className="w-5 h-5" />
            Category
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  {product.img ? (
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  ) : (
                    <Phone className="w-32 h-32 text-indigo-600" />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {product.desc}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-3xl font-bold text-green-600">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {product.date}
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
