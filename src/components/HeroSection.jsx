"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import SearchUniversity from "./SearchUniversity";
import toast from "react-hot-toast";

export default function HeroSection() {
  const [searchUniversities, setSearchUniversities] = useState([]);
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!country && !degree) {
      toast.error("Please select a Country or Degree level first!");
      return;
    }

    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (country) query.append("country", country);
      if (degree) query.append("degree", degree);

      const res = await fetch(`/api/universities?${query.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setSearchUniversities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setSearchUniversities([]);
    } finally {
      setLoading(false);
      setHasSearched(true)
    }
  };
 
  return (
    <>
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/university.png"
            alt="University Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 tracking-tight"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight shadow-sm">
            The Admission <span className="text-cyan-400">Bridge</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto opacity-90">
            Find the best university according to your academic score and
            budget. Your dreams are now within reach.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-4xl bg-white/15 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-blue-50 text-sm font-medium mb-2">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white text-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition-all cursor-pointer"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-50 text-sm font-medium mb-2">
                Degree Level
              </label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full bg-white text-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition-all cursor-pointer"
              >
                <option value="">Select Degree</option>
                <option value="Bachelor's">Bachelor&apos;s</option>
                <option value="Master's">Master&apos;s</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-cyan-500/30 transition-all active:scale-95 text-center"
            >
              Search Universities
            </button>
          </div>
        </motion.div>
      </section>
      <SearchUniversity
        hasSearched={hasSearched}
        searchUniversities={searchUniversities}
      />
    </>
  );
}
