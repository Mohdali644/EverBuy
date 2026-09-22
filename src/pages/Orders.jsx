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
    // Dynamic padding-top to clear the Navbar on all screen sizes
    <div className="min-h-screen bg-[#0a0f16] pt-[170px] sm:pt-[140px] md:pt-[120px] pb-16 px-4 sm:px-6 md:px-8 font-sans text-base">
      
      <div className="max-w-[1100px] mx-auto">
        
        {/* FIXED HEADER: The button is now inside the flex container on desktop so it NEVER collides with text */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-white/10 pb-6 mb-8 sm:mb-10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 mt-4 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[0.65rem] sm:text-xs font-black uppercase tracking-widest rounded-full mb-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Live Telemetry Active
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-wide leading-tight">Manifest & Routing</h1>
          </div>

          {/* CHAMELEON BUTTON: Perfect Mobile FAB & Sleek Desktop Pill */}
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center justify-center gap-2 text-white font-bold transition-all duration-300 shrink-0
              /* MOBILE STATE: Perfect Floating Action Circle */
              fixed z-[100] bottom-6 right-5 sm:bottom-8 sm:right-8 w-14 h-14 p-0
              bg-gradient-to-r from-[#ff9900] to-[#ff3300] rounded-full 
              shadow-[0_12px_30px_rgba(255,153,0,0.4)] active:scale-95
              
              /* DESKTOP STATE: Static Glassmorphism Pill */
              md:static md:w-auto md:h-auto mt-11 md:px-6 md:py-2.5 
              md:bg-none md:bg-white/10 md:hover:bg-[#fe8505] 
              md:border md:border-white/20 backdrop-blur-md md:shadow-md md:hover:-translate-x-1"
          >
            <i className="fa-solid fa-arrow-left text-xl md:text-base md:group-hover:-translate-x-2 transition-transform duration-300"></i> 
            <span className="hidden md:inline">Return to Store</span>
          </button>
        </div>

        {activeOrder ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Left Col: Radar Map & Progress */}
            <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
              
              {/* Fake Radar UI - Fluid responsive scaling */}
              <div className="bg-[#0f172a] rounded-[24px] sm:rounded-[32px] p-1 border border-white/5 relative overflow-hidden h-[250px] sm:h-[300px] md:h-[350px] shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] opacity-30"></div>
                
                <div className="absolute top-1/2 left-1/2 w-[200%] aspect-square max-w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.2)_90deg,transparent_90deg)] rounded-full animate-[spin-slow_4s_linear_infinite]"></div>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
                  <svg className="w-full h-full opacity-40 max-w-[500px]" viewBox="0 0 400 200">
                    <path d="M 50 150 Q 150 50 250 100 T 350 50" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" className="animate-[pulse_2s_infinite]" />
                  </svg>
                  <div className="absolute text-emerald-400 text-xl sm:text-2xl drop-shadow-[0_0_15px_rgba(16,185,129,1)]">
                    <i className="fa-solid fa-truck-fast"></i>
                  </div>
                </div>
                
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/50 backdrop-blur-md border border-emerald-500/30 text-emerald-400 font-mono text-[0.55rem] sm:text-[0.65rem] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                  SAT-LINK ESTABLISHED // GPS: 17.3850° N, 78.4867° E
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-[#0f172a] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-white/5 shadow-xl">
                <h3 className="text-white font-black text-lg sm:text-xl mb-6 sm:mb-8">Routing Protocol</h3>
                
                <div className="relative flex justify-between items-center px-1 sm:px-2">
                  <div className="absolute top-1/2 left-[5%] w-[90%] h-1 bg-slate-800 -translate-y-1/2 rounded-full z-0"></div>
                  <div className="absolute top-1/2 left-[5%] w-[45%] h-1 bg-gradient-to-r from-[#ff9900] to-[#ff3300] -translate-y-1/2 rounded-full z-0 shadow-[0_0_10px_rgba(255,153,0,0.5)]"></div>
                  
                  {['Verified', 'Processed', 'Dispatched', 'Delivered'].map((step, idx) => (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[0.7rem] sm:text-sm transition-all ${idx < 3 ? 'bg-[#ff9900] text-white shadow-[0_0_15px_rgba(255,153,0,0.4)]' : 'bg-slate-800 text-slate-500 border-2 border-slate-700'}`}>
                        {idx < 2 ? <i className="fa-solid fa-check"></i> : idx === 2 ? <i className="fa-solid fa-truck-fast text-[0.6rem] sm:text-[0.7rem]"></i> : 4}
                      </div>
                      <span className={`text-[0.55rem] sm:text-xs font-bold uppercase tracking-wider text-center ${idx < 3 ? 'text-white' : 'text-slate-600'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Receipt Data */}
            <div className="lg:sticky lg:top-[120px] h-fit">
              <div className="bg-[#0f172a] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-white/5 shadow-xl flex flex-col h-full">
                <h3 className="text-white tracking-wider font-black text-lg sm:text-xl mb-5 sm:mb-6">Asset Details</h3>
                
                <div className="flex flex-col gap-3.5 sm:gap-4 mb-6 sm:mb-8 flex-grow">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4">
                    <span className="text-slate-500 font-medium text-sm sm:text-base">Tracking ID</span>
                    <span className="text-white font-mono font-bold text-xs sm:text-sm bg-white/5 px-2 py-1 rounded-md">{activeOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4">
                    <span className="text-slate-500 font-medium text-sm sm:text-base">Date Initiated</span>
                    <span className="text-white font-bold text-sm sm:text-base">{activeOrder.date}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4">
                    <span className="text-slate-500 font-medium text-sm sm:text-base">Security</span>
                    <span className="text-emerald-400 font-mono text-[0.65rem] sm:text-xs flex items-center gap-1.5"><i className="fa-solid fa-shield-halved"></i> AES-256</span>
                  </div>
                </div>
                
                <div className="mt-auto flex flex-col gap-3 sm:gap-3.5">
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all hover:-translate-y-1 shadow-sm">
                    Download Encrypted Invoice
                  </button>
                  
                  <button 
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                    className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl tracking-wider font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 border shadow-sm ${
                      isCancelling 
                        ? 'bg-red-500/20 text-red-500 border-red-500/50 cursor-wait' 
                        : 'bg-transparent hover:bg-red-500/10 text-red-400 border-red-500/30 hover:border-red-500 hover:text-red-500 hover:-translate-y-1'
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

          </div>
        ) : (
          <div className="bg-[#0f172a] rounded-[24px] sm:rounded-[32px] p-10 sm:p-16 text-center border border-white/5 shadow-xl mt-4">
            <i className="fa-solid fa-box-open text-5xl sm:text-6xl text-slate-700 mb-5 sm:mb-6 animate-pulse"></i>
            <h2 className="text-xl sm:text-2xl font-black tracking-wide text-white mb-2 sm:mb-3">No Active Manifests</h2>
            <p className="text-slate-400 font-medium text-sm sm:text-base max-w-md mx-auto">Your telemetry grid is empty. Initialize an order to begin tracking.</p>
          </div>
        )}
      </div>
    </div>
  );
}