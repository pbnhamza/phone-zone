"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, DollarSign, Star } from "lucide-react";

// ডামি ডাটা (পরে Firebase থেকে নিবে)
const productDetail = {
  1: {
    title: "iPhone 15 Pro",
    price: 1199,
    desc: "The iPhone 15 Pro features a stunning titanium design, A17 Pro chip, advanced camera system with 5x optical zoom, and Action Button for quick access.",
    date: "October 2024",
    rating: 4.9,
  },
  2: {
    title: "Samsung S24 Ultra",
    price: 1299,
    desc: "Galaxy S24 Ultra comes with 200MP main camera, built-in S Pen, Snapdragon 8 Gen 3 for Galaxy, and beautiful 6.8-inch QHD+ display.",
    date: "January 2024",
    rating: 4.8,
  },
  // বাকিগুলো যোগ করে নিবে
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productDetail[id] || {
    title: "Not Found",
    desc: "Product not available",
    price: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-3 text-indigo-600 font-bold mb-8 hover:underline"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Large Image */}
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-12 flex items-center justify-center">
            <Phone className="w-80 h-80 text-indigo-600" />
          </div>

          {/* Details */}
          <div className="p-10 lg:p-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {product.title}
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <DollarSign className="w-8 h-8 text-green-600" />
                <span className="text-5xl font-bold text-green-600">
                  ${product.price}
                </span>
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-6 h-6 fill-current" />
                <span className="text-2xl font-bold">
                  {product.rating || "New"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600 mb-8">
              <Calendar className="w-5 h-5" />
              Released: {product.date}
            </div>

            <div className="prose prose-lg text-gray-700 mb-10">
              <p>{product.desc}</p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl text-xl transition">
                Add to Cart
              </button>
              <button className="px-8 py-5 border-2 border-indigo-600 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
