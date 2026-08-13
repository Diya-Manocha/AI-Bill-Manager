import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


export const sendInvoiceEmail = async ({
    to,
    customerName,
    invoiceNumber,
    amount,
    dueDate,
}) => {
    const mailOptions = {
         from: process.env.EMAIL_USER,
    to,
    subject: `Invoice ${invoiceNumber}`,
    html: `
      <h2>Invoice Notification</h2>

      <p>Dear ${customerName},</p>

      <p>Your invoice has been generated successfully.</p>

      <p><strong>Invoice:</strong> ${invoiceNumber}</p>
      <p><strong>Amount:</strong> ₹${amount}</p>
      <p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>

      <p>Thank you.</p>
    `,
    }
    return await transporter.sendMail(mailOptions)
}