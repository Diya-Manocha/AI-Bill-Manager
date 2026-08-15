import React, { useEffect, useState } from "react";
import { ArrowsUpFromLine, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getPlans, createSubscriptionOrder, verifySubscriptionPayment } from "../apis/subscriptionApi";

export default function Subscription() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlans();
        setPlans(response.data.plans);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlans();
  }, []);

  const handleChoosePlan = async (plan) => {
    try {
      // Free plan doesn't need Razorpay
      if (plan.id === "free") {
        navigate("/");
        return;
      }

      // 1. Create Razorpay order
      const response = await createSubscriptionOrder(plan.id);

      console.log("Order response:", response.data);

      const { order, key } = response.data;

      // 2. Razorpay Checkout options
      const options = {
        key: key,

        amount: order.amount,

        currency: order.currency,

        name: "AI Bill Manager",

        description: `${plan.name} Subscription`,

        order_id: order.id,

        // ⭐ THIS IS WHERE YOUR HANDLER GOES
        handler: async function (paymentResponse) {
          try {
            console.log("Payment successful:", paymentResponse);

            // 3. Send Razorpay payment details to backend
            const verifyResponse = await verifySubscriptionPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,

              razorpay_payment_id: paymentResponse.razorpay_payment_id,

              razorpay_signature: paymentResponse.razorpay_signature,

              planId: plan.id,
            });

            console.log("Verification response:", verifyResponse.data);

            // 4. Backend verified payment
            if (verifyResponse.data.success) {
              alert("Subscription activated successfully!");

              navigate("/");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);

            alert("Payment verification failed");
          }
        },

        prefill: {
          name: "Rahul Sharma",
          email: "rahul.sharma@yopmail.com",
        },

        theme: {
          color: "#6B4EFF",
        },
      };

      // 5. Open Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
        <Header />
        <div className="flex-1 overflow-y-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-xl text-slate-500">
                Choose the perfect plan for your AI Bill Manager needs. No
                hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {plan.name}
                    </h3>

                    <p className="text-slate-500 text-sm mt-2">
                      {plan.billLimit} bills per month
                    </p>
                  </div>

                  <div className="mb-6 flex items-baseline text-slate-900">
                    <span className="text-5xl font-extrabold">
                      ₹{plan.price}
                    </span>

                    <span className="text-lg text-slate-500 ml-1">
                      /{plan.duration}
                    </span>
                  </div>

                  <div className="flex-1 mb-8">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3" />
                      <span className="text-slate-600">
                        Upload up to {plan.billLimit} bills
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleChoosePlan(plan)}
                    className="w-full py-4 px-6 rounded-xl font-medium bg-primary text-white"
                  >
                    {plan.price === 0 ? "Get Started" : "Choose Plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
