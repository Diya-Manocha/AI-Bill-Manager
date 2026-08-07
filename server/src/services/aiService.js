import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const processBill = async (ocrText) => {
  const prompt = `
Extract the following information from this invoice.

Return ONLY valid JSON.

{
  "companyName": "",
  "customerName": "",
  "customerEmail": "",
  "customerPhone": "",
  "invoiceNumber": "",
  "invoiceDate": "",
  "dueDate": "",
  "amount": 0,
  "gst": 0
}

OCR Text:
${ocrText}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
  });

  const text = completion.choices[0].message.content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};