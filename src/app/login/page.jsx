"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// import { auth, googleProvider } from "../../../lib/firebase";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { Mail, Lock, User, Loader2, Chrome } from "lucide-react";
import { auth, googleProvider } from "../lib/firebase";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/");
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("Google login failed");
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "Email already registered"
          : err.code === "auth/weak-password"
          ? "Password too weak"
          : err.code === "auth/invalid-credential"
          ? "Wrong email/password"
          : "Login failed"
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mt-4">PhoneZone</h1>
          <p className="text-gray-600">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 rounded-xl py-4 font-medium hover:bg-gray-50 transition"
        >
          <Chrome className="w-6 h-6" /> Continue with Google
        </button>

        <div className="my-6 text-center text-gray-500">or</div>

        <form onSubmit={handleEmailSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="Password (6+ characters)"
            className="w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : isLogin ? (
              "Log In"
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-bold"
          >
            {isLogin ? "Register" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}
