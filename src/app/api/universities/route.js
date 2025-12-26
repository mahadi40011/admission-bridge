import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import University from "@/models/University";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const budget = searchParams.get("budget");
    const country = searchParams.get("country");
    const degree = searchParams.get("degree");

    let filter = {};

    if (budget) {
      filter.tuitionFee = { $lte: Number(budget) };
    }

    if (country && country !== "undefined" && country !== "") {
      filter.country = { $regex: country, $options: "i" };
    }

    if (degree && degree !== "undefined" && degree !== "") {
      filter.degree = degree;
    }

    const universities = await University.find(filter);

    return NextResponse.json(universities);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
