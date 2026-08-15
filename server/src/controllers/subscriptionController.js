import razorpay from "../config/razorpay.js";
import User from "../models/User.js";
import { PLANS } from "../config/Plan.js";
import { createHmac } from "crypto";

export const getPlans = (req, res) => {
  try {
    const plans = Object.entries(PLANS).map(([id, plan]) => ({
      id,
      ...plan,
    }));
    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const createSubscriptionOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const plan = PLANS[planId];

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    if (planId === "free") {
      return res.status(400).json({
        success: false,
        message: "Free plan does not require payment",
      });
    }

    const order = await razorpay.orders.create({
      amount: plan.price * 100,
      currency: "INR",
      receipt: `sub_${user._id}_${Date.now()}`,
    });
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
      plan: {
        id: planId,
        name: plan.name,
        price: plan.price,
        billLimit: plan.billLimit,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Failed to create subscription order",
    });
  }
};

export const verifySubscriptionPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
    } = req.body;

    const generateSignature = createHmac
      ("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generateSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid",
      });
    }

    const plan = PLANS[planId];

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.subscription = {
      plan: planId,
      billUsed: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Subscription activated successfully",
      subscription: user.subscription,
    });
  } catch (error) {
    console.error("Subscription verification error:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
