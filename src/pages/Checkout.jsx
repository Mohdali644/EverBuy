import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, cartTotal, setCart, showToast } = useCart();
  const navigate = useNavigate();
  
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'processing', 'success'
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');

    setTimeout(() => {
      setPaymentStatus('success');
      
      const newOrder = {
        id: `EVB-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString(),
        status: 'DISPATCHED'
      };
      localStorage.setItem('everbuy_active_order', JSON.stringify(newOrder));
      
      window.dispatchEvent(new Event('orderTelemetryUpdate'));

      setTimeout(() => navigate('/orders'), 1500); 
    }, 2000);
  };

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
    // THE FIX: Massive padding on mobile (pt-[170px]) because the mobile navbar has 3 rows. Less on desktop (pt-[130px]).
    <div className="min-h-screen mt-1 pt-[170px] sm:pt-[130px] md:pt-[110px] bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-slate-50 to-slate-100 font-sans pb-16 selection:bg-[#ff9900] selection:text-white">
      
      {/* --- PREMIUM SECURE HEADER --- */}
      <header className="bg-[#0f172a] py-4 sm:py-5 text-center border-b-[4px] border-[#ff9900] relative px-4 sm:px-6 shadow-xl z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] flex items-center justify-center min-h-[60px] sm:min-h-[76px]">
        
        {/* RESPONSIVE RETURN BUTTON: Locked to vertical center using top-1/2 and -translate-y-1/2 */}
        <button 
          onClick={() => navigate('/')}
          className="absolute mt-5 left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center gap-2 text-white hover:text-white font-bold transition-all hover:-translate-x-1 bg-white/10 hover:bg-[#f78902] w-9 h-9 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-md"
        >
          <i className="fa-solid fa-arrow-left text-sm md:text-base"></i> 
          <span className="hidden sm:inline">Return to Store</span>
        </button>

        {/* TITLE: Extra left margin (ml-10) on mobile so it doesn't hit the back button */}
        <div className="inline-flex py-5 justify-center items-center gap-1.5 sm:gap-2.5 text-white text-[1.1rem] sm:text-[1.35rem] md:text-[1.75rem] font-black tracking-tight drop-shadow-lg ml-10 sm:ml-0">
          <i className="fa-solid fa-shield-check text-[#10b981] text-lg sm:text-xl drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"></i> 
          EverBuy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Secure</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-[1200px] mx-auto mt-6 md:mt-10 px-3 sm:px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 relative z-20">
        
        {/* --- LEFT COLUMN: CHECKOUT FLOW --- */}
        <div className="flex flex-col gap-6 md:gap-8">
          
          {/* Express Checkout */}
          <div className="bg-white/90 backdrop-blur-xl p-5 sm:p-6 md:p-7 rounded-[24px] md:rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
            <h2 className="text-[0.9rem] sm:text-[0.85rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 sm:mb-5 text-center">Express Checkout</h2>
            <div className="grid content-center grid-cols-1 sm:grid-cols-2 gap-3 mx-9 sm:gap-4">
              <button className="flex justify-center items-center tracking-wider gap-2 w-64 bg-[#000] hover:bg-slate-900 text-white py-3.5 px-4 rounded-xl sm:rounded-full text-sm sm:text-base font-semibold transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">
                <i className="fa-brands fa-apple text-lg sm:text-xl mb-[2px]"></i> Pay
              </button>
              <button className="flex items-center justify-center tracking-wider gap-2 w-64 bg-white hover:bg-gray-100 text-slate-700 border-2 border-slate-200 py-3.5 px-4 rounded-xl sm:rounded-full text-sm sm:text-base font-semibold transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
                <i className="fa-brands fa-google text-lg sm:text-xl text-red-500"></i> Pay
              </button>
            </div>
            
            <div className="relative flex items-center justify-center mt-5 sm:mt-6 mb-1 sm:mb-2">
              <div className="absolute w-full h-[1px] bg-slate-200"></div>
              <span className="relative bg-white px-4 text-[0.65rem] sm:text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest rounded-full">Or pay with card</span>
            </div>
          </div>

          {/* Form Section */}
          <form className="bg-white/90 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-[24px] md:rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-8 md:gap-10">
            
            {/* 1. Shipping */}
            <div>
              <div className="flex items-center gap-3 md:gap-3.5 mb-5 md:mb-6">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-black text-sm md:text-[18px] shadow-md shrink-0">1</div>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="relative group">
                  <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="First Name" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group">
                  <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group sm:col-span-2">
                  <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group sm:col-span-2">
                  <i className="fa-solid fa-map-pin absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Street Address" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group">
                  <i className="fa-solid fa-city absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="City" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="relative group">
                  <i className="fa-solid fa-map-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Postal Code" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
              </div>
            </div>

            <div className="h-[2px] w-full bg-slate-100 rounded-full"></div>

            {/* 2. Payment */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 md:mb-6">
                <div className="flex items-center gap-3 md:gap-3.5">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-black text-sm md:text-[18px] shadow-md shrink-0">2</div>
                  <h2 className="text-lg md:text-xl font-black text-slate-900">Payment Method</h2>
                </div>
                
                <div className="flex gap-2 sm:gap-2.5">
                  <div className="bg-white border-2 border-[#1a1f71]/10 hover:scale-[1.12] px-2.5 py-1 rounded-lg sm:rounded-xl shadow-sm flex items-center justify-center">
                    <i className="fa-brands fa-cc-visa text-xl sm:text-2xl text-[#1a1f71]"></i>
                  </div>
                  <div className="bg-white border-2 border-[#eb001b]/10 hover:scale-[1.12] px-2.5 py-1 rounded-lg sm:rounded-xl shadow-sm flex items-center justify-center">
                    <i className="fa-brands fa-cc-mastercard text-xl sm:text-2xl text-[#eb001b]"></i>
                  </div>
                  <div className="bg-white border-2 border-[#2e77bc]/10 hover:scale-[1.12] px-2.5 py-1 rounded-lg sm:rounded-xl shadow-sm flex items-center justify-center">
                    <i className="fa-brands fa-cc-amex text-xl sm:text-2xl text-[#2e77bc]"></i>
                  </div>
                </div>
              </div>

              <div className="relative group mb-3 sm:mb-4">
                <i className="fa-regular fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 text-lg group-focus-within:text-[#ff9900] transition-colors z-10"></i>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-lg font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium tracking-widest" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="relative group">
                  <i className="fa-solid fa-signature absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 text-base group-focus-within:text-[#ff9900] transition-colors"></i>
                  <input type="text" placeholder="Name on Card" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 pl-11 md:pl-12 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative group">
                    <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 text-base group-focus-within:text-[#ff9900] transition-colors hidden sm:block"></i>
                    <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 sm:pl-10 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium text-center tracking-widest" />
                  </div>
                  <div className="relative group">
                    <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 text-base group-focus-within:text-[#ff9900] transition-colors hidden sm:block"></i>
                    <input type="text" placeholder="CVC" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 focus:bg-white p-3.5 sm:pl-10 rounded-xl md:rounded-2xl outline-none text-[16px] md:text-base font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium text-center tracking-widest" />
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* --- RIGHT COLUMN: FLOATING ORDER SUMMARY --- */}
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-6 md:p-7 rounded-[24px] md:rounded-[28px] shadow-[0_12px_45px_rgba(0,0,0,0.05)] border border-slate-100 lg:sticky lg:top-[140px]">
            
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-5">Order Summary</h2>
            
            {/* Live Cart Items Display */}
            <div className="max-h-[250px] md:max-h-[280px] overflow-y-auto pr-2 mb-5 md:mb-6 flex flex-col gap-3 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-6 text-slate-400 italic font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">No items in manifest.</div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-2.5 md:p-3 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.title} className="max-w-[80%] max-h-[80%] object-contain mix-blend-darken" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-xs md:text-sm text-slate-800 line-clamp-1">{item.title}</h4>
                      <p className="text-[#f26a21] font-black mt-0.5 text-sm md:text-base">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code */}
            <div className="flex gap-2 mb-5 md:mb-6 border-b-2 border-slate-100 pb-5 md:pb-6">
              <div className="relative flex-grow">
                <i className="fa-solid fa-tag absolute left-3 top-1/2 -translate-y-1/2 text-slate-900 text-sm md:text-base"></i>
                <input type="text" placeholder="Promo Code" className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl py-2 md:py-2.5 px-3 pl-8 md:pl-9 text-[16px] md:text-base font-bold outline-none focus:border-[#ff9900] focus:bg-white transition-all uppercase placeholder:normal-case placeholder:font-medium placeholder:text-slate-400" />
              </div>
              <button className="bg-slate-900 tracking-wider hover:bg-slate-800 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-colors shadow-md">Apply</button>
            </div>

            {/* Math */}
            <div className="flex flex-col gap-2.5 md:gap-3.5 text-slate-500 font-semibold mb-5 md:mb-6 text-sm md:text-base">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-900 font-black">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-[#10b981] font-black bg-[#10b981]/10 px-2 py-0.5 tracking-wider rounded-md text-xs md:text-sm">FREE Prime</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="text-slate-900 font-black">$0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 mb-5 md:mb-7">
              <span className="text-base md:text-lg font-black text-slate-900 uppercase tracking-wide">Total</span>
              <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300] drop-shadow-sm">${cartTotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleConfirmPayment}
              disabled={paymentStatus !== 'idle'}
              className={`w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black tracking-wide text-base md:text-xl transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg ${
                paymentStatus === 'success' 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                  : paymentStatus === 'processing' 
                  ? 'bg-slate-400 text-white cursor-wait' 
                  : 'bg-gradient-to-r from-[#ff9900] to-[#ff3300] hover:shadow-[#ff9900]/30 text-white hover:scale-[1.02] active:scale-95'
              }`}
            >
              {paymentStatus === 'success' ? (
                <>Payment Confirmed <i className="fa-solid fa-circle-check text-lg md:text-xl"></i></>
              ) : paymentStatus === 'processing' ? (
                <>Processing Securely... <i className="fa-solid fa-circle-notch fa-spin text-lg md:text-xl"></i></>
              ) : (
                <>Confirm Payment <i className="fa-solid fa-lock text-lg md:text-xl"></i></>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-5 md:mt-6 flex flex-col items-center gap-2 text-[0.65rem] md:text-[0.72rem] font-bold text-slate-400">
              <div className="flex items-center gap-1.5 md:gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 md:py-1.5 rounded-full border border-emerald-300">
                <i className="fa-solid fa-shield-check text-emerald-500 text-xs md:text-sm"></i> Secured with AES-256 Bit Encryption
              </div>
              <p className="text-center px-1 mt-4 md:px-3 leading-relaxed">Your payment information is tokenized and processed securely. EverBuy never stores your raw card data.</p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}