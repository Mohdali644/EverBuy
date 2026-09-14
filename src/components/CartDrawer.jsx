import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, cartTotal, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // Free Shipping Engine
  const THRESHOLD = 1000.00; 
  const amountLeft = THRESHOLD - cartTotal;
  const percent = Math.min((cartTotal / THRESHOLD) * 100, 100);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your manifest is empty!");
    setIsCartOpen(false);
    navigate('/checkout'); 
  };

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-[#131a22]/70 backdrop-blur-[5px] z-[25000] transition-opacity duration-400 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Floating Slide-In Drawer (ALL 4 CORNERS ROUNDED) */}
      <div 
        className={`fixed top-4 sm:top-5 h-[calc(100vh-32px)] sm:h-[calc(100vh-40px)] w-[calc(100%-32px)] sm:w-[420px] bg-white rounded-[20px] overflow-hidden border border-slate-200 z-[26000] shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex flex-col font-sans transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCartOpen ? 'right-4 sm:right-5' : '-right-[600px]'}`}
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse"></div>
            <h2 className="text-[1.3rem] font-black text-slate-900 tracking-tight m-0">Your Manifest</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Dynamic Shipping Progress Bar */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 shrink-0">
          {cartTotal >= THRESHOLD ? (
            <p className="text-emerald-600 font-bold text-[0.85rem] flex items-center gap-2 m-0 mb-2">
              <i className="fa-solid fa-check-circle"></i> Prime Shipping Unlocked!
            </p>
          ) : (
            <p className="text-slate-600 font-medium text-[0.85rem] m-0 mb-2">
              Add <span className="text-[#ff9900] font-bold">${amountLeft.toFixed(2)}</span> for Prime Shipping
            </p>
          )}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#ff9900] to-[#ff3300] transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items Scroll Area */}
        <div className="flex-grow overflow-y-auto p-5 flex flex-col gap-3 scrollbar-hide bg-white">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 mt-10">
              <i className="fa-solid fa-ghost text-4xl opacity-50"></i>
              <p className="font-medium text-[1rem]">Your manifest is empty.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="group flex gap-4 bg-white p-3 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md">
                
                {/* Item Image */}
                <div className="w-[75px] h-[75px] rounded-xl bg-slate-50 flex justify-center items-center overflow-hidden flex-shrink-0 border border-slate-100 p-1.5">
                  <img src={item.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                {/* Item Details */}
                <div className="flex-grow flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-slate-900 font-bold text-[0.9rem] leading-snug line-clamp-2 m-0">{item.title}</h3>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                      title="Remove Item"
                    >
                      <i className="fa-solid fa-trash-can text-[0.85rem]"></i>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-1">
                    <span className="text-[#ff9900] font-black text-[1rem]">${item.price.toFixed(2)}</span>
                    
                    {/* Quantity Stepper */}
                    {updateQuantity && (
                      <div className="flex items-center bg-slate-100 rounded-full border border-slate-200 p-[2px]">
                        <button 
                          onClick={() => updateQuantity(index, -1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
                        >
                          <i className="fa-solid fa-minus text-[0.55rem]"></i>
                        </button>
                        <span className="w-5 text-center text-slate-900 font-bold text-[0.8rem]">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => updateQuantity(index, 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
                        >
                          <i className="fa-solid fa-plus text-[0.55rem]"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Compact Footer / Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-600 font-medium text-[0.9rem]">Subtotal</span>
              <span className="text-[1.3rem] font-black text-slate-900">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#ff9900] to-[#ff3300] hover:from-[#ffaa33] hover:to-[#ff5533] text-white py-3.5 rounded-xl font-black text-[1.05rem] transition-all hover:scale-[1.01] active:scale-95 shadow-[0_5px_15px_rgba(255,153,0,0.2)] flex items-center justify-center gap-2"
            >
              Proceed to Checkout 
            </button>
          </div>
        )}
      </div>
    </>
  );
}