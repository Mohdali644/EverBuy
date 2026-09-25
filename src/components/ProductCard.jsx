import { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ title, price, image }) {
  const { addToCart, cartIconRef } = useCart();
  
  // Feature 10: Scarcity Engine (Random stock left)
  const [stockLeft] = useState(() => Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : null);
  
  const imageRef = useRef(null);

  const handleFlyToCart = () => {
    const startEl = imageRef.current;
    // Lock onto the Cart Icon in the Navbar using the context ref
    const targetEl = cartIconRef?.current || document.querySelector('.fa-cart-shopping');

    // Failsafe: If elements aren't found, just add to cart instantly
    if (!startEl || !targetEl) {
      addToCart({ title, price, image });
      return;
    }

    // 1. CLONE THE IMAGE TO ESCAPE CSS CONFLICTS
    const startRect = startEl.getBoundingClientRect();
    const clone = startEl.cloneNode(true);

    // Apply raw inline styles to the clone so it completely ignores Tailwind
    Object.assign(clone.style, {
      position: 'fixed',
      top: `${startRect.top}px`,
      left: `${startRect.left}px`,
      width: `${startRect.width}px`,
      height: `${startRect.height}px`,
      zIndex: '999999',
      pointerEvents: 'none',
      margin: '0',
      mixBlendMode: 'darken',
      objectFit: 'contain',
      transformOrigin: 'center center'
    });

    // Inject the clone directly into the HTML body
    document.body.appendChild(clone);

    // 2. CALCULATE EXACT CENTER-TO-CENTER DISTANCE
    const targetRect = targetEl.getBoundingClientRect();
    const deltaX = (targetRect.left + targetRect.width / 2) - (startRect.left + startRect.width / 2);
    const deltaY = (targetRect.top + targetRect.height / 2) - (startRect.top + startRect.height / 2);

    // 3. LAUNCH HARDWARE-ACCELERATED PHYSICS
    const flight = clone.animate([
      { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.1) rotate(720deg)`, opacity: 0 }
    ], {
      duration: 1600,
      easing: 'cubic-bezier(0.34, 1.05, 0.64, 1)' // Premium cinematic curve
    });

    // 4. CLEANUP & ADD TO CART
    flight.onfinish = () => {
      clone.remove(); // Destroy the clone when it hits the cart
      addToCart({ title, price, image }); // Add item to the Manifest data
    };
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
    </div>
  );
}