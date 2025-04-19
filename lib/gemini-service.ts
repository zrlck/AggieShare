import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// Available categories from your application
const availableCategories = [
  "Clothing",
  "School Supplies",
  "Electronics",
  "Kitchenware",
  "Food",
  "Drinks",
  "Furniture",
  "Books & Media",
  "Health & Beauty",
  "Dorm Essentials"
];

export async function analyzeImageWithGemini(imageBase64: string): Promise<string[]> {
  try {
    // Get the Gemini model (using Gemini 2.0 Flash for fast responses)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Remove the data URL prefix if it exists
    const base64Data = imageBase64.includes(',') 
      ? imageBase64.split(',')[1] 
      : imageBase64;
    
    // Construct the prompt for categorization
    const prompt = `Analyze this image and suggest which 1-3 categories it belongs to from this list: ${availableCategories.join(", ")}. 
    Respond ONLY with the category names separated by commas, nothing else.`;
    
    // Call the Gemini API
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data
              }
            }
          ]
        }
      ]
    });
    
    // Parse the response
    const responseText = result.response.text().trim();
    
    // Split the response by commas and filter out any invalid categories
    const suggestedCategories = responseText
      .split(",")
      .map(cat => cat.trim())
      .filter(cat => availableCategories.includes(cat));
    
    // Return 1-3 valid categories, or a default if none match
    return suggestedCategories.length > 0 
      ? suggestedCategories.slice(0, 3) 
      : ["Miscellaneous"];
      
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    return ["Miscellaneous"]; // Default fallback category
  }
}