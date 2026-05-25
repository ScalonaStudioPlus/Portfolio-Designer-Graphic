import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

const images = {
  funko_pop: "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/funko_pop-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Z1bmtvX3BvcC1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc3OTYyOTkyOCwiZXhwIjoxODExMTY1OTI4fQ.UDO7m_0EjRqFepTfkmwWlwRkSPgT7CW-5eJoW_TdqjQ",
  corona: "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/corona.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Nvcm9uYS5wbmciLCJpYXQiOjE3Nzk2Mjk5NDMsImV4cCI6MTgxMTE2NTk0M30.3NG2nZ3G4AwkUYUP9srVSk5cSJMTXRtyiM_JeyMruGU",
  descarga1: "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/descarga%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2Rlc2NhcmdhICgxKS5wbmciLCJpYXQiOjE3Nzk2Mjk5NjEsImV4cCI6MTgxMTE2NTk2MX0.x0BpSyRrv4Rn6xXfN18uwwFAfhOtnspF0EcG5fm4KwU",
  instagram_logo: "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/png-clipart-computer-icons-instagram-black-riviera-instagram-logo-share-icon.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL3BuZy1jbGlwYXJ0LWNvbXB1dGVyLWljb25zLWluc3RhZ3JhbS1ibGFjay1yaXZpZXJhLWluc3RhZ3JhbS1sb2dvLXNoYXJlLWljb24ucG5nIiwiaWF0IjoxNzc5NjMwMDI3LCJleHAiOjE4MTExNjYwMjd9.Q8DDITozVm-yJBGol5usmpEDMgqLb3cTkfZhoBzCo_A",
  images2: "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/images%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2ltYWdlcyAoMikucG5nIiwiaWF0IjoxNzc5NjMwMDUyLCJleHAiOjE4MTExNjYwNTJ9.BW5IjdgUE9j_zAIv0ewjikMd_yLJeUM7tU0puzAVFdE",
  images1: "https://tsmdeowwnelkwmsaodgl.supabase.co/storage/v1/object/sign/web%20portfolio/images%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNTcyOGFhMS0wNmQ3LTQ3YWMtOGFmMy1lMGU0NThlMjJkMTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcG9ydGZvbGlvL2ltYWdlcyAoMSkucG5nIiwiaWF0IjoxNzc5NjMwMDYyLCJleHAiOjE4MTExNjYwNjJ9.v6bHD0pkuMXx0Fs4wJPIAO6SM65ATcAAawP1ESs5AR8"
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeImage(name: string, url: string) {
  console.log(`Fetching image ${name}...`);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Error fetching ${name}: ${res.statusText}`);
    return;
  }
  const buffer = await res.arrayBuffer();
  const base64Data = Buffer.from(buffer).toString("base64");

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
        text: `Describe this image. Be highly detailed. What is its content? If it is a logo, characters, colors, texts, labels, what are they? If it is a Mockup design or has packaging or bottles, please describe it clearly.`
      }
    ]
  });

  console.log(`\n=== DESCRIPTION OF ${name.toUpperCase()} ===`);
  console.log(response.text);
  console.log("========================================\n");
}

async function run() {
  for (const [name, url] of Object.entries(images)) {
    await analyzeImage(name, url);
  }
}

run().catch(console.error);
