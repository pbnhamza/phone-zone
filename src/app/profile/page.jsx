"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { LogOut, Mail, User, Calendar, Edit2, Lock } from "lucide-react";
import { auth } from "../lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          <div className="relative px-8 pb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 gap-6">
              {/* Avatar */}
              <div className="relative">
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    width={160}
                    height={160}
                    className="rounded-full border-8 border-white shadow-2xl"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-indigo-600 border-8 border-white shadow-2xl flex items-center justify-center text-white text-6xl font-bold">
                    {user?.email[0].toUpperCase()}
                  </div>
                )}
                <button className="absolute bottom-4 right-2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition">
                  <Edit2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Name & Edit */}
              <div className="text-center sm:text-left sm:mb-6">
                <h1 className="text-4xl font-bold text-gray-900">
                  {user?.displayName || "User"}
                </h1>
                <p className="text-gray-500 mt-1">Welcome back!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <User className="w-7 h-7 text-indigo-600" />
              Account Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 py-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="font-medium">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition flex items-center justify-between">
                <span className="font-medium">Edit Profile</span>
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition flex items-center justify-between">
                <span className="font-medium">Change Password</span>
                <Lock className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-2xl transition shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
