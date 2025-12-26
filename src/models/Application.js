import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  universityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  universityName: String,
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  gpa: { type: Number, required: true },
  ielts: { type: Number, required: true },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
