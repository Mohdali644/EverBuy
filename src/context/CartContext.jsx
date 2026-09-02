import { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Feature 3: Enterprise Cart State & Local Storage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('everbuy_manifest');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartIconRef = useRef(null); // Used as the target for the Fly-to-Cart animation

  useEffect(() => {
    localStorage.setItem('everbuy_manifest', JSON.stringify(cart));
  }, [cart]);

  // Enterprise Toast Notification Engine
  const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `fixed bottom-8 right-8 bg-[#131a22] text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 font-bold border-l-4 translate-x-[120%] transition-transform duration-300 z-[999999] ${type === 'success' ? 'border-[#10b981]' : 'border-[#ef4444]'}`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check text-[#10b981]' : 'fa-circle-xmark text-[#ef4444]'} text-lg"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => toast.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast(`${product.title} added to your manifest!`, 'success');
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen, cartIconRef, showToast }}>
      {children}
    </CartContext.Provider>
  );
};