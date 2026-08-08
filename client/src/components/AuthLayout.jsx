import React from 'react';
import { FileText, UploadCloud, Sparkles, BarChart2, PieChart, TrendingUp, ShieldCheck, FileKey, Receipt } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-inter">
      {/* Left Sidebar - Visual/Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B192C 0%, #112D4E 100%)' }}>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
           {/* Grid pattern overlay */}
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>

        <div className="relative z-10 p-12 flex flex-col h-full">
          {/* Logo area */}
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              <span className="text-blue-400">AI</span> Bill Manager
            </span>
          </div>

          {/* Value proposition text */}
          <div className="max-w-xl mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
              Smart. Fast. Accurate. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Invoice Management.
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed font-light">
              Upload invoices, extract data using AI, and manage your bills effortlessly.
            </p>
          </div>

          {/* Central graphic composite */}
          <div className="relative flex-1 flex items-center justify-center min-h-[300px]">
            {/* Dashboard Mockup */}
            <div className="absolute w-[400px] h-[250px] bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-4 left-0 top-1/2 -translate-y-1/2 overflow-hidden flex shadow-[0_0_50px_rgba(37,99,235,0.15)]">
              {/* Sidebar */}
              <div className="w-16 border-r border-slate-700/50 flex flex-col items-center py-4 gap-6">
                <div className="w-8 h-8 bg-slate-700 rounded-lg" />
                <div className="w-6 h-6 bg-slate-700/50 rounded" />
                <div className="w-6 h-6 bg-slate-700/50 rounded" />
                <div className="w-6 h-6 bg-slate-700/50 rounded" />
              </div>
              {/* Main content */}
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="flex gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-slate-600" />
                  <div className="w-3 h-3 rounded-full bg-slate-600" />
                  <div className="w-3 h-3 rounded-full bg-slate-600" />
                </div>
                
                {/* Stats cards */}
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 relative overflow-hidden">
                  <p className="text-xs text-slate-400 mb-1">Total Bills</p>
                  <div className="flex items-end gap-3">
                    <p className="text-2xl font-bold text-white">1,248</p>
                    <span className="text-xs text-emerald-400 mb-1">↑ 18.6%</span>
                  </div>
                  {/* Fake chart line */}
                  <svg className="absolute bottom-2 right-2 w-24 h-10" viewBox="0 0 100 40">
                    <path d="M0 40 L20 25 L40 30 L60 10 L80 15 L100 0" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1 bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-l-slate-600" />
                  </div>
                  <div className="flex-1 bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 flex flex-col gap-2 justify-center">
                    <div className="h-2 w-full bg-slate-600 rounded-full" />
                    <div className="h-2 w-3/4 bg-slate-600 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning Invoice Overlay */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[220px] bg-slate-100 rounded-xl shadow-2xl p-5 z-20 transform translate-x-10 scale-110 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Scan corners */}
              <div className="absolute top-[-10px] left-[-10px] w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg" />
              <div className="absolute top-[-10px] right-[-10px] w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg" />
              <div className="absolute bottom-[-10px] left-[-10px] w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg" />
              <div className="absolute bottom-[-10px] right-[-10px] w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg" />
              
              {/* Scan line effect */}
              <div className="absolute top-1/2 left-[-20px] right-[-20px] h-[2px] bg-blue-500 shadow-[0_0_15px_3px_rgba(59,130,246,0.6)] z-30 flex items-center justify-center">
                <div className="w-full h-10 bg-gradient-to-b from-transparent to-blue-500/20 absolute bottom-0 translate-y-[1px]" />
              </div>

              <div className="border-b border-slate-200 pb-3 mb-3 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 tracking-wider">INVOICE</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="h-2.5 w-3/4 bg-slate-300 rounded-full" />
                <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                <div className="h-2 w-full bg-slate-200 rounded-full mt-2" />
                <div className="h-2 w-full bg-slate-200 rounded-full" />
                <div className="h-2 w-5/6 bg-slate-200 rounded-full" />
                
                <div className="flex justify-between items-end mt-4">
                  <div className="h-2 w-1/3 bg-slate-200 rounded-full" />
                  <span className="text-2xl font-bold text-slate-800 leading-none">$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features bottom section */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="flex gap-4 items-start group">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 group-hover:border-blue-500/50 transition-colors">
                <UploadCloud className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Upload</h3>
                <p className="text-slate-400 text-xs">Upload your invoices</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start group">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 group-hover:border-purple-500/50 transition-colors">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">AI Extract</h3>
                <p className="text-slate-400 text-xs">AI extracts key information</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 group-hover:border-emerald-500/50 transition-colors">
                <BarChart2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Manage</h3>
                <p className="text-slate-400 text-xs">View, edit and track bills</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[480px]">
          {children}
        </div>
      </div>
    </div>
  );
}
