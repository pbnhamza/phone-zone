"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import {
  Loader2,
  Plus,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { auth } from "../lib/firebase";

export default function AddProductPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    price: "",
    img: "",
    date: new Date().toISOString().split("T")[0],
    priority: "medium",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    const productData = {
      ...formData,
      price: Number(formData.price),
      img: formData.img || null,
    };

    try {
      const res = await fetch("http://localhost:5000/phones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add phones");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/products");
      }, 2000);

      setFormData({
        title: "",
        shortDesc: "",
        fullDesc: "",
        price: "",
        img: "",
        date: new Date().toISOString().split("T")[0],
        priority: "medium",
      });
    } catch (err) {
      setError(err.message || "Something went wrong!");
      console.error("Add Product Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Add New Phone
          </h1>
          <p className="text-xl text-gray-600">
            Share the latest smartphone with the world
          </p>
        </div>

        {/* Success Toast */}
        {success && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <CheckCircle className="w-8 h-8" />
            <span className="text-xl font-bold">
              Product Added Successfully!
            </span>
          </div>
        )}

        {/* Error Toast */}
        {error && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-3 animate-pulse">
            <AlertCircle className="w-8 h-8" />
            <span className="text-xl font-bold">{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Phone Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Phone Title"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Short Description
              </label>
              <input
                type="text"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleChange}
                required
                placeholder="Short Description"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Full Description
              </label>
              <textarea
                name="fullDesc"
                value={formData.fullDesc}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Description"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg resize-none"
              />
            </div>

            {/* Price & Date */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Price (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Price"
                  className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Release Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Image URL (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-5 top-5 w-6 h-6 text-gray-500" />
                <input
                  type="url"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  placeholder="https://example.com/phone.jpg"
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg"
                />
              </div>
              {formData.imageUrl && (
                <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="featured">Featured</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold text-xl py-6 rounded-3xl transition flex items-center justify-center gap-3 shadow-xl"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin" />
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus className="w-8 h-8" />
                  Add Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
