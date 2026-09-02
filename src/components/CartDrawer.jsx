import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, cartTotal, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // Feature 5: Free Shipping Motivator Engine
  const THRESHOLD = 150.00;
  const percent = Math.min((cartTotal / THRESHOLD) * 100, 100);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your manifest is empty!");
    setIsCartOpen(false);
    navigate('/checkout'); 
  };

  return (
    <>
      <div className={`fixed inset-0 bg-[#131a22]/70 backdrop-blur-[5px] z-[25000] transition-opacity duration-400 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)}></div>

      <div className={`fixed top-5 w-full max-w-[420px] h-[calc(100vh-40px)] bg-white z-[26000] rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-all duration-400 ${isCartOpen ? 'right-5' : '-right-[500px]'}`}>
        
        <div className="p-6 bg-[#131a22] text-white flex justify-between items-center">
          <h2 className="text-[1.4rem] font-bold m-0">Your Manifest</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-white text-3xl hover:text-[#f26a21] leading-none">&times;</button>
        </div>

        {/* Free Shipping Bar */}
        <div className="p-4 bg-[#f8f9fa] border-b border-[#eee]">
          {cartTotal >= THRESHOLD ? (
            <p className="m-0 text-[0.95rem] text-[#10b981] font-bold text-center"><i className="fa-solid fa-check-circle mr-2"></i> Unlocked Free Prime Shipping!</p>
          ) : (
            <>
              <p className="m-0 mb-2 text-[0.9rem] text-[#333] font-bold"><i className="fa-solid fa-truck text-[#f26a21] mr-2"></i> Only ${(THRESHOLD - cartTotal).toFixed(2)} away from Free Shipping!</p>
              <div className="w-full h-2 bg-[#ddd] rounded-full overflow-hidden"><div className="h-full bg-[#f26a21] transition-all" style={{ width: `${percent}%` }}></div></div>
            </>
          )}
        </div>

        <div className="flex-grow overflow-y-auto p-5 bg-white">
          {cart.length === 0 ? (
            <div className="text-center text-[#888] italic mt-32 font-medium">Your manifest is empty.</div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-[#f8f9fa] rounded-2xl border border-[#f0f0f0] mb-3">
                <div className="w-[70px] h-[70px] bg-white rounded-xl flex justify-center items-center overflow-hidden border border-[#eaeaea] shrink-0"><img src={item.image} className="max-w-[85%] max-h-[85%] object-contain" /></div>
                <div className="flex-grow flex flex-col gap-1">
                  <h4 className="text-[0.95rem] font-bold text-[#111] leading-snug line-clamp-2 m-0">{item.title}</h4>
                  <span className="text-[1rem] font-black text-[#f26a21]">${item.price.toFixed(2)}</span>
                  <button onClick={() => removeFromCart(index)} className="text-[#d9534f] text-[0.75rem] bg-[#d9534f]/10 font-bold py-1 px-3 rounded-lg w-max mt-1 hover:bg-[#d9534f]/20">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-white border-t border-[#eee]">
          <div className="flex justify-between text-[1.2rem] font-bold text-[#111] mb-5"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          <button onClick={handleCheckout} className="w-full bg-[#f26a21] hover:bg-[#d95b19] active:scale-95 text-white p-4 rounded-xl text-[1.1rem] font-bold transition-all">Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}