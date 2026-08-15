import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileText, 
  Bell, 
  BarChart2, 
  Layers, 
  Settings,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ activeTab = 'dashboard', setActiveTab = () => {} }) => {
  return (
    <aside className="w-[280px] bg-white h-screen flex flex-col py-8 px-6 border-r border-border">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
          <Layers size={24} color="#6B4EFF" />
        </div>
        <h2 className="text-xl font-bold text-text-main">AI Bill Manager</h2>
      </div>

      <nav className="flex flex-col gap-2">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-4 py-3 px-4 rounded-xl font-medium cursor-pointer transition-colors ${activeTab === 'dashboard' ? 'bg-primary-light text-primary font-semibold' : 'text-text-muted hover:bg-bg hover:text-text-main'}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div 
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-4 py-3 px-4 rounded-xl font-medium cursor-pointer transition-colors ${activeTab === 'upload' ? 'bg-primary-light text-primary font-semibold' : 'text-text-muted hover:bg-bg hover:text-text-main'}`}
        >
          <UploadCloud size={20} />
          <span>Upload Invoice</span>
        </div>
        <div className="flex items-center gap-4 py-3 px-4 rounded-xl text-text-muted font-medium hover:bg-bg hover:text-text-main cursor-pointer transition-colors">
          <FileText size={20} />
          <span>All Bills</span>
        </div>
        <div className="flex items-center gap-4 py-3 px-4 rounded-xl text-text-muted font-medium hover:bg-bg hover:text-text-main cursor-pointer transition-colors">
          <Bell size={20} />
          <span>Reminders</span>
        </div>
        <div className="flex items-center gap-4 py-3 px-4 rounded-xl text-text-muted font-medium hover:bg-bg hover:text-text-main cursor-pointer transition-colors">
          <BarChart2 size={20} />
          <span>Analytics</span>
        </div>
        <div className="flex items-center gap-4 py-3 px-4 rounded-xl text-text-muted font-medium hover:bg-bg hover:text-text-main cursor-pointer transition-colors">
          <Layers size={20} />
          <span>Categories</span>
        </div>
        <div className="flex items-center gap-4 py-3 px-4 rounded-xl text-text-muted font-medium hover:bg-bg hover:text-text-main cursor-pointer transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </nav>

      <div className="mt-auto flex flex-col gap-6">
        <div className="rounded-2xl p-6 text-white relative overflow-hidden shadow-[0_10px_20px_rgba(74,58,255,0.2)] bg-gradient-to-br from-[#4A3AFF] to-[#291899]">
          <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold">Upgrade to Pro</h3>
              <Sparkles size={16} color="#FFD700" />
            </div>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">Unlock advanced analytics and priority support.</p>
            <Link to="/subscription" className="bg-white text-[#291899] py-2 px-4 rounded-full text-[13px] font-semibold w-full block text-center hover:-translate-y-0.5 transition-transform">
              Upgrade Now &rarr;
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-bg rounded-2xl border border-border">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">DM</div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-text-main mb-0.5">Diya Manocha</h4>
            <span className="text-xs text-text-muted block">Free Plan</span>
          </div>
          <button className="text-text-muted font-bold cursor-pointer">v</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
