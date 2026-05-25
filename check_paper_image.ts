import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

async function checkPaper() {
  const paperTransitionUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/paper.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL3BhcGVyLnBuZyIsImlhdCI6MTc3OTYyNjExMiwiZXhwIjoxODExMTYyMTEyfQ.1fcE4I6W7YaVZqGkEs6RT61vr49mgfRqSn2KK4WM8uU";

  console.log("Fetching paper image...");
  const res = await fetch(paperTransitionUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch paper image: ${res.statusText}`);
  }
  const buffer = await res.arrayBuffer();
  const base64Data = Buffer.from(buffer).toString("base64");

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log("Asking Gemini to describe paperUrl content...");

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
        text: `Describe this image. What are its colors? Is it a white/grey torn paper or is it a red and yellow banner/stripe? Be highly specific.`
      }
    ]
  });

  console.log("\n--- CURRENT PAPER IMAGE DESCRIPTION ---");
  console.log(response.text);
  console.log("---------------------------------------\n");
}

checkPaper().catch(console.error);
