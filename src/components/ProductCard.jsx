import { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ title, price, image }) {
  const { addToCart, cartIconRef } = useCart();
  
  // Feature 10: Scarcity Engine (Random stock left)
  const [stockLeft] = useState(() => Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : null);
  
  // Feature 4: Fly-to-Cart Physics Engine
  const [isFlying, setIsFlying] = useState(false);
  const [flightStyle, setFlightStyle] = useState({});
  const imageRef = useRef(null);

  const handleFlyToCart = () => {
    if (!imageRef.current || !cartIconRef.current) return;

    const startRect = imageRef.current.getBoundingClientRect();
    const targetRect = cartIconRef.current.getBoundingClientRect();

    setIsFlying(true);
    setFlightStyle({
      position: 'fixed',
      top: startRect.top, left: startRect.left,
      width: startRect.width, height: startRect.height,
      borderRadius: '12px', zIndex: 999999, pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(0.5, -0.5, 0.75, 1)' 
    });

    setTimeout(() => {
      setFlightStyle(prev => ({
        ...prev,
        top: targetRect.top + (targetRect.height / 2) - 25,
        left: targetRect.left + (targetRect.width / 2) - 25,
        width: '50px', height: '50px', opacity: 0.3, borderRadius: '50%', transform: 'scale(0.5)'
      }));
    }, 10);

    setTimeout(() => {
      setIsFlying(false);
      addToCart({ title, price, image });
    }, 800);
  };

  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer">
      <div className="h-48 w-full rounded-xl overflow-hidden bg-[#f0f0f0] flex items-center justify-center mb-4">
        <img ref={imageRef} src={image} alt={title} className="max-h-[90%] max-w-[90%] object-contain mix-blend-darken" />
      </div>
      
      <div className="flex flex-col flex-grow justify-between">
        <h3 className="text-[1.1rem] font-bold text-[#111] mb-2">{title}</h3>
        <span className="text-[1.2rem] font-black text-[#ff9900] mb-3">${price.toFixed(2)}</span>
        
        {stockLeft && (
          <div className="text-[#d9534f] text-[0.8rem] font-bold flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 bg-[#d9534f] rounded-full animate-pulse"></div>
            Only {stockLeft} left in stock - order soon.
          </div>
        )}

        <button onClick={handleFlyToCart} className="w-full bg-[#f8f9fa] hover:bg-[#131a22] text-[#111] hover:text-white border border-[#eaeaea] font-bold py-3 rounded-xl transition-colors">
          Add to Manifest
        </button>
      </div>

      {isFlying && <img src={image} style={flightStyle} alt="flying clone" className="shadow-2xl mix-blend-darken bg-white" />}
    </div>
  );
}