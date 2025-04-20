import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    
    if (!data) {
      return NextResponse.json(
        { success: false, error: "No image data provided" },
        { status: 400 }
      );
    }

    const uploadResult = await cloudinary.uploader.upload(data, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url
    });

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { success: false, error: "Image upload failed" },
      { status: 500 }
    );
  }
}
