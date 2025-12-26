"use client";
import { useState, useEffect } from "react";
import UniversityCard from "./UniversityCard";
import CompareModal from "./CompareModal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const [budget, setBudget] = useState(50000);
  const [userGPA, setUserGPA] = useState("");
  const [userIELTS, setUserIELTS] = useState("");
  const [selectedUnis, setSelectedUnis] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch(`/api/universities?budget=${budget}`);
        const data = await res.json();
        setUniversities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchUniversities();
  }, [budget]);

  const handleSelectForCompare = (uni) => {
    const isAlreadySelected = selectedUnis.find((u) => u._id === uni._id);

    if (isAlreadySelected) {
      setSelectedUnis(selectedUnis.filter((u) => u._id !== uni._id));
    } else {
      if (selectedUnis.length < 3) {
        setSelectedUnis([...selectedUnis, uni]);
      } else {
        toast.error("You can compare maximum 3 universities at once.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="text-4xl text-center font-bold mt-20 mb-8 text-gray-300">
          filtered Result ({universities.length})
        </h1>
      </motion.div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-6 z-20"
        >
          <div className=" ">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Filter & Eligibility
            </h3>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Max Tuition Fee:{" "}
                <span className="text-cyan-400">
                  ${Number(budget).toLocaleString()}
                </span>
              </label>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>$5k</span>
                <span>$50k</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your GPA
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3.8"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none text-gray-700"
                  value={userGPA}
                  onChange={(e) => setUserGPA(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your IELTS
                </label>
                <input
                  type="number"
                  placeholder="e.g. 7.0"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none text-gray-700"
                  value={userIELTS}
                  onChange={(e) => setUserIELTS(e.target.value)}
                />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {universities.length > 0 ? (
              universities.map((uni) => {
                const isNotEligible =
                  (userGPA && Number(userGPA) < uni.gpaRequirement) ||
                  (userIELTS && Number(userIELTS) < uni.ieltsRequirement);

                return (
                  <UniversityCard
                    key={uni._id}
                    isNotEligible={isNotEligible}
                    uni={uni}
                    onSelect={() => handleSelectForCompare(uni)}
                    isSelected={selectedUnis.some((u) => u._id === uni._id)}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400">
                No universities found within this budget.
              </div>
            )}
          </div>
          {selectedUnis.length >= 2 && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-orange-600 hover:scale-105 transition-all flex items-center gap-2 animate-bounce"
              >
                Compare Now ({selectedUnis.length})
              </button>
            </div>
          )}
          {isModalOpen && (
            <CompareModal
              selectedUnis={selectedUnis}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
