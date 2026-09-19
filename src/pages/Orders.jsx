import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const navigate = useNavigate();
  const [activeOrder, setActiveOrder] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    // Check if an order was placed from checkout
    const savedOrder = localStorage.getItem('everbuy_active_order');
    if (savedOrder) {
      setActiveOrder(JSON.parse(savedOrder));
    }
  }, []);

  const handleCancelOrder = () => {
    setIsCancelling(true);
    
    // Simulate a secure termination process for 1.5 seconds
    setTimeout(() => {
      localStorage.removeItem('everbuy_active_order'); // Delete data
      setActiveOrder(null); // Clear dashboard UI instantly
      setIsCancelling(false); // Reset button state
      
      // Tell the Navbar to instantly remove the green dot
      window.dispatchEvent(new Event('orderTelemetryUpdate')); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0f16] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Live Telemetry Active
            </div>
            <h1 className="text-4xl font-black text-white tracking-wide">Manifest & Routing</h1>
          </div>
          
          <button 
          onClick={() => navigate('/')}
          className="fixed top-60 left-3 sm:left-6 -translate-y-1/2 z-50 flex items-center justify-center gap-2 text-white hover:text-white font-bold transition-all hover:-translate-x-1 bg-white/10 hover:bg-[#f78902] w-9 h-9 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-md"
        >
          <i className="fa-solid fa-arrow-left text-center md:text-base"></i> <span className="hidden text-center sm:inline">Return to Home</span>
        </button>


        </div>

        {activeOrder ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Col: Radar Map & Progress */}
            <div className="md:col-span-2 flex flex-col gap-6">
              
              {/* Fake Radar UI */}
              <div className="bg-[#0f172a] rounded-3xl p-1 border border-white/5 relative overflow-hidden h-[300px] shadow-2xl">
                {/* Radar Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
                {/* Radar Sweep */}
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.2)_90deg,transparent_90deg)] rounded-full animate-[spin-slow_4s_linear_infinite]"></div>
                
                {/* Fake City Map & Route Line */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-full h-full opacity-40" viewBox="0 0 400 200">
                    <path d="M 50 150 Q 150 50 250 100 T 350 50" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" className="animate-[pulse_2s_infinite]" />
                  </svg>
                  {/* Delivery Truck Icon Ping */}
                  <div className="absolute text-emerald-400 text-2xl drop-shadow-[0_0_15px_rgba(16,185,129,1)]">
                    <i className="fa-solid fa-truck-fast"></i>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-emerald-500/30 text-emerald-400 font-mono text-[0.65rem] px-3 py-1.5 rounded-lg">
                  SAT-LINK ESTABLISHED // GPS: 17.3850° N, 78.4867° E
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/5 shadow-xl">
                <h3 className="text-white font-black text-xl mb-8">Routing Protocol</h3>
                <div className="relative flex justify-between items-center">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 rounded-full z-0"></div>
                  {/* Progress Fill */}
                  <div className="absolute top-1/2 left-0 w-[50%] h-1 bg-gradient-to-r from-[#ff9900] to-[#ff3300] -translate-y-1/2 rounded-full z-0 shadow-[0_0_10px_rgba(255,153,0,0.5)]"></div>
                  
                  {/* Steps */}
                  {['Verified', 'Processed', 'Dispatched', 'Delivered'].map((step, idx) => (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx < 3 ? 'bg-[#ff9900] text-white shadow-[0_0_15px_rgba(255,153,0,0.4)]' : 'bg-slate-800 text-slate-500 border-2 border-slate-700'}`}>
                        {idx < 2 ? <i className="fa-solid fa-check"></i> : idx === 2 ? <i className="fa-solid fa-truck-fast text-[0.7rem]"></i> : 4}
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${idx < 3 ? 'text-white' : 'text-slate-600'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Receipt Data */}
            <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/5 shadow-xl flex flex-col h-full">
              <h3 className="text-white tracking-wider font-black text-xl mb-6">Asset Details</h3>
              <div className="flex flex-col gap-4 mb-8 flex-grow">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-slate-500 font-medium">Tracking ID</span>
                  <span className="text-white font-mono font-bold">{activeOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-slate-500 font-medium">Date Initiated</span>
                  <span className="text-white font-bold">{activeOrder.date}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-slate-500 font-medium">Security</span>
                  <span className="text-emerald-400 font-mono text-xs flex items-center gap-1"><i className="fa-solid fa-shield-halved"></i> AES-256</span>
                </div>
              </div>
              {/* Stacked Action Buttons */}
              <div className="mt-auto flex flex-col gap-3">
                <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-xl font-bold transition-all hover:-translate-y-1">
                  Download Encrypted Invoice
                </button>
                
                {/* The new Cinematic Cancel Button */}
                <button 
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className={`w-full py-4 rounded-xl tracking-wider font-bold transition-all flex items-center justify-center gap-2 border ${
                    isCancelling 
                      ? 'bg-red-500/20 text-red-500 border-red-500/50 cursor-wait' 
                      : 'bg-transparent hover:bg-red-500/10 text-red-400 border-red-500/30 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  {isCancelling ? (
                    <>Terminating Manifest <i className="fa-solid fa-circle-notch fa-spin"></i></>
                  ) : (
                    <>Cancel Order <i className="fa-solid fa-ban"></i></>
                  )}
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-[#0f172a] rounded-3xl p-16 text-center border border-white/5 shadow-xl">
            <i className="fa-solid fa-box-open text-6xl text-slate-700 mb-6"></i>
            <h2 className="text-2xl font-black text-white mb-2">No Active Manifests</h2>
            <p className="text-slate-400 font-medium">Your telemetry grid is empty. Initialize an order to begin tracking.</p>
          </div>
        )}
      </div>
    </div>
  );
}