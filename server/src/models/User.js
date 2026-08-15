import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
  {
    subscription: {
      plan: {
        type: String,
        enum: ["free", "basic", "pro", "business"],
        default: "free",
      },
      status: {
        type: String,
        enum: ["active", "cancelled", "expired", "pending"],
        default: "pending",
      },
      razorpaySubscriptionId: {
        type: String,
        default: null,
      },
      currentPeriodStart: {
        type: Date,
        default: Date.now(),
      },
      currentPeriodEnd: {
        type: Date,
      },

      billUsed: {
        type: Number,
        default: 0,
      },
    },
  },
);

const User = mongoose.model("User", userSchema);

export default User;
