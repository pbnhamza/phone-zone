// src/app/products/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Filter, Phone, DollarSign, Clock, Lock } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch phones
  useEffect(() => {
    const loadPhones = async () => {
      try {
        const res = await fetch("https://phone-zone-server.vercel.app/phones");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhones();
  }, []);

  // Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Search Filter
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const query = search.toLowerCase();
    return products.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const desc = p.shortDesc?.toLowerCase() || "";
      return title.includes(query) || desc.includes(query);
    });
  }, [products, search]);

  // Handle Click
  const handleProductClick = (e, id) => {
    if (!user) {
      e.preventDefault();
      router.push("/login");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-600 text-2xl">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Latest Phones
          </h1>
          <p className="text-xl text-gray-600">
            Discover the best smartphones of 2024-2025
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-5 w-6 h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg transition-all duration-300"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <Search className="w-28 h-28 text-gray-300 mx-auto mb-8" />
            <p className="text-3xl font-bold text-gray-600 mb-2">
              No phones found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                onClick={(e) => handleProductClick(e, product._id)}
                className="block"
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer group relative">
                  {/* Lock Icon if not logged in */}
                  {!user && (
                    <div className="absolute top-4 right-4 z-10 bg-red-600/90 text-white p-3 rounded-full shadow-lg">
                      <Lock className="w-6 h-6" />
                    </div>
                  )}

                  <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 flex items-center justify-center">
                    {product?.img ? (
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={320}
                        height={320}
                        className="object-contain rounded-2xl group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <Phone className="w-36 h-36 text-indigo-600" />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-5">
                      {product.shortDesc}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-7 h-7 text-green-600" />
                        <span className="text-3xl font-bold text-green-600">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {new Date(product.date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`text-center py-4 rounded-2xl font-bold transition-all duration-300 ${
                        user
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      {user ? "View Details" : "Login to View"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
