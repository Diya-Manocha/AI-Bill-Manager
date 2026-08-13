import Bill from "../models/Invoice.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const bills = await Bill.find({ user: userId }).sort({ createdAt: -1 });
    const totalBills = bills.length;
    const totalAmount = bills.reduce((total, bill) => total + bill.amount, 0);
    const paidBills = bills.filter((bill) => bill.status === "Paid");
    const pendingBills = bills.filter((bill) => bill.status === "Pending");
    const overdueBills = bills.filter((bill) => bill.status === "Overdue");
    const paidAmount = paidBills.reduce(
      (total, bill) => total + bill.amount,
      0,
    );
    const pendingAmount = pendingBills.reduce(
      (total, bill) => total + bill.amount,
      0,
    );
    const overdueAmount = overdueBills.reduce(
      (total, bill) => total + bill.amount,
      0,
    );
    res.status(200).json({
      success: true,
      stats: {
        totalBills,
        totalAmount,
        paidAmount,
        pendingAmount,
        overdueAmount,
      },
      recentBills: bills.slice(0, 5),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};
