import React, { useState } from 'react';
import { Filter, FileText, Eye, Download, ChevronLeft, ChevronRight, X } from 'lucide-react';

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
  const [selectedBill, setSelectedBill] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
  };

  const getBillImageUrl = (imagePath) => {
    if (!imagePath) {
      console.warn('[Bill Preview] No image path found on bill');
      return null;
    }
    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }
    const normalizedPath = imagePath.replace(/\\/g, '/');
    const uploadsIndex = normalizedPath.indexOf('uploads/');
    const publicPath = uploadsIndex >= 0
      ? normalizedPath.slice(uploadsIndex)
      : `uploads/${normalizedPath.replace(/^\/+/, '')}`;
    const encodedPath = publicPath
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');
    const imageUrl = `http://localhost:5000/${encodedPath}`;
    return imageUrl;
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
                    <button
                      type="button"
                      title="View bill"
                      aria-label={`View invoice ${bill.invoiceNumber || ''}`}
                      onClick={() => setSelectedBill(bill)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted transition-colors hover:bg-bg hover:text-text-main"
                    >
                      <Eye size={16} />
                    </button>
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

      {selectedBill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Bill preview"
          onClick={() => setSelectedBill(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="font-semibold text-text-main">{selectedBill.invoiceNumber || 'Bill preview'}</h3>
                <p className="text-xs text-text-muted">{selectedBill.companyName || 'Invoice'}</p>
              </div>
              <button
                type="button"
                title="Close preview"
                aria-label="Close bill preview"
                onClick={() => setSelectedBill(null)}
                className="rounded-lg p-2 text-text-muted transition-colors hover:bg-bg hover:text-text-main"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-bg p-4">
              {getBillImageUrl(selectedBill.image) ? (
                <img
                  src={getBillImageUrl(selectedBill.image)}
                  alt={`Invoice ${selectedBill.invoiceNumber || ''}`}
                  onError={(event) => {
                    console.error('[Bill Preview] Image failed to load:', event.currentTarget.src);
                  }}
                  className="mx-auto h-auto max-h-[70vh] max-w-full rounded-lg object-contain shadow-sm"
                />
              ) : (
                <p className="py-16 text-center text-text-muted">No bill image is available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default RecentBills;
