import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../apis/axiosInstance";
import { CreditCard, ShieldCheck, Loader2 } from "lucide-react";

const PaymentStatus = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending"); // 'pending', 'success', 'error'

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/payment/create-order/${token}`);
      const { order, key, bill } = response.data;

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "AI Bill Manager",
        description: `Invoice ${bill.invoiceNumber}`,
        order_id: order.id,
        prefill: {
          name: bill.customerName,
          email: bill.customerEmail,
        },
        theme: {
          color: "#6B4EFF",
        },
        handler: async function (response) {
          try {
            const verifyResponse = await api.post("/payment/verify", {
              token,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              setStatus("success");
            }
          } catch (error) {
            console.error(error);
            setStatus("error");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-border p-8 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-success-light rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-success" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main mb-2">Payment Successful</h1>
            <p className="text-text-muted">
              Thank you! Your payment has been securely processed and the invoice is marked as paid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-border p-8 max-w-md w-full text-center space-y-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-light rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary-light rounded-full opacity-50 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CreditCard className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold text-text-main mb-2">Invoice Payment</h1>
          <p className="text-text-muted mb-8">
            Please complete the payment for your invoice. Your transaction is secure and encrypted.
          </p>

          {status === "error" && (
            <div className="bg-danger-light text-danger text-sm p-3 rounded-lg mb-6 border border-danger/20">
              Payment verification failed or was cancelled. Please try again.
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Pay Invoice Now
              </>
            )}
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-light">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure payment powered by Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;