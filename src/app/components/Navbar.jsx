// components/Navbar.tsx or app/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Plus,
  Package,
  User,
  LogOut,
} from "lucide-react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleLogout = async () => {
    await signOut(auth);
    setIsDropdownOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-purple-50 shadow-md border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            PhoneZone
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow hover:shadow-md transition"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.displayName?.[0] || user.email?.[0] || "U"}
                    </div>
                  )}
                  <span className="font-medium text-gray-700">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>

                      <Link
                        href="/add-product"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Plus className="w-5 h-5 mr-3" />
                        Add Product
                      </Link>
                      <Link
                        href="/manage-products"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Package className="w-5 h-5 mr-3" />
                        Manage Products
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-5 h-5 mr-3" />
                        My Profile
                      </Link>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 hover:bg-red-50 text-red-600 font-medium"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-white bg-indigo-600 hover:text-white font-medium px-4 py-2 rounded-2xl"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-50 border-t border-purple-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth */}
            {user ? (
              <div className="pt-4 border-t border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.email[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {user.displayName || user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 text-red-600 font-medium flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-3">
                <Link
                  href="/login"
                  className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-medium"
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
