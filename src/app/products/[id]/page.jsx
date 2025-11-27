"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Calendar,
  DollarSign,
  Star,
  Loader2,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(product);
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://phone-zone-server.vercel.app/phones/${id}`
        );

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-2xl text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error / Not Found
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl">
          <Phone className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we not find this phone.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-3 text-indigo-600 font-bold mb-8 hover:underline transition"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Large Image */}
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-12 flex items-center justify-center">
            {product?.img ? (
              <Image
                src={product.img}
                alt={product.title}
                width={600}
                height={600}
                className="object-contain rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                unoptimized
                priority
              />
            ) : (
              <div className="bg-white/80 backdrop-blur-lg p-20 rounded-3xl">
                <Phone className="w-80 h-80 text-indigo-600" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-10 lg:p-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {product.title}
            </h1>

            {/* Price + Rating */}
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <DollarSign className="w-10 h-10 text-green-600" />
                <span className="text-6xl font-extrabold text-green-600">
                  ${product.price}
                </span>
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-8 h-8 fill-current" />
                <span className="text-3xl font-bold">4.9</span>
                <span className="text-gray-500 text-lg">(New)</span>
              </div>
            </div>

            {/* Release Date */}
            <div className="flex items-center gap-3 text-gray-600 mb-8">
              <Calendar className="w-6 h-6" />
              <span className="text-lg">
                Released:{" "}
                {new Date(product.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Short Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Overview
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            {/* Full Description */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Full Details
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {product.fullDesc || "No detailed description available yet."}
              </p>
            </div>

            {/* Priority Badge */}
            {product.priority && (
              <div className="mb-8">
                <span
                  className={`inline-block px-6 py-3 rounded-full text-white font-bold text-sm shadow-lg ${
                    product.priority === "featured"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : product.priority === "high"
                      ? "bg-red-600"
                      : product.priority === "medium"
                      ? "bg-yellow-600"
                      : "bg-gray-600"
                  }`}
                >
                  {product.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 rounded-2xl text-xl transition shadow-lg">
                Add to Cart
              </button>
              <button className="px-8 py-5 border-2 border-indigo-600 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition text-xl">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
