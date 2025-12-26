"use client";
import React from "react";
import UniversityCard from "./UniversityCard";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchUniversity({ searchUniversities, hasSearched }) {
  if (!hasSearched) return null;

  if (searchUniversities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <SearchX size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            No Universities Found
          </h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            Sorry, we could not find any universities matching your criteria.
            Try adjusting your search filters or check for typos.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 text-cyan-600 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h1 className="text-4xl text-center font-bold mt-20 mb-8 text-gray-300">
          Search Results ({searchUniversities.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchUniversities.map((uni) => (
            <UniversityCard key={uni._id} uni={uni} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
