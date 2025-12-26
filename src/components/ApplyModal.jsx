"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApplyModal({ uni, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    gpa: "",
    ielts: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = () => {
    if (formData.studentName && formData.email) setStep(2);
    else alert("Please fill in your name and email.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, universityId: uni._id }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Success! Your application has been submitted.");
      onClose();
    } else {
      setErrorMsg(data.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="w-[92%] bg-gray-100 h-1 mb-6 rounded-full overflow-hidden">
          <div
            className="bg-cyan-400 h-full transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          ></div>
        </div>

        <h2 className="text-xl font-bold text-gray-600 mb-4">
          Apply to {uni.name}
        </h2>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 tracking-wider">
                Step 1: Personal Info
              </h3>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="studentName"
                    className="text-xs font-semibold text-gray-400 ml-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full p-3 border text-gray-800 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition-all placeholder:text-gray-400"
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData({ ...formData, studentName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-400 ml-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full p-3 border text-gray-800 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition-all placeholder:text-gray-400"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleNext}
                    disabled={!formData.studentName || !formData.email}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all duration-200 ${
                      !formData.studentName || !formData.email
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-100"
                        : "bg-cyan-500 text-white hover:bg-cyan-600 shadow-md shadow-cyan-100 active:scale-95"
                    }`}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 tracking-wider">
                Step 2: Academic Info
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 ml-1">
                      Your GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g 3.80"
                      className="w-full p-3 border text-gray-800 border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-cyan-400"
                      value={formData.gpa}
                      onChange={(e) =>
                        setFormData({ ...formData, gpa: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 ml-1">
                      Your IELTS
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="e.g 7.0"
                      className="w-full p-3 border text-gray-800 border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-cyan-400"
                      value={formData.ielts}
                      onChange={(e) =>
                        setFormData({ ...formData, ielts: e.target.value })
                      }
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                    {errorMsg}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 cursor-pointer outline outline-gray-200 text-gray-500 font-bold hover:bg-gray-300 bg-gray-100 rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.gpa || !formData.ielts}
                    className={`flex-2 py-3 rounded-xl font-bold transition-all duration-200 ${
                      loading || !formData.gpa || !formData.ielts
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                        : "bg-cyan-400 text-white cursor-pointer hover:bg-cyan-600 shadow-lg shadow-cyan-200 active:scale-95"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Verifying...
                      </span>
                    ) : (
                      "Confirm & Submit"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onClose}
          className="absolute top-6 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-lg  px-2 ml-2 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
