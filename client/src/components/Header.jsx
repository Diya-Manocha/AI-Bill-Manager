import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 bg-bg">
      <div>
        <h1 className="text-2xl font-bold text-text-main mb-1">Welcome back, Diya 👋</h1>
        <p className="text-sm text-text-muted">Here's what's happening with your invoices today.</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center bg-white border border-border rounded-lg py-2 px-3 w-[300px] gap-2">
          <Search size={18} color="#8F90A6" />
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="border-none outline-none flex-1 text-sm text-text-main placeholder:text-text-muted" 
          />
          <span className="text-xs text-text-light bg-bg py-0.5 px-1.5 rounded border border-border">⌘K</span>
        </div>
        
        <div className="relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border">
          <Bell size={20} color="#8F90A6" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">DM</div>
          <span className="text-sm font-semibold text-text-main">Diya Manocha</span>
          <span className="text-[10px] text-text-muted font-bold">v</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
