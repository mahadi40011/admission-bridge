import React, { useState } from "react";
import ApplyModal from "./ApplyModal";

export default function UniversityCard({ isNotEligible, uni, onSelect, isSelected }) {
  const [showApply, setShowApply] = useState(false);

  return (
    <div className="relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {isNotEligible && (
        <div className="absolute top-4 right-4 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          Not Eligible
        </div>
      )}

      <h4 className="text-xl font-bold text-gray-800">{uni.name}</h4>
      <p className="text-gray-500 text-sm mb-4">{uni.country}</p>

      <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
        <div>
          <p className="text-gray-400">Tuition Fee</p>
          <p className="font-bold text-blue-600">
            ${uni.tuitionFee.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Min GPA</p>
          <p className="font-bold text-gray-700">{uni.gpaRequirement}</p>
        </div>
        <div>
          <p className="text-gray-400">Min IELTS</p>
          <p className="font-bold text-gray-700">{uni.ieltsRequirement}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />
        <span className="text-sm text-gray-500 italic">Select to compare</span>
      </div>

      <button
        disabled={isNotEligible}
        onClick={() => setShowApply(true)}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          isNotEligible
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Apply Now
      </button>

      {showApply && (
        <ApplyModal uni={uni} onClose={() => setShowApply(false)} />
      )}
    </div>
  );
}
