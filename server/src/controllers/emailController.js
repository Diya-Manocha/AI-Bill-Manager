import { sendInvoiceEmail } from "../services/emailService.js";
import Bill from "../models/Invoice.js"

export const sendBillEmail = async (req, res) => {
  try {
    const {id} = req.params;

   const bill = await Bill.findOne({
    _id: id,
    user: req.user.id
   })

   if(!bill){
    return res.status(404).json({
      success: false,
      message: "Bill not found",
    })
   }

   await sendInvoiceEmail({
    to: bill.customerEmail,
    customerName: bill.customerName,
    invoiceNumber: bill.invoiceNumber,
    amount: bill.amount,
    dueDate: bill.dueDate
   })

   res.status(200).json({
    success: true,
    message: "Invoice send successfully"
   })
  } catch (error) {
    console.error("Email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};