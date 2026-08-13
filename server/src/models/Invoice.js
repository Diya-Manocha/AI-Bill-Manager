import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    customerPhone: {
      type: String,
      trim: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      trim: true,
    },

    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    gst: {
      type: Number,
      default: 0,
      min: 0,
    },

    category: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue", "Cancelled"],
      default: "Pending",
    },

    paymentToken: {
      type: String,
      unique: true,
      sparse: true,
    },

    paymentTokenExpiresAt: {
      type: Date,
    },

    paymentClaimedAt: {
      type: Date,
    },

    paidAt: {
      type: Date,
    },

    image: {
      type: String,
      trim: true,
    },
    razorpayOrderId: {
      type: String,
    },
    razorPaymentId: { 
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },

  {
    timestamps: true,
  },
);
billSchema.index({ user: 1, invoiceNumber: 1 }, { unique: true });
const Bill = mongoose.model("Bill", billSchema);

export default Bill;
