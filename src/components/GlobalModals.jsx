import { useState, useEffect } from 'react';

export default function GlobalModals({ locOpen, setLocOpen, signInOpen, setSignInOpen, infoOpen, setInfoOpen }) {
  
  // Feature 11: Global Scroll Progress Bar
  const [scrollWidth, setScrollWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollWidth((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Feature 16: Smart Location Memory
  const [activeCountry, setActiveCountry] = useState(localStorage.getItem('everbuy_location') || 'India');
  const countries = ["United States", "United Kingdom", "India", "Canada", "Australia", "Germany"];
  const handleCountrySelect = (c) => { setActiveCountry(c); localStorage.setItem('everbuy_location', c); setLocOpen(false); };

  // Feature 7: Sign In Logic
  const [authStatus, setAuthStatus] = useState('Continue Securely');
  const handleSignIn = (e) => {
    e.preventDefault();
    setAuthStatus('Authenticating...');
    setTimeout(() => {
      setAuthStatus('Success ✓');
      setTimeout(() => { setSignInOpen(false); setAuthStatus('Continue Securely'); }, 1000);
    }, 1500);
  };

  // Feature 10: Exit Intent (CRO)
  const [showExit, setShowExit] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('everbuy_exit_shown')) return;
    const handleMouseLeave = (e) => {
      if (e.clientY < 0) { setShowExit(true); sessionStorage.setItem('everbuy_exit_shown', 'true'); }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#ff9900] to-[#f26a21] z-[999999] transition-all ease-out" style={{ width: `${scrollWidth}%` }} />

      {/* Feature 1: Dynamic Info Panel */}
      <div className={`fixed top-[100px] w-[350px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-6 z-[9999] transition-all duration-400 ease-in-out ${infoOpen ? 'right-5' : '-right-[450px]'}`}>
        <button onClick={() => setInfoOpen(null)} className="absolute top-3 right-5 text-2xl font-bold hover:text-[#f26a21] transition-colors">&times;</button>
        <h2 className="text-xl font-bold mb-2">{infoOpen || 'EverBuy'}</h2>
        <p className="text-gray-600">Welcome to the {infoOpen} portal. Explore products.</p>
      </div>

      {/* Exit Intent Modal */}
      {showExit && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[30000] flex justify-center items-center" onClick={() => setShowExit(false)}>
          <div className="bg-gradient-to-br from-[#131a22] to-[#232f3e] p-12 rounded-3xl w-[90%] max-w-[500px] text-center text-white border border-white/10 shadow-[0_25px_50px_rgba(242,106,33,0.2)]" onClick={e => e.stopPropagation()}>
            <h2 className="text-[2.2rem] text-[#f26a21] font-bold mb-2">Wait! Don't leave yet.</h2>
            <p className="text-[1.1rem] text-gray-300 mb-6">Complete your order today and take an extra 15% off your entire manifest.</p>
            <div onClick={(e) => { navigator.clipboard.writeText("EVERBUY15"); e.target.innerText = "COPIED!"; e.target.style.background = "#4BB543"; e.target.style.borderColor = "#4BB543"; }} className="bg-white/10 p-4 border-2 border-dashed border-[#f26a21] text-2xl tracking-[2px] rounded-lg cursor-pointer transition-colors">EVERBUY15</div>
            <button onClick={() => setShowExit(false)} className="w-full mt-6 bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl transition-colors">Continue Shopping</button>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {locOpen && (
        <div className="fixed inset-0 bg-[#131a22]/70 backdrop-blur-sm z-[30000] flex justify-center items-center" onClick={() => setLocOpen(false)}>
          <div className="bg-white w-[90%] max-w-[380px] rounded-2xl p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLocOpen(false)} className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-[#f26a21] transition-colors">&times;</button>
            <h2 className="text-xl font-extrabold mb-2 text-slate-900">Choose your location</h2>
            <p className="text-sm text-gray-500 mb-4">Delivery options and speeds may vary based on your active location.</p>
            <div className="max-h-[320px] overflow-y-auto border border-gray-100 rounded-xl mt-4">
              {countries.map(c => (
                <div key={c} onClick={() => handleCountrySelect(c)} className={`p-4 border-b flex justify-between cursor-pointer transition-colors ${activeCountry === c ? 'bg-[#f26a21]/10 text-[#f26a21] font-bold' : 'hover:bg-gray-50 text-slate-700'}`}>
                  <span>{c}</span> {activeCountry === c && <i className="fa-solid fa-check"></i>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- NEXT LEVEL SIGN IN MODAL (WHITE THEME) --- */}
      {signInOpen && (
        <div className="fixed inset-0 bg-[#000000]/60 backdrop-blur-md z-[30000] flex justify-center items-center p-4 transition-all duration-300" onClick={() => setSignInOpen(false)}>
          <div 
            className="bg-white w-full max-w-[420px] rounded-[24px] p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.15)] transform transition-all" 
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={() => setSignInOpen(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black transition-colors">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            {/* Logo & Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF9900]/10 to-[#FF3300]/10 rounded-2xl flex items-center justify-center mb-4 border border-[#FF9900]/20 shadow-[0_8px_20px_rgba(255,153,0,0.15)]">
                <svg className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(255,153,0,0.4)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#logo-grad-modal-white)" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
                    <defs>
                        <linearGradient id="logo-grad-modal-white" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF9900"/><stop offset="1" stopColor="#FF3300"/>
                        </linearGradient>
                    </defs>
                </svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-gray-500 text-sm mt-1">Enter your credentials to access your manifest.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="flex flex-col gap-5">
              
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-regular fa-envelope text-gray-400 group-focus-within:text-[#ff9900] transition-colors"></i>
                </div>
                <input 
                  type="text" 
                  placeholder="Email or Mobile Number" 
                  required 
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 outline-none focus:border-[#ff9900] focus:bg-white transition-all placeholder-gray-400" 
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400 group-focus-within:text-[#ff9900] transition-colors"></i>
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 outline-none focus:border-[#ff9900] focus:bg-white transition-all placeholder-gray-400" 
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#ff9900] hover:text-[#d95b19] transition-colors cursor-pointer">Forgot?</span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`relative w-full py-4 rounded-xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(242,106,33,0.3)] active:translate-y-0
                  ${authStatus === 'Success ✓' ? 'bg-[#10b981]' : authStatus === 'Authenticating...' ? 'bg-gray-200 text-gray-500' : 'bg-gradient-to-r from-[#FF9900] to-[#FF3300]'}`}
              >
                {authStatus}
              </button>
            </form>

            {/* Social Logins & Divider */}
            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute w-full h-[1px] bg-gray-200"></div>
                <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-sm">
                  <i className="fa-brands fa-google text-lg text-red-500"></i> Google
                </button>
                <button className="flex-1 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-sm">
                  <i className="fa-brands fa-apple text-lg mb-[2px] text-black"></i> Apple
                </button>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-8">
              New to EverBuy? <span className="text-slate-900 font-bold hover:text-[#ff9900] transition-colors cursor-pointer">Create an account</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}