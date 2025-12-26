import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import University from "@/models/University";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { universityId, studentName, email, gpa, ielts } = body;

    const university = await University.findById(universityId);
    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    if (
      Number(gpa) < university.gpaRequirement ||
      Number(ielts) < university.ieltsRequirement
    ) {
      return NextResponse.json(
        {
          error:
            "Application Rejected: You do not meet the minimum GPA or IELTS requirement.",
        },
        { status: 400 }
      );
    }

    const newApplication = await Application.create({
      universityId,
      universityName: university.name,
      studentName,
      email,
      gpa,
      ielts,
    });

    return NextResponse.json({
      message: "Application submitted successfully!",
      id: newApplication._id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}
