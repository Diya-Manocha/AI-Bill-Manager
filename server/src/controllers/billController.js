import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { extractText } from "../services/orcService.js";
import { processBill } from "../services/aiService.js";
import Bill from "../models/Invoice.js";
import { sendInvoiceEmail } from "../services/emailService.js";
import crypto from "crypto";
import { PLANS } from "../config/Plan.js";
import User from "../models/User.js";

export const uploadBill = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
   const plan = PLANS[user.subscription.plan];

 if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

if (!plan) {
  return res.status(400).json({
    success: false,
    message: "Invalid subscription plan",
  });
}

if (user.subscription.billUsed >= plan.billLimit) {
  return res.status(403).json({
    success: false,
    message: `You have reached your ${plan.name} plan limit of ${plan.billLimit} bills.`,
    limit: plan.billLimit,
    used: user.subscription.billUsed,
  });
}
    console.log(req.file);
    const paymentToken = crypto.randomBytes(32).toString("hex");
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "bill-manager",
    // });
    // const text = await extractText(result.secure_url);
    const text = await extractText(req.file.path);
    const billData = await processBill(text);

    if (!billData.invoiceDate) {
      billData.invoiceDate = new Date();
    }

    const requiredFields = [
      "companyName",
      "customerName",
      "customerEmail",
      "invoiceNumber",
      "amount",
    ];

    for (const field of requiredFields) {
      if (
        billData[field] === undefined ||
        billData[field] === null ||
        billData[field] === ""
      ) {
        return res.status(400).json({
          success: false,
          message: `AI could not extract ${field} from invoice`,
        });
      }
    }

    const bill = new Bill({
      ...billData,
      user: req.user.id,
      // image: result.secure_url,
      paymentToken,
      paymentTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      image: req.file.path,
    });
    await bill.save();
    user.subscription.billUsed += 1;
await user.save();

    try {
      await sendInvoiceEmail({
        to: bill.customerEmail,
        customerName: bill.customerName,
        invoiceNumber: bill.invoiceNumber,
        amount: bill.amount,
        dueDate: bill.dueDate,
        paymentToken: bill.paymentToken,
      });

      console.log("Invoice email sent successfully");
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }
    fs.unlinkSync(req.file.path);
    res.json({
      success: true,
      // image: result.secure_url,
      bill,
      message: "Invoice processed successfully",
    });
  } catch (error) {
    console.error("Message:", error.message);
    console.error("HTTP Code:", error.http_code);
    console.error("Full Error:", JSON.stringify(error, null, 2));
    return res.status(500).json({
      success: false,
      message: "Failed to upload Invoice",
      error: error.message,
    });
  }
};

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }
    res.status(200).json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    await bill.deleteOne();
    res.status(200).json({
      success: true,
      message: "Bill Deleted successfully",
    });
  } catch (error) {}
};

export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    Object.assign(bill, req.body);

    await bill.save();

    res.status(200).json({
      success: true,
      message: "Bill updated successfully",
      bill,
    });
  } catch (error) {}
};

export const canUploadBill = async (req,res) => {
  try{
    const user = await User.findById(req.user.id)
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const plan = PLANS[user.subscription.plan]
    if(!plan){
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan"
      })
    }
    const allowed = user.subscription.billUsed < plan.billLimit
    return res.status(200).json({
      success: true,
      allowed,
      plan: plan.name,
      billUsed: user.subscription.billUsed,
      billLimit: plan.billLimit,
      remaining: Math.max(
        plan.billLimit - user.subscription.billUsed,0
      )
    })
  } catch(error){
    console.error("Error checking upload permission",error)
    return res.status(500).json({
      success: false,
      message: "Failed to check upload permission"
    })
  }
}
