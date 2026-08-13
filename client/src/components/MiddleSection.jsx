import React, { useRef, useState } from "react";
import { UploadCloud, Sparkles } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { uploadBill } from "../apis/billApi";

const data = [
  { name: "1 May", paid: 15, pending: 10, overdue: 5 },
  { name: "8 May", paid: 25, pending: 15, overdue: 5 },
  { name: "15 May", paid: 45, pending: 20, overdue: 10 },
  { name: "22 May", paid: 65, pending: 25, overdue: 8 },
  { name: "29 May", paid: 90, pending: 35, overdue: 12 },
];

const MiddleSection = ({ bills }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only image files are allowed (PNG, JPG, JPEG, WEBP)");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("bill", file);

    try {
      setUploading(true);

      await uploadBill(formData);

      alert("Invoice uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload invoice");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex gap-6">
      <div className="flex-none w-[350px] bg-white rounded-2xl p-6 border border-border shadow-[0_2px_4px_rgba(28,28,40,0.04)]">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} color="#6B4EFF" />
            <h3 className="text-base font-semibold text-text-main">
              Upload New Invoice
            </h3>
          </div>
          <p className="text-[13px] text-text-muted leading-relaxed">
            Upload your invoice and let AI extract the details automatically.
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
        />

        <div
          onClick={handleUploadClick}
          className={`border-2 border-dashed border-primary-light rounded-xl py-8 px-6 flex flex-col items-center justify-center text-center bg-[#F8F7FF] mb-4 transition-all cursor-pointer hover:border-primary hover:bg-primary-light ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <UploadCloud size={32} color="#6B4EFF" className="mb-3" />
          <p className="text-sm text-text-main mb-4 leading-relaxed">
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <>Drag & drop your invoice here</>
                <br />
                or
              </>
            )}
          </p>
          <button
            type="button"
            className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium text-sm transition-colors hover:bg-[#5538EE]"
            disabled={uploading}
          >
            {uploading ? "Processing..." : "Choose File"}
          </button>
        </div>
        <p className="text-center text-xs text-text-light">
          Supports: PDF (Max 10MB)
        </p>
      </div>

      <div className="flex-1 bg-white rounded-2xl p-6 border border-border shadow-[0_2px_4px_rgba(28,28,40,0.04)] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-text-main">Overview</h3>
          <select className="py-1.5 px-3 rounded-lg border border-border font-inherit text-[13px] text-text-main bg-white cursor-pointer">
            <option>This Month</option>
          </select>
        </div>

        <div className="flex gap-4 mb-6 pl-8">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-success"></span> Paid
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-[#F2994A]"></span> Pending
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-danger"></span> Overdue
          </div>
        </div>

        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20C997" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#20C997" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F2994A" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#F2994A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOverdue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5A5F" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#FF5A5F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E4E4EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8F90A6", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8F90A6", fontSize: 12 }}
                tickFormatter={(value) => `₹${value}k`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="paid"
                stroke="#20C997"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPaid)"
              />
              <Area
                type="monotone"
                dataKey="pending"
                stroke="#F2994A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPending)"
              />
              <Area
                type="monotone"
                dataKey="overdue"
                stroke="#FF5A5F"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOverdue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
