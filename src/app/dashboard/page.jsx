"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome back!</h1>
        <p className="mt-4 text-xl">You are logged in to PhoneZone</p>
      </div>
    </div>
  );
}
