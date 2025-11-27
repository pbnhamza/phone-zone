"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Trash2,
  Eye,
  Edit,
  Loader2,
  AlertCircle,
  Plus,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const router = useRouter();

  // Toast Function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3500
    );
  };

  // Delete with Toast
  const handleDelete = async (id) => {
    setDeletingId(id);

    try {
      const res = await fetch(
        `https://phone-zone-server.vercel.app/phones/${id}`,
        {
          method: "DELETE",
        }
      );

      setProducts((prev) => prev.filter((p) => p._id !== id));
      showToast("phone deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete product!", "error");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Fetch Products + Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("https://phone-zone-server.vercel.app/phones");
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-center">
        <div>
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <p className="text-2xl text-red-600 font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`flex items-center gap-4 px-8 py-5 rounded-2xl shadow-2xl text-white font-bold text-lg backdrop-blur-xl border-2 min-w-[340px] animate-in fade-in slide-in-from-top-4 duration-500 ${
              toast.type === "success"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400"
                : "bg-gradient-to-r from-red-500 to-rose-600 border-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            ) : (
              <XCircle className="w-10 h-10 animate-pulse" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-4 hover:scale-110 transition"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Manage Products ({products.length})
            </h1>
            <p className="text-xl text-gray-600">
              Add, edit or remove phones from your store
            </p>
          </div>

          <div className="flex justify-end mb-8">
            <Link
              href="/add-product"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition"
            >
              <Plus className="w-6 h-6" />
              Add New Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
              <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <p className="text-2xl text-gray-600 mb-6">No products found</p>
              <Link
                href="/add-product"
                className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700"
              >
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-8 py-6 text-left">Image</th>
                      <th className="px-8 py-6 text-left">Title</th>
                      <th className="px-8 py-6 text-left">Price</th>
                      <th className="px-8 py-6 text-center">Priority</th>
                      <th className="px-8 py-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-8 py-6">
                          {product.img ? (
                            <Image
                              src={product.img}
                              alt={product.title}
                              width={80}
                              height={80}
                              className="rounded-xl object-cover shadow-md"
                              unoptimized
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-xl" />
                          )}
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-gray-900">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {product.shortDesc}
                          </p>
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
                            {product.priority || "low"}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-center gap-4">
                            <Link
                              href={`/products/${product._id}`}
                              className="p-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition"
                            >
                              <Eye className="w-5 h-5 text-blue-700" />
                            </Link>
                            <Link
                              href={`/edit-product/${product._id}`}
                              className="p-3 bg-green-100 hover:bg-green-200 rounded-xl transition"
                            >
                              <Edit className="w-5 h-5 text-green-700" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              disabled={deletingId === product._id}
                              className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition disabled:opacity-50"
                            >
                              {deletingId === product._id ? (
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
                    key={product._id}
                    className="p-6 border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {product.img ? (
                          <Image
                            src={product.img}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="rounded-xl object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {product.shortDesc}
                        </p>
                        <p className="text-2xl font-bold text-green-600 mt-2">
                          ${product.price}
                        </p>
                        <div className="flex gap-3 mt-4">
                          <Link
                            href={`/products/${product._id}`}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center font-bold"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={deletingId === product._id}
                            className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                          >
                            {deletingId === product._id ? (
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
          )}
        </div>
      </div>
    </>
  );
}
