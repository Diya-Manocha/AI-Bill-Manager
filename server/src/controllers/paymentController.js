import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Bill from "../models/Invoice.js";

export const createPaymentOrder = async (req, res) => {
  try {
    const { token } = req.params;

    const bill = await Bill.findOne({
      paymentToken: token,
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (bill.status === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Invoice is already paid",
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(bill.amount * 100),
      currency: "INR",
      receipt: bill.invoiceNumber,
      notes: {
        invoiceNumber: bill.invoiceNumber,
        invoiceId: bill._id.toString(),
      },
    });

    bill.razorpayOrderId = order.id;

    await bill.save();

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
      bill: {
        invoiceNumber: bill.invoiceNumber,
        amount: bill.amount,
        customerName: bill.customerName,
        customerEmail: bill.customerEmail,
      },
    });

  } catch (error) {
    console.error("Create payment order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
      error: error.message,
    });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const {
      token,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const bill = await Bill.findOne({
      paymentToken: token,
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    bill.razorpayOrderId = razorpay_order_id;
    bill.razorpayPaymentId = razorpay_payment_id;
    bill.paymentStatus = "Paid";
    bill.status = "Paid";

    await bill.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error("Payment verification error:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};