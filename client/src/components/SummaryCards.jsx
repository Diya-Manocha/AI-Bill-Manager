import React from 'react';
import { FileText, Clock, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

const Card = ({ title, value, change, isPositive, icon: Icon, iconBgClass, iconColorClass, trendColorClass }) => (
  <div className="bg-white rounded-2xl p-6 flex flex-col border border-border shadow-[0_2px_4px_rgba(28,28,40,0.04)] relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(28,28,40,0.08)]">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBgClass} ${iconColorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-sm text-text-muted font-medium mb-2">{title}</h4>
      <div className="text-[28px] font-bold text-text-main mb-3">{value}</div>
      <div className="flex items-center gap-2 text-xs">
        <span className={`flex items-center font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
          <ArrowUpRight size={14} className={!isPositive ? 'rotate-90' : ''} />
          {change}%
        </span>
        <span className="text-text-light">from last month</span>
      </div>
    </div>
    <div className={`absolute -right-2.5 bottom-5 w-[100px] h-10 opacity-80 ${trendColorClass}`}>
       <svg viewBox="0 0 100 30" className="w-full h-full">
         <path d="M0 30 L20 20 L40 25 L60 10 L80 15 L100 0" fill="none" strokeWidth="2" stroke="currentColor" />
       </svg>
    </div>
  </div>
);

const SummaryCards = ({ stats = [] }) => {
  console.log("statssssssssss", stats)
  // const totalBills = bills.length;
  // const pendingAmount = bills.filter(b => b.status === 'Pending').reduce((acc, b) => acc + (b.amount || 0), 0);
  // const paidAmount = bills.filter(b => b.status === 'Paid').reduce((acc, b) => acc + (b.amount || 0), 0);
  // const overdueAmount = bills.filter(b => b.status === 'Overdue').reduce((acc, b) => acc + (b.amount || 0), 0);

  const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(amount) || 0);
};

  return (
    <div className="grid grid-cols-4 gap-6">
      <Card 
        title="Total Bills" 
        value={stats.totalBills} 
        change="12" 
        isPositive={true} 
        icon={FileText} 
        iconBgClass="bg-primary-light"
        iconColorClass="text-primary"
        trendColorClass="text-primary"
      />
      <Card 
        title="Pending Amount" 
        value={formatCurrency(stats.pendingAmount)} 
        change="8" 
        isPositive={false} 
        icon={Clock} 
        iconBgClass="bg-warning-light"
        iconColorClass="text-warning-dark"
        trendColorClass="text-warning-dark"
      />
      <Card 
        title="Paid Amount" 
        value={formatCurrency(stats.paidAmount)} 
        change="18" 
        isPositive={true} 
        icon={CheckCircle2} 
        iconBgClass="bg-success-light"
        iconColorClass="text-success"
        trendColorClass="text-success"
      />
      <Card 
        title="Overdue Amount" 
        value={formatCurrency(stats.overdueAmount)} 
        change="5" 
        isPositive={false} 
        icon={AlertTriangle} 
        iconBgClass="bg-danger-light"
        iconColorClass="text-danger"
        trendColorClass="text-danger"
      />
    </div>
  );
};

export default SummaryCards;
