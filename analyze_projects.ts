import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

async function analyze() {
  const imageUrl = "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/Proyectos.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL1Byb3llY3Rvcy5wbmciLCJpYXQiOjE3Nzk2Mjc3NjMsImV4cCI6MTgxMTE2Mzc2M30.D0r_jwWKJ_Lyu2SEmEf8Izab7-aObC4xJqLCsup-4gk";

  console.log("Fetching image...");
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.statusText}`);
  }
  const buffer = await res.arrayBuffer();
  const base64Data = Buffer.from(buffer).toString("base64");

  console.log("Initializing Gemini API client...");
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  console.log("Sending analysis request to Gemini...");
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
        text: `Analyze this "Proyectos" (Projects) section image from a web portfolio.
Provide a highly detailed structural, typographic, visual, and textual specification.

Focus on:
1. OVERALL COMPOSITION: How is the page split? Grid, columns, background colors, cards, layout? Is it a split section? Left vs right?
2. BACKGROUNDS AND LINES: What patterns, solid colors, text elements, grids, or background elements are behind the elements? Does it have a specific dark or light background? Any torn paper or transitions?
3. TITLES & HEADING: What is the main title? Exact text, casing (all-caps?), font weight, color, size. Is there a big text at the top or side?
4. PROJECT ITEMS / CARDS SHOWCASE:
   - Detail the cards exactly: what text is inside them? What typography, headings, sub-headings, paragraphs?
   - Any images, mockups, or figures in the cards?
   - Look at 'logo2.png' (logo), 'IMG-20260325-WA0076_1_-removebg-preview.png' (character figure or icon), and 'mockup2.png' (mockup of device / screen). How are they positioned in this composition?
5. DECORATIONS & BADGES: Any buttons? What is the text on the buttons? Hover states, icons, tags, badge seals, colors, tracking, alignment?
6. EXACT REPLICA ADVICE: Provide CSS/Tailwind recommendations to make it look incredibly high-end, cinematographic, and identical to the original image structure.`
      }
    ]
  });

  console.log("\n--- GEMINI ANALYSIS OF PROJECTS SECTION ---");
  console.log(response.text);
  console.log("-------------------------------------------\n");
}

analyze().catch(console.error);
