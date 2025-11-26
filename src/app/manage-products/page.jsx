"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { onAuthStateChanged } from "firebase/auth";
import { Trash2, Eye, Edit, Loader2, AlertCircle, Plus } from "lucide-react";
import { auth } from "../lib/firebase";

// ডামি ডাটা (পরে Firebase থেকে নিবে)
const dummyProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    shortDesc: "Titanium design",
    price: 1199,
    date: "2024-10-15",
    image: "https://i.ibb.co.com/27HWLHgz/apple-iphone-15-pro-1.jpg",
    priority: "high",
  },
  {
    id: 2,
    title: "Samsung S24 Ultra",
    shortDesc: "200MP camera",
    price: 1299,
    date: "2024-01-20",
    image: "https://i.ibb.co.com/xSQYV3Hw/samsung-galaxy-s23-ultra.jpg",
    priority: "featured",
  },
  {
    id: 3,
    title: "Google Pixel 9",
    shortDesc: "Best AI camera",
    price: 999,
    date: "2024-08-10",
    image: "https://i.ibb.co.com/Vc8fLGtZ/Pixel-8-Pro-Bay-1840.jpg",
    priority: "medium",
  },
  {
    id: 4,
    title: "OnePlus 12",
    shortDesc: "120Hz + 100W charging",
    price: 899,
    date: "2023-12-05",
    image:
      "https://i.ibb.co.com/hJqPsyJ4/One-Plus-11-featured-image-packshot-review-Recovered.jpg",
    priority: "medium",
  },
  {
    id: 5,
    title: "Xiaomi 14 Pro",
    shortDesc: "Leica optics",
    price: 799,
    date: "2024-11-01",
    image: "https://i.ibb.co.com/Vcrcb8MP/Xiaomi-13-Pro.jpg",
    priority: "high",
  },
  {
    id: 6,
    title: "Motorola-Edge-2024",
    shortDesc: "Glyph interface",
    price: 699,
    date: "2023-07-11",
    image: "https://i.ibb.co.com/zHbyGqVw/motorola-edge-2024.jpg",
    priority: "low",
  },
];

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  // Protected Route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setProducts(dummyProducts); // পরে Firebase থেকে লোড করবো
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    // সিমুলেটেড ডিলিট (পরে Firebase এর সাথে কানেক্ট করবো)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Manage Products
          </h1>
          <p className="text-xl text-gray-600">
            Edit or remove phones from your store
          </p>
        </div>

        {/* Add New Button */}
        <div className="flex justify-end mb-8">
          <Link
            href="/add-product"
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition"
          >
            <Plus className="w-6 h-6" />
            Add New Product
          </Link>
        </div>

        {/* Responsive Table / Grid */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-8 py-6 text-left">Image</th>
                  <th className="px-8 py-6 text-left">Title</th>
                  <th className="px-8 py-6 text-left">Description</th>
                  <th className="px-8 py-6 text-center">Price</th>
                  <th className="px-8 py-6 text-center">Priority</th>
                  <th className="px-8 py-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-8 py-6">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={80}
                          height={80}
                          className="rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 font-semibold text-gray-900">
                      {product.title}
                    </td>
                    <td className="px-8 py-6 text-gray-600 max-w-xs truncate">
                      {product.shortDesc}
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-green-600 text-xl">
                      ${product.price}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                          product.priority === "featured"
                            ? "bg-purple-100 text-purple-800"
                            : product.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : product.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.priority}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/products/${product.id}`}
                          className="p-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition"
                        >
                          <Eye className="w-5 h-5 text-blue-700" />
                        </Link>
                        <Link
                          href={`/edit-product/${product.id}`}
                          className="p-3 bg-green-100 hover:bg-green-200 rounded-xl transition"
                        >
                          <Edit className="w-5 h-5 text-green-700" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition disabled:opacity-50"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="w-5 h-5 animate-spin text-red-700" />
                          ) : (
                            <Trash2 className="w-5 h-5 text-red-700" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-b last:border-b-0 p-6 hover:bg-gray-50"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{product.shortDesc}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          product.priority === "featured"
                            ? "bg-purple-100 text-purple-800"
                            : ""
                        }`}
                      >
                        {product.priority}
                      </span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center font-bold"
                      >
                        View
                      </Link>
                      <button
                        className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                      >
                        {deletingId === product.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <p className="text-2xl text-gray-600">No products found</p>
            <Link
              href="/add-product"
              className="mt-6 inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
