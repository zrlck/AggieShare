// app/api/listings/route.ts
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensures fresh data each request

// GET: fetch all listings
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("HackDavis");
    
    const listings = await db.collection("listings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

// POST: create a new listing
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("HackDavis");
    const body = await req.json();
    
    const result = await db.collection("listings").insertOne({
      ...body,
      createdAt: new Date(),
    });
    
    return NextResponse.json({ 
      success: true, 
      insertedId: result.insertedId 
    });
    
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
