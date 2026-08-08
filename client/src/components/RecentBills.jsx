import React from 'react';
import { Filter, FileText, Eye, Download, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

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

const RecentBills = ({ bills = [], loading }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
  };

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
        {loading ? (
          <div className="py-8 text-center text-text-muted">Loading bills...</div>
        ) : bills.length === 0 ? (
          <div className="py-8 text-center text-text-muted">No recent bills found.</div>
        ) : (
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
              <tr key={bill._id || index} className="hover:bg-bg transition-colors">
                <td className="py-4 px-4 text-[13px] border-b border-border text-primary font-medium">{bill.invoiceNumber || 'N/A'}</td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-md ${getVendorColor(index)}`}></div>
                    {bill.companyName || 'N/A'}
                  </div>
                </td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] text-text-muted">👤</div>
                    {bill.customerName || 'N/A'}
                  </div>
                </td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main font-medium">{formatCurrency(bill.amount)}</td>
                <td className="py-4 px-4 text-[13px] border-b border-border text-text-main">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <span className="text-xs opacity-70">📅</span>
                    {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : (bill.invoiceDate ? new Date(bill.invoiceDate).toLocaleDateString() : 'N/A')}
                  </div>
                </td>
                <td className="py-4 px-4 border-b border-border"><StatusBadge status={bill.status || 'Pending'} /></td>
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
        )}
      </div>

      {!loading && bills.length > 0 && (
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-text-muted">Showing 1 to {Math.min(bills.length, 5)} of {bills.length} bills</span>
          <div className="flex items-center gap-1">
            <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-text-main transition-colors hover:bg-bg"><ChevronLeft size={16}/></button>
            <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-white bg-primary">1</button>
            <button className="min-w-8 h-8 rounded-lg flex items-center justify-center text-[13px] text-text-main transition-colors hover:bg-bg"><ChevronRight size={16}/></button>
          </div>
        </div>
      )}
    </div>
  );
};


export default RecentBills;
