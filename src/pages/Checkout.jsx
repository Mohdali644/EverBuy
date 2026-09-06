import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, cartTotal, setCart, showToast } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your manifest is empty.", "error");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      showToast("Payment Successful! Order confirmed.", "success");
      setCart([]); 
      navigate('/');
    }, 2500);
  };

  return (
    // Added pt-[100px] to ensure the entire page clears the fixed Navbar
    <div className="min-h-screen pt-[100px] bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-slate-50 to-slate-100 font-sans pb-16 selection:bg-[#ff9900] selection:text-white">
      
      {/* --- PREMIUM SECURE HEADER (MEDIUM & VISIBLE) --- */}
      <header className="bg-[#0f172a] py-5 text-center border-b-[4px] border-[#ff9900] relative px-6 shadow-xl z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        
        {/* Restored & Enhanced Return Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white hover:text-white font-bold transition-all hover:-translate-x-1 bg-white/20 hover:bg-[#f78902] px-4 py-2 md:px-5 md:py-2.5 rounded-full backdrop-blur-md border border-white/30 shadow-md"
        >
          <i className="fa-solid fa-arrow-left text-sm md:text-base"></i> <span className="hidden sm:inline">Return to Store</span>
        </button>

        <div className="inline-flex justify-center items-center gap-2.5 text-white text-[1.35rem] md:text-[1.75rem] font-black tracking-tight drop-shadow-lg">
          <i className="fa-solid fa-shield-check text-[#10b981] text-xl drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"></i> 
          EverBuy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Secure Checkout</span>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto mt-8 md:mt-10 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 relative z-20">
        
        {/* --- LEFT COLUMN: CHECKOUT FLOW --- */}
        <div className="flex flex-col gap-8">
          
          {/* Express Checkout */}
          <div className="bg-white/90 backdrop-blur-xl p-6 md:p-7 rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 text-center">Express Checkout</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex justify-center items-center gap-2 w-full bg-[#000] hover:bg-slate-800 text-white py-3.5 px-4 rounded-2xl text-base font-semibold transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">
                <i className="fa-brands fa-apple text-xl mb-[2px]"></i> Pay
              </button>
              <button className="flex justify-center items-center gap-2 w-full bg-white hover:bg-gray-50 text-slate-700 border-2 border-slate-100 py-3.5 px-4 rounded-2xl text-base font-semibold transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
                <i className="fa-brands fa-google text-xl text-red-500"></i> Pay
              </button>
            </div>
            
            <div className="relative flex items-center justify-center mt-6 mb-2">
              <div className="absolute w-full h-[1px] bg-slate-200"></div>
              <span className="relative bg-white px-4 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest rounded-full">Or pay with card</span>
            </div>
          </div>

          {/* Form Section */}
          <form className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-10">
            
            {/* 1. Shipping */}
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-black text-base shadow-md">1</div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="First Name" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group">
                  <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group sm:col-span-2">
                  <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group sm:col-span-2">
                  <i className="fa-solid fa-map-pin absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Street Address" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group">
                  <i className="fa-solid fa-city absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="City" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group">
                  <i className="fa-solid fa-map-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Postal Code" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
              </div>
            </div>

            <div className="h-[2px] w-full bg-slate-100 rounded-full"></div>

            {/* 2. Payment */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-black text-base shadow-md">2</div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Payment Method</h2>
                </div>
                
                <div className="flex gap-2.5">
                  <div className="bg-white border-2 border-[#1a1f71]/10 px-2.5 py-1 rounded-xl shadow-sm flex items-center justify-center">
                    <i className="fa-brands fa-cc-visa text-2xl text-[#1a1f71]"></i>
                  </div>
                  <div className="bg-white border-2 border-[#eb001b]/10 px-2.5 py-1 rounded-xl shadow-sm flex items-center justify-center">
                    <i className="fa-brands fa-cc-mastercard text-2xl text-[#eb001b]"></i>
                  </div>
                  <div className="bg-white border-2 border-[#2e77bc]/10 px-2.5 py-1 rounded-xl shadow-sm flex items-center justify-center">
                    <i className="fa-brands fa-cc-amex text-2xl text-[#2e77bc]"></i>
                  </div>
                </div>
              </div>

              <div className="relative group mb-4">
                <i className="fa-regular fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-[#ff9900] transition-colors z-10"></i>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-lg font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium tracking-widest" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <i className="fa-solid fa-signature absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Name on Card" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-12 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                    <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-10 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium text-center tracking-widest" />
                  </div>
                  <div className="relative group">
                    <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                    <input type="text" placeholder="CVC" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-10 rounded-2xl outline-none text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium text-center tracking-widest" />
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* --- RIGHT COLUMN: FLOATING ORDER SUMMARY --- */}
        <div className="relative">
          {/* Changed top-[90px] to top-[120px] to clear the fixed global navigation header while scrolling */}
          <div className="bg-white/95 backdrop-blur-2xl p-6 md:p-7 rounded-[28px] shadow-[0_12px_45px_rgba(0,0,0,0.05)] border border-slate-100 sticky top-[120px]">
            
            <h2 className="text-xl font-black text-slate-900 mb-5 tracking-tight">Order Summary</h2>
            
            {/* Live Cart Items Display */}
            <div className="max-h-[280px] overflow-y-auto pr-2 mb-6 flex flex-col gap-3.5 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-6 text-slate-400 italic font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">No items in manifest.</div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.title} className="max-w-[80%] max-h-[80%] object-contain mix-blend-darken" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.title}</h4>
                      <p className="text-[#f26a21] font-black mt-0.5 text-base">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code */}
            <div className="flex gap-2.5 mb-6 border-b-2 border-slate-100 pb-6">
              <div className="relative flex-grow">
                <i className="fa-solid fa-tag absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" placeholder="Promo Code" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-3 pl-9 text-base font-bold outline-none focus:border-[#ff9900] focus:bg-white transition-all uppercase placeholder:normal-case placeholder:font-medium placeholder:text-slate-400" />
              </div>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md">Apply</button>
            </div>

            {/* Math */}
            <div className="flex flex-col gap-3.5 text-slate-500 font-semibold mb-6">
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span className="text-slate-900 font-black">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Shipping</span>
                <span className="text-[#10b981] font-black bg-[#10b981]/10 px-2 py-0.5 rounded-md text-sm">FREE Prime</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Taxes</span>
                <span className="text-slate-900 font-black">$0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-7">
              <span className="text-lg font-black text-slate-900 uppercase tracking-wide">Total</span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300] drop-shadow-sm">${cartTotal.toFixed(2)}</span>
            </div>

            {/* Cinematic Place Order Button */}
            <button 
              onClick={handlePlaceOrder} 
              disabled={isProcessing}
              className={`w-full relative overflow-hidden text-white border-none py-4 px-5 text-lg font-black rounded-2xl cursor-pointer transition-all duration-300 active:translate-y-0
                ${isProcessing 
                  ? 'bg-slate-800 shadow-inner hover:translate-y-0' 
                  : 'bg-gradient-to-r from-[#ff9900] to-[#ff3300] shadow-[0_10px_25px_rgba(255,100,0,0.3)] hover:shadow-[0_12px_30px_rgba(255,100,0,0.4)] hover:-translate-y-1'}`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2.5">
                  <i className="fa-solid fa-circle-notch fa-spin text-[#ff9900] text-xl"></i> <span className="tracking-wide">Processing...</span>
                </div>
              ) : (
                <span className="tracking-wide">Confirm Payment</span>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-col items-center gap-2.5 text-[0.7rem] font-bold text-slate-400">
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3.5 py-1.5 rounded-full border border-emerald-100">
                <i className="fa-solid fa-shield-check text-emerald-500 text-sm"></i> Secured with AES-256 Bit Encryption
              </div>
              <p className="text-center px-3 leading-relaxed">Your payment information is tokenized and processed securely. EverBuy never stores your raw card data.</p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}