import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  degree: { type: String, required: true },
  tuitionFee: { type: Number, required: true },
  gpaRequirement: { type: Number, required: true },
  ieltsRequirement: { type: Number, required: true },
});

const University =
  mongoose.models.University || mongoose.model("University", UniversitySchema);

export default University;
