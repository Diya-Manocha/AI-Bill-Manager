import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Keep the model configurable so provider migrations do not require a code change.
// The previous Llama 3.3 model is no longer available to free/developer-tier keys.
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const isMissingValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" &&
    /^(not explicitly mentioned|not available|unknown|null|n\/a)$/i.test(
      value.trim(),
    ));

// Tesseract often preserves the name immediately following a "Bill To"-like
// heading even when the LLM misses it. Keep this fallback deliberately narrow
// so we never turn an arbitrary invoice line into a customer name.
const customerNameFromOcr = (ocrText) => {
  const lines = ocrText
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const sectionLabel = /^(bill\s*to|billed\s*to|customer|client|buyer|consignee|recipient)\s*:?[\s|]*/i;
  const fieldLabel = /^(email|e-?mail|phone|mobile|address|gstin|invoice|ship\s*to)\b/i;

  for (let index = 0; index < lines.length; index += 1) {
    if (!sectionLabel.test(lines[index])) continue;

    const candidate = lines[index].replace(sectionLabel, "").trim();
    if (candidate && !fieldLabel.test(candidate) && !/^[\d,.-]+$/.test(candidate)) {
      return candidate;
    }

    for (let next = index + 1; next < Math.min(index + 4, lines.length); next += 1) {
      const nextLine = lines[next];
      if (fieldLabel.test(nextLine)) break;
      if (/^[\p{L}][\p{L} .,'&()-]{1,80}$/u.test(nextLine)) return nextLine;
    }
  }

  return null;
};

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
   Extract the customer/person/company from the buyer section. The section may
   be labeled "Bill To", "Billed To", "Customer", "Client", "Buyer",
   "Consignee", or "Recipient". OCR may damage or omit the label, so also use
   the name directly above the customer's address/email/phone when the layout
   clearly separates it from the seller's header and contact details.
   Do not use the seller/company name as customerName.

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

10a. Never return null for customerName when a plausible name is visible in the
     buyer/customer block, even if the block has no heading.

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
      model: GROQ_MODEL,
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

    // Normalize common model placeholders to null and recover a name when
    // OCR retained a clearly labeled customer section.
    for (const [field, value] of Object.entries(billData)) {
      if (isMissingValue(value)) billData[field] = null;
    }
    if (isMissingValue(billData.customerName)) {
      billData.customerName = customerNameFromOcr(ocrText);
    }

    console.log("========== BILL DATA ==========");
    console.log(billData);

    return billData;
  } catch (error) {
    console.error("AI processing error:", error);
    throw error;
  }
};
