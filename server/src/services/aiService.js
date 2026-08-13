import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const processBill = async (ocrText) => {
  const prompt = `
You are an expert invoice data extraction system.

Read the OCR text below and extract the invoice information.

IMPORTANT:
Return ONLY valid JSON.
Do not return markdown.
Do not return explanations.
Do not add extra fields.

The JSON MUST contain exactly these fields:

{
  "companyName": null,
  "customerName": null,
  "customerEmail": null,
  "customerPhone": null,
  "invoiceNumber": null,
  "invoiceDate": null,
  "dueDate": null,
  "amount": null,
  "gst": null
}

EXTRACTION RULES:

1. companyName
   Extract the company/business that issued the invoice.
   Look at the top/header of the invoice.

2. customerName
   Extract the customer/person/company under "Bill To".

3. customerEmail
   Extract the customer's email from the "Bill To" section.
   Do NOT use the seller's email.

4. customerPhone
   Extract the customer's phone number from the "Bill To" section.

5. invoiceNumber
   Extract the value next to "Invoice No." or "Invoice Number".
   Example:
   "Invoice No: INV-2024-01125"
   should return:
   "INV-2024-01125"

6. invoiceDate
   Extract ONLY the date next to "Invoice Date".
   Convert it to YYYY-MM-DD.

   Example:
   "Invoice Date: 28 May 2025"
   must become:
   "2025-05-28"

   IMPORTANT:
   Do NOT use the invoice number to determine the invoice date.

7. dueDate
   Extract ONLY the date next to "Due Date".
   Convert it to YYYY-MM-DD.

   Example:
   "Due Date: 14 June 2025"
   must become:
   "2025-06-14"

8. amount
   Extract the FINAL "Total Amount" from the invoice.
   Do NOT use subtotal.

   Example:
   "Total Amount ₹54,514.82"
   should return:
   54514.82

   Return a NUMBER, not a string.

9. gst
   Extract the total GST amount.

   If the invoice has:
   CGST = 4157.91
   SGST = 4157.91

   then:
   gst = 8315.82

   Return a NUMBER.

10. If a field cannot be found, return null.

11. NEVER return:
   "Not explicitly mentioned"
   "Not available"
   "Unknown"
   or any other explanation.

12. Be extremely careful with OCR errors.

OCR TEXT:
${ocrText}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You extract structured data from invoices. Always return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
      response_format: {
        type: "json_object",
      },
    });

    const text = completion.choices[0].message.content;

    console.log("========== GROQ RESPONSE ==========");
    console.log(text);

    const billData = JSON.parse(text);

    console.log("========== BILL DATA ==========");
    console.log(billData);

    return billData;
  } catch (error) {
    console.error("AI processing error:", error);
    throw error;
  }
};