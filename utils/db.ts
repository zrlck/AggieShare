import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Get recent listings (latest 4)
export async function getRecentListings() {
  try {
    const client = await clientPromise;
    const db = client.db("HackDavis");
    
    return db.collection("listings")
      .find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .toArray();
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

// Get a specific listing by ID
export async function getListingById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("HackDavis");
    
    return db.collection("listings").findOne({ 
      _id: new ObjectId(id) 
    });
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

// Get all listings
export async function getAllListings() {
  try {
    const client = await clientPromise;
    const db = client.db("HackDavis");
    
    return db.collection("listings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}
