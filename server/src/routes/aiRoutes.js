import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/suggest", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" }, // 🔥 FORCE JSON
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON with keys: priority (Low, Medium, High) and description.",
        },
        {
          role: "user",
          content: `Task: ${title}`,
        },
      ],
      temperature: 0.4,
    });

    let aiText = completion.choices[0].message.content;

    // 🧹 Remove markdown wrappers if any
    aiText = aiText.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.error("JSON Parse Error:", err);

      parsed = {
        priority: "Medium",
        description: aiText,
      };
    }

    // 🛡 Ensure safe output structure
    const safeResponse = {
      priority: ["Low", "Medium", "High"].includes(parsed.priority)
        ? parsed.priority
        : "Medium",
      description: parsed.description || "No description generated.",
    };

    console.log("Sending to frontend:", safeResponse);

    res.json(safeResponse);
  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ message: "Groq AI failed" });
  }
});

export default router;