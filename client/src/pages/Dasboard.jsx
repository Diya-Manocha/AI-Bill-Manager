import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import MiddleSection from '../components/MiddleSection';
import RecentBills from '../components/RecentBills';
import Sidebar from '../components/Sidebar';
import { getBills } from '../apis/billApi';

const DashboardLayout = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await getBills();
        if (response.data?.success) {
          setBills(response.data.bills);
        }
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col gap-6">
          <SummaryCards bills={bills} />
          <MiddleSection bills={bills} />
          <RecentBills bills={bills} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;