import React from 'react';
import { Filter, FileText, Eye, Download, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const bills = [
  { id: 'INV-2024-00567', vendor: 'TechMart Solutions', customer: 'Rahul Sharma', amount: '₹70,300.02', date: '04 Jun 2024', status: 'Pending' },
  { id: 'INV-2024-00566', vendor: 'Office Gear India', customer: 'Priya Verma', amount: '₹23,450.00', date: '01 Jun 2024', status: 'Paid' },
  { id: 'INV-2024-00565', vendor: 'Global Supplies', customer: 'Amit Patel', amount: '₹15,780.50', date: '28 May 2024', status: 'Overdue' },
  { id: 'INV-2024-00564', vendor: 'TechMart Solutions', customer: 'Neha Gupta', amount: '₹45,120.75', date: '10 Jun 2024', status: 'Pending' },
  { id: 'INV-2024-00563', vendor: 'Stationery Hub', customer: 'Vikram Singh', amount: '₹8,920.00', date: '15 Jun 2024', status: 'Paid' },
];

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    if (status === 'Paid') return 'bg-success-light text-success';
    if (status === 'Pending') return 'bg-warning-light text-warning-dark';
    return 'bg-danger-light text-danger';
  };
  
  const getDotClass = () => {
    if (status === 'Paid') return 'bg-success';
    if (status === 'Pending') return 'bg-warning-dark';
    return 'bg-danger';
  };

  return (
    <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl text-xs font-medium ${getStatusClass()}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${getDotClass()}`}></span>
      {status}
    </span>
  );
};

const getVendorColor = (index) => {
  if (index % 3 === 0) return 'bg-[#E8F9F3]';
  if (index % 3 === 1) return 'bg-[#FFEBEB]';
  return 'bg-[#FFF8E1]';
};

const RecentBills = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-[0_2px_4px_rgba(28,28,40,0.04)]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FileText size={20} color="#6B4EFF" />
          <h3 className="text-base font-semibold text-text-main">Recent Bills</h3>
        </div>
        
        <div className="flex items-center gap-3">
          <div>
            <input type="text" placeholder="Search bills..." className="py-2 px-3 rounded-lg border border-border text-[13px] w-[250px]" />
          </div>
          <button className="flex items-center gap-1.5 py-2 px-4 bg-primary-light text-primary rounded-lg text-[13px] font-medium border border-primary-light transition-colors hover:bg-primary hover:text-white">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="text-[11px] font-semibold text-text-muted uppercase py-3 px-4 border-b border-border">INVOICE NO.</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase py-3 px-4 border-b border-border">VENDOR / COMPANY</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase py-3 px-4 border-b border-border">CUSTOMER</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase py-3 px-4 border-b border-border">AMOUNT</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase py-3 px-4 border-b border-border">DUE DATE</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase py-3 px-4 border-b border-border">STATUS</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase py-3 px-4 border-b border-border">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index} className="hover:bg-bg transition-colors">
                <td className="py-4 px-4 text-[13px] border-b border-border text-primary font-medium">{bill.id}</td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-md ${getVendorColor(index)}`}></div>
                    {bill.vendor}
                  </div>
                </td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] text-text-muted">👤</div>
                    {bill.customer}
                  </div>
                </td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main font-medium">{bill.amount}</td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <span className="text-xs opacity-70">📅</span>
                    {bill.date}
                  </div>
                </td>
                <td className="py-4 px-4 border-b border-border"><StatusBadge status={bill.status} /></td>
                <td className="py-4 px-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted transition-colors hover:bg-bg hover:text-text-main"><Eye size={16} /></button>
                    <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted transition-colors hover:bg-bg hover:text-text-main"><Download size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-text-muted">Showing 1 to 5 of 24 bills</span>
        <div className="flex items-center gap-1">
          <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-text-main transition-colors hover:bg-bg"><ChevronLeft size={16}/></button>
          <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-white bg-primary">1</button>
          <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-text-main transition-colors hover:bg-bg">2</button>
          <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-text-main transition-colors hover:bg-bg">3</button>
          <span className="flex items-center justify-center w-8 h-8 text-text-muted"><MoreHorizontal size={16}/></span>
          <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-text-main transition-colors hover:bg-bg">5</button>
          <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-text-main transition-colors hover:bg-bg"><ChevronRight size={16}/></button>
        </div>
      </div>
    </div>
  );
};

export default RecentBills;
