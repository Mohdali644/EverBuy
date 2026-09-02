import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Navbar({ setLocOpen, setSignInOpen, setInfoOpen }) {
  const { cart, cartTotal, setIsCartOpen, cartIconRef } = useCart();
  const { user, logout } = useUser();
  
  const [showNav, setShowNav] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const mockDatabase = [
    "Sony Wireless Headphones", 
    "Samsung Galaxy S24", 
    "MacBook Pro 16-inch", 
    "Ergonomic Backpack", 
    "Premium Skincare Serum",
    "Classic Moto Leather Jacket"
  ];

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowNav(currentScroll < lastScroll || currentScroll < 100);
      setIsScrolled(currentScroll > 50);
      lastScroll = currentScroll;
      if (currentScroll > 30) setShowTooltip(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [user]);

  const handleProfileClick = () => {
    setShowTooltip(false);
    if (user) {
      if (window.confirm("Do you want to log out?")) {
        logout();
      }
    } else {
      setSignInOpen(true);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        setResults(mockDatabase.filter(item => item.toLowerCase().includes(query.toLowerCase())));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <>
      <style>
        {`
          @keyframes subtle-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .animate-subtle-float {
            animation: subtle-float 2.5s ease-in-out infinite;
          }
        `}
      </style>

      <header 
        className={`font-sans fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${showNav ? 'translate-y-0' : '-translate-y-full'} 
          ${isScrolled ? 'pt-3 px-4' : 'pt-0 px-0'}`}
      >
        <div 
          className={`mx-auto transition-all duration-500
            ${isScrolled 
              ? 'max-w-[1200px] bg-[#131921]/95 backdrop-blur-2xl rounded-[24px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5' 
              : 'max-w-full bg-[#131921] border-b border-white/10'}`}
        >
          {/* TOP BAR */}
          <nav className={`flex items-center px-5 gap-4 lg:gap-6 transition-all duration-500 ${isScrolled ? 'h-[58px]' : 'h-[60px] max-w-[1800px] mx-auto'}`}>
              
              {/* Logo - Kept font-black as requested */}
              <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center gap-2 no-underline transition-transform duration-300 hover:scale-105 group/logo">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff9900] to-[#ff3300] blur-[10px] opacity-30 group-hover/logo:opacity-60 transition-opacity duration-500 rounded-full"></div>
                        <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22.5L2 16.7V7.3L12 1.5L22 7.3V16.7L12 22.5Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M12 22.5V12M12 12L2 7.3M12 12L22 7.3" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 1.5L22 7.3L12 12L2 7.3L12 1.5Z" fill="url(#logo-grad)" fillOpacity="0.2"/>
                            <defs>
                                <linearGradient id="logo-grad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FF9900"/><stop offset="1" stopColor="#FF3300"/>
                                </linearGradient>
                            </defs>
                        </svg>
                      </div>
                      <div className="flex items-baseline font-sans tracking-tight">
                          <span className="text-[1.6rem] font-black text-white drop-shadow-sm">Ever</span>
                          <span className="text-[1.6rem] font-black bg-clip-text text-transparent bg-gradient-to-br from-[#FF9900] to-[#FF3300] italic drop-shadow-sm">Buy</span>
                      </div>
                  </Link>
              </div>
              
              {/* Deliver To - Restored to clean standard font */}
              <div 
                className="hidden xl:flex flex-col justify-center h-10 px-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 group/loc relative" 
                onClick={() => setLocOpen(true)}
              >
                  <p className="text-slate-400 text-[0.75rem] pl-5 m-0 font-medium group-hover/loc:text-white  transition-colors">Deliver To</p>
                  <div className="flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot text-[#10b981] text-[0.95rem]"></i>
                      <p className="text-[0.95rem] font-bold tracking-tight m-0 text-white">{localStorage.getItem('everbuy_location') || 'India'}</p>  
                  </div>
              </div>

              {/* Search Bar - Restored to standard font */}
              <div className="relative flex-grow flex items-center h-[50px] group z-20">
                  <div className="relative flex w-full h-full bg-white rounded-full overflow-visible p-1 border border-transparent transition-all duration-300 shadow-sm group-focus-within:border-[#ff9900] group-focus-within:ring-4 group-focus-within:ring-[#ff9900]/20">
                    <select className="hidden md:block h-full min-w-[130px] border-none tracking-wide outline-none bg-slate-300 hover:bg-slate-200 px-4 text-[0.85rem] font-medium text-slate-700 cursor-pointer rounded-full transition-colors duration-300  border-slate-300 appearance-none">
                        <option>All Categories</option>
                        <option>Tech</option>
                        <option>Fashion</option>
                        <option>Tech</option>
                        <option>Gaming</option>
                        <option>Beauty</option>
                        <option>Books</option>
                        <option>Automotive</option>
                        <option>Home & Kitchen</option>
                    </select>
                    
                    <div className="flex-grow relative flex items-center">
                      <input 
                          type="text" 
                          placeholder="Search the network..." 
                          className="w-full h-full border-none outline-none px-4 text-[0.95rem] bg-transparent text-slate-900 font-normal placeholder:text-slate-400"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>

                    <button className="w-[42px] h-[42px] shrink-0 rounded-full border-none bg-[#ff9900] hover:bg-[#e38800] text-white text-[0.9rem] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-sm">
                        <i className="fa-solid text-lg fa-magnifying-glass"></i>
                    </button>
                  </div>

                  {/* Dropdown Results */}
                  {query && (
                    <div className="absolute top-[48px] left-0 w-full bg-[#131921]/95 backdrop-blur-3xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-[9999] overflow-hidden border border-white/10 ring-1 ring-white/5 p-2">
                      {results.length > 0 ? results.map((item, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => { setQuery(item); setResults([]); }} 
                          className="px-4 py-2.5 text-slate-300 cursor-pointer rounded-xl hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center font-medium tracking-tight text-[0.95rem] group/item"
                        >
                          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover/item:border-[#ff9900]/50 group-hover/item:bg-[#ff9900]/10 transition-colors">
                            <i className="fa-solid fa-arrow-turn-up text-[#ff9900] rotate-90 text-[0.7rem]"></i>
                          </div>
                          {item}
                        </div>
                      )) : (
                        <div className="p-6 text-slate-400 text-center flex flex-col items-center justify-center">
                          <p className="font-medium tracking-tight text-sm">No active signals found for "{query}"</p>
                        </div>
                      )}
                    </div>
                  )}
              </div>
              
              {/* Profile & Compact Pill Tooltip */}
              <div className="relative flex items-center">
                <div 
                  className={`flex items-center gap-2 h-10 px-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10 group/profile ${user ? 'pr-3 bg-white/5 border border-white/10' : ''}`}
                  onClick={handleProfileClick}
                >
                  {user ? (
                    <>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ff9900] to-[#ff3300] flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium text-[0.85rem] hidden lg:block">
                        Hi, {user.name.split(' ')[0]}
                      </span>
                    </>
                  ) : (
                    <div className="w-9 h-9 rounded-full border border-white/10 bg-transparent flex items-center justify-center group-hover/profile:border-[#ff9900]/50 transition-colors">
                      <i className="fa-solid fa-user text-white group-hover/profile:text-[#ff9900] transition-colors text-[0.95rem]"></i>
                    </div>
                  )}
                </div>

                {/* SIGN IN POP-UP CALLOUT (Kept exactly as requested) */}
                {!user && showTooltip && (
                  <div 
                    onClick={(e) => { e.stopPropagation(); setShowTooltip(false); setSignInOpen(true); }}
                    className="absolute top-[50px] right-0 z-[1000] w-max bg-white hover:bg-slate-50 cursor-pointer flex items-center gap-2.5 rounded-full px-4 py-2 shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-slate-200 animate-subtle-float transition-colors group/tooltip"
                  >
                    <div className="absolute -top-[5px] right-[18px] w-2.5 h-2.5 bg-white border-t border-l border-slate-200 rotate-45 transition-colors group-hover/tooltip:bg-slate-50"></div>
                    <div className="relative z-10 flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#ff9900]/10 flex items-center justify-center">
                        <i className="fa-solid fa-bolt text-[#ff9900] text-[0.6rem]"></i>
                      </div>
                      <span className="text-slate-900 font-black text-[0.8rem] tracking-tight whitespace-nowrap">
                        Sign in for the best experience
                      </span>
                      <i className="fa-solid fa-arrow-right text-slate-400 group-hover/tooltip:text-[#ff9900] group-hover/tooltip:translate-x-0.5 transition-all text-[0.7rem] ml-1"></i>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Returns Trigger - Restored to clean standard font */}
              <div className="hidden 2xl:flex flex-col justify-center h-10 px-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 group/returns">
                  <span className="text-[0.75rem] text-slate-400 font-medium group-hover/returns:text-white tracking-wide transition-colors">Returns</span>
                  <span className="text-[0.95rem] font-bold tracking-wide text-white">& Orders</span>
              </div>
              
              {/* Cart Button - Restored to clean standard font */}
              <div 
                className="flex items-center gap-2.5 h-10 px-2 sm:px-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 group/cart" 
                ref={cartIconRef} 
                onClick={() => setIsCartOpen(true)}
              >
                  <div className="relative flex items-center justify-center w-9 h-9 rounded-full border border-transparent group-hover/cart:border-[#ff9900]/50 transition-all duration-300">
                      <span className="absolute -top-1 -right-1 text-white bg-[#ff3300] px-1.5 py-[1px] rounded-full font-bold text-[0.65rem] shadow-sm border border-[#131921] z-10">{cart.length}</span>
                      <i className="fa-solid fa-cart-shopping text-white group-hover/cart:text-[#ff9900] transition-colors text-lg"></i>
                  </div>
                  <div className="hidden sm:flex flex-col justify-center">
                    <span className="text-[0.75rem] text-slate-400 font-medium group-hover/cart:text-white tracking-wide transition-colors">Manifest</span>
                    <span className="text-[0.95rem] font-bold tracking-tight text-[#ff9900] tracking-wide leading-none">${cartTotal ? cartTotal.toFixed(2) : "0.00"}</span>
                  </div>
              </div>
          </nav>
          
          {/* FULL RESTORED SUB-NAV BELT - Matched to image screenshot font-medium */}
          <div className={`transition-all duration-500 overflow-hidden flex items-center px-6 gap-3 text-[0.85rem] font-medium max-w-[1800px] mx-auto scrollbar-hide tracking-tight ${isScrolled ? 'h-0 opacity-0 border-transparent' : 'h-[40px] opacity-100 border-t border-white/10'}`}>
              <button 
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-white bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 transition-all duration-300 whitespace-nowrap focus:outline-none" 
                onClick={() => setInfoOpen("All Categories")}
              >
                  <i className="fa-solid fa-bars"></i> All
              </button>
              <div className="flex gap-3 hidden md:flex">
                  <button className="px-3 py-1 tracking-wide rounded-full text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap focus:outline-none" onClick={() => setInfoOpen("Today's Deals")}>Today's Deals</button>
                  <button className="px-3 py-1 tracking-wide rounded-full text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap focus:outline-none" onClick={() => setInfoOpen("Customer Service")}>Customer Service</button>
                  <button className="px-3 py-1 tracking-wide rounded-full text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap focus:outline-none" onClick={() => setInfoOpen("Registry")}>Registry</button>
                  <button className="px-3 py-1 tracking-wide rounded-full text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap focus:outline-none" onClick={() => setInfoOpen("Gift Cards")}>Gift Cards</button>
                  <button className="px-3 py-1 tracking-wide rounded-full text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap focus:outline-none" onClick={() => setInfoOpen("Sell")}>Sell</button>
              </div>
          </div>
        </div>
      </header>
    </>
  );
}