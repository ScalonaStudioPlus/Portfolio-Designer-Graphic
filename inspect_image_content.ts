import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

async function inspectImg() {
  const imageUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/IMG-20260325-WA0076_1_-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL0lNRy0yMDI2MDMyNS1XQTAwNzZfMV8tcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3Nzk2Mjc4ODUsImV4cCI6MTgxMTE2Mzg4NX0.BKwtqRwE7VReaFwfsM1y12ybDHPcEEoJx6efvpnO_uc";

  console.log("Fetching transparent image...");
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.statusText}`);
  }
  const buffer = await res.arrayBuffer();
  const base64Data = Buffer.from(buffer).toString("base64");

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log("Asking Gemini to describe the image content...");

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Data,
        }
      },
      {
        text: `Describe exactly what is in this transparent background image. Is it a person? What are they wearing? What are they holding? Describe their expression and pose.`
      }
    ]
  });

  console.log("\n--- IMAGE INSTRUCTION DESCRIPTION ---");
  console.log(response.text);
  console.log("---------------------------------------\n");
}

inspectImg().catch(console.error);
