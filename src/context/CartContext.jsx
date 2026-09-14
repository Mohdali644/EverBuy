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
    setCart((prev) => {
      // Look to see if the item is already in the cart
      const existingItemIndex = prev.findIndex(item => item.title === product.title);
      
      if (existingItemIndex >= 0) {
        // If it exists, just increase the quantity
        const newCart = [...prev];
        const currentQty = newCart[existingItemIndex].quantity || 1;
        newCart[existingItemIndex] = { 
          ...newCart[existingItemIndex], 
          quantity: currentQty + 1 
        };
        return newCart;
      } else {
        // If it's new, add it with a starting quantity of 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    showToast(`${product.title} added to your manifest!`, 'success');
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Fixed Quantity Updater (Uses Index)
  const updateQuantity = (index, amount) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const currentQty = newCart[index].quantity || 1;
      
      // Calculate new quantity but never let it go below 1
      newCart[index] = { 
        ...newCart[index], 
        quantity: Math.max(1, currentQty + amount) 
      };
      
      return newCart;
    });
  };

  // Fixed Math: Now multiplies the price by the item's quantity
  const cartTotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, cartIconRef, showToast }}>
      {children}
    </CartContext.Provider>
  );
};