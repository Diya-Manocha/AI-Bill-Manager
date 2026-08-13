import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import MiddleSection from "../components/MiddleSection";
import RecentBills from "../components/RecentBills";
import Sidebar from "../components/Sidebar";
import UploadInvoice from "../components/UploadInvoice";
import { getBills } from "../apis/billApi";
import { getDashboard } from "../apis/dashboardApi";

const DashboardLayout = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardResponse, billsResponse] = await Promise.all([
          getDashboard(),
          getBills(),
        ]);

        if (dashboardResponse?.success) {
          setStats(dashboardResponse.stats);

        }
        if (billsResponse.data?.success) {
          setBills(billsResponse.data?.bills);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData()
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col gap-6">
          {activeTab === 'dashboard' ? (
            <>
              <SummaryCards stats={stats} />
              <MiddleSection bills={bills} />
              <RecentBills bills={bills} loading={loading} />
            </>
          ) : activeTab === 'upload' ? (
            <div className="flex-1 flex items-center justify-center h-full">
              <UploadInvoice />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-muted">
              Coming soon
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
