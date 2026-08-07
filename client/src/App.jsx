import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import MiddleSection from './components/MiddleSection';
import RecentBills from './components/RecentBills';

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col gap-6">
          <SummaryCards />
          <MiddleSection />
          <RecentBills />
        </div>
      </main>
    </div>
  );
}

export default App;
