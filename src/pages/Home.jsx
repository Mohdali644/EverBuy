import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart, cartIconRef } = useCart();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const handleInitialize = (e) => {
    e.preventDefault(); 
    if (email.trim() !== '' && email.includes('@')) {
      setIsInitialized(true);
      setTimeout(() => {
        setIsInitialized(false);
        setEmail('');
      }, 2000);
    }
  };

  // --- 1. HERO CAROUSEL LOGIC ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=100&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1727407209320-1fa6ae60ee05?q=80&w=1169&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  // --- 2. TEXT ROTATOR LOGIC ---
  const [msgIndex, setMsgIndex] = useState(0);
  const [animClass, setAnimClass] = useState("translate-y-0 opacity-100");
  
  const heroMessages = [
    <><strong className="text-[#111] font-extrabold">Premium Collection</strong> <span className="text-[#ccc] mx-[6px]">•</span>Exclusives deals available now</>,
    <><strong className="text-[#111] font-extrabold">Flash Sale Active</strong> <span className="text-[#ccc] mx-[6px]">•</span> Take an extra 20% off at checkout</>,
    <><strong className="text-[#111] font-extrabold">Free Shipping</strong> <span className="text-[#ccc] mx-[6px]">•</span> On all EverBuy Prime orders today</>,
    <><strong className="text-[#111] font-extrabold">New Arrivals</strong> <span className="text-[#ccc] mx-[6px]">•</span> Discover the latest seasonal tech drops</>
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setAnimClass("-translate-y-5 opacity-0 transition-all duration-400 ease-in");
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % heroMessages.length);
        setAnimClass("translate-y-5 opacity-0 transition-none");
        setTimeout(() => {
          setAnimClass("translate-y-0 opacity-100 transition-all duration-400 ease-out");
        }, 50);
      }, 400);
    }, 4000);
    return () => clearInterval(textTimer);
  }, []);

  // --- 3. LIVE TIMERS & SOCIAL PROOF ---
  const [timeLeft, setTimeLeft] = useState(8039); 
  const [shoppers, setShoppers] = useState(1257);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    const shopperTimer = setInterval(() => setShoppers(prev => prev + (Math.floor(Math.random() * 9) - 3)), 3500);
    return () => { clearInterval(timer); clearInterval(shopperTimer); };
  }, []);

  const formatTime = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  // --- 4. 3D TILT PHYSICS ---
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleLeave = (e) => {
    const card = e.currentTarget;
    
    // 1. Temporarily turn on a smooth CSS transition
    card.style.transition = "transform 0.3s ease-out"; 
    
    // 2. Snap the card back to flat
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    
    // 3. Turn the CSS transition back off after 300ms so it doesn't stutter on the next hover
    setTimeout(() => {
      card.style.transition = "";
    }, 300);
  };

  // --- DATA ---
  const categories = [
    { id: 'health', title: "Health & Personal Care", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80" },
    { id: 'fashion', title: "Fashion", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80" },
    { id: 'sports', title: "Sports & Outdoors", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80" },
    { id: 'home', title: "Home & Kitchen", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" },
    { id: 'electronics', title: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80" },
    { id: 'travel', title: "Travel", img: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&q=80" },
    { id: 'back-to-school', title: "Back to School", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
    { id: 'outlets', title: "Outlets Deals", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" }
  ];

  const trendingProducts = [
    { id: 1, title: "Gaming Headset Pro", price: 129.99, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", badge: "Selling Fast", badgeType: "hot" },
    { id: 2, title: "Minimalist Slate Watch", price: 185.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", badge: "Just Dropped", badgeType: "new" },
    { id: 3, title: "Smart Home Hub V2", price: 89.50, image: "https://img.freepik.com/premium-photo/smart-home-hub-controlling-various-connected-devices_1314467-151989.jpg" },
    { id: 4, title: "Apple Airpods", price: 145.00, image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=400", badge: "High Demand", badgeType: "hot" }
  ];

  // --- TRENDING CARD WITH FLY TO CART PHYSICS ---
  const TrendingCard = ({ product }) => {
    const [isFlying, setIsFlying] = useState(false);
    const [flightStyle, setFlightStyle] = useState({});
    const imageRef = useRef(null);

    const handleFlyToCart = (e) => {
      e.stopPropagation();
      if (!imageRef.current || !cartIconRef.current) {
        addToCart(product); // Fallback if refs fail
        return;
      }

      const startRect = imageRef.current.getBoundingClientRect();
      const targetRect = cartIconRef.current.getBoundingClientRect();

      setIsFlying(true);
      setFlightStyle({
        position: 'fixed', top: startRect.top, left: startRect.left, width: startRect.width, height: startRect.height,
        borderRadius: '12px', zIndex: 999999, pointerEvents: 'none',
        transition: 'all 0.8s cubic-bezier(0.5, -0.5, 0.75, 1)' 
      });

      setTimeout(() => {
        setFlightStyle(prev => ({
          ...prev, top: targetRect.top, left: targetRect.left, width: '40px', height: '40px', opacity: 0.2, borderRadius: '50%', transform: 'scale(0.5)'
        }));
      }, 10);

      setTimeout(() => {
        setIsFlying(false);
        addToCart(product);
      }, 800);
    };

    return (
      <div 
        onMouseMove={handleTilt}
        onMouseLeave={handleLeave}
        className="relative bg-white rounded-[20px] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/5 ease-out flex flex-col group cursor-pointer"
      >
        {product.badge && (
          <div className={`absolute top-6 left-6 z-10 px-3 py-1.5 rounded-full text-[0.75rem] font-extrabold uppercase tracking-wider text-white ${product.badgeType === 'hot' ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-[0_4px_10px_rgba(239,68,68,0.3)]' : 'bg-gradient-to-br from-indigo-500 to-sky-500 shadow-[0_4px_10px_rgba(99,102,241,0.3)]'}`}>
            {product.badge}
          </div>
        )}
        <img ref={imageRef} src={product.image} className="h-[220px] w-full object-contain rounded-xl block group-hover: mix-blend-darken" alt={product.title} />
        
        <div className="mt-4 flex flex-col flex-grow">
          <h3 className="text-[1.15rem] font-extrabold text-[#0f172a] mb-3">{product.title}</h3>
          <div className="flex justify-between items-center mb-5">
            <span className="text-[1.3rem] font-black text-[#0f172a]">${product.price.toFixed(2)}</span>
            <span className="bg-[#fffbeb] text-[#d97706] px-2.5 py-1 rounded-lg text-[0.90rem] font-bold flex items-center gap-1">
              <i className="fa-solid fa-star"></i> 4.9
            </span>
          </div>
          <button onClick={handleFlyToCart} className="w-full bg-[#f8fafc] hover:bg-[#0f172a] text-[#0f172a] hover:text-white border border-[#e2e8f0] hover:border-[#0f172a] text-[0.95rem] font-bold p-3.5 rounded-xl transition-colors mt-auto">
            Add to Manifest
          </button>
        </div>
        
        {isFlying && <img src={product.image} style={flightStyle} alt="flying clone" className="shadow-2xl mix-blend-darken bg-white" />}
      </div>
    );
  };

  return (
    <main className="bg-[#eaeded] min-h-screen pt-[102px]">
      
      {/* 1. HERO CAROUSEL */}
      {/* 1. HERO CAROUSEL */}
      <section className="relative w-full h-[450px] overflow-hidden flex items-end justify-center mb-5">
        {slides.map((bg, idx) => (
          <div 
            key={idx} 
            // FIX: Replaced 'bg-center' with 'bg-[center_20%]' to restore the original CSS physics
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-[center_20%] transition-all duration-[1500ms] ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
            style={{ backgroundImage: `url(${bg})` }}
          ></div>
        ))}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#eaeded] to-transparent z-10"></div>

        {/* TEXT ROTATOR (Ultra-Fluid Responsive) */}
        <div className="relative z-20 pb-8 w-full flex justify-center px-3 sm:px-0">
          <div className="w-full sm:w-max max-w-[800px] bg-white/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center justify-between gap-2 sm:gap-4 border border-white transition-all">
            
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 flex-1 overflow-hidden">
              {/* Pulsing Dot */}
              <div className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffaa55] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#ff9900]"></span>
              </div>
              
              {/* Dynamic Text - Uses flex-1 and min-w-0 to act like a liquid */}
              <div className="flex-1 flex items-center overflow-hidden h-6 min-w-0">
                <span className={`text-slate-900 font-bold text-[0.7rem] sm:text-[0.95rem] tracking-normal truncate w-full ${animClass}`}>
                  {heroMessages[msgIndex]}
                </span>
              </div>
            </div>
            
            {/* Action Button - Hides 'Explore' text on ultra-narrow phones to save space */}
            <button className="bg-[#131a22] hover:bg-[#f26a21] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[0.7rem] sm:text-[0.85rem] font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 group">
              <span className="hidden min-[380px]:inline">Explore</span> 
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SHOP GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-[1500px] mx-auto -mt-5 relative z-20 mb-10">
        {categories.map((cat, i) => (
          <article 
            key={i} 
            // FIX: Added /category/ to the path so it matches App.jsx
            onClick={() => navigate(`/category/${cat.id}`)}
            onMouseMove={handleTilt}
            onMouseLeave={handleLeave}
            className="bg-white p-5 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-transform duration-200 ease-out flex flex-col cursor-pointer"
          >
            <h2 className="text-[1.25rem] text-[#0f1111] font-bold mb-3">{cat.title}</h2>
            <div className="h-[280px] w-full rounded-lg bg-cover bg-center mb-4 bg-[#f8f9fa]" style={{ backgroundImage: `url(${cat.img})` }}></div>
            <p className="text-white h-[35px] w-[120px] bg-gradient-to-br from-[#FF9900] to-[#FF3300] flex justify-center items-center text-[0.95rem] font-semibold rounded-full mt-auto mx-auto hover:text-[#353131] transition-colors pointer-events-none">Shop now</p>
          </article>
        ))}
      </section>

      {/* 3. FEATURES BAR (Ultra Responsive 2x2 Grid to Flex Row) */}
      <section className="bg-white rounded-2xl md:rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] mx-4 sm:mx-6 xl:mx-auto max-w-[1400px] mt-12 md:mt-[75px] mb-10 border border-slate-100">
        <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-evenly gap-y-8 gap-x-4 p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 group cursor-default">
            <i className="fa-solid fa-truck-fast text-xl sm:text-[1.75rem] text-[#ff9900] transition-transform duration-300 group-hover:-translate-x-6"></i>
            <span className="font-bold text-[#37475a] text-xs sm:text-sm md:text-base text-center">Fast Delivery</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 group cursor-default">
            <i className="fa-solid fa-shield-halved text-2xl sm:text-[1.75rem] text-[#ff9900] transition-transform duration-500 group-hover:-scale-x-100"></i>
            <span className="font-bold text-[#37475a] text-xs sm:text-sm md:text-base text-center">Secure Payments</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 group cursor-default">
            {/* Changed from -rotate-180 to -rotate-[360deg] for a full, seamless circle */}
            <i className="fa-solid fa-rotate-left text-2xl sm:text-[1.75rem] text-[#ff9900] -scale-x-100 transition-transform duration-500 group-hover:-rotate-[-360deg]"></i>
            <span className="font-bold text-[#37475a] text-xs sm:text-sm md:text-base text-center">Easy Returns</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 group cursor-default">
            <i className="fa-solid fa-headset text-2xl sm:text-[1.75rem] text-[#ff9900] transition-transform duration-300 group-hover:-translate-y-4"></i>
            <span className="font-bold text-[#37475a] text-xs sm:text-sm md:text-base text-center">24/7 Support</span>
          </div>

        </div>
      </section>
          
      {/* 4. ULTRA ENGAGEMENT HUB / FLASH DROP BANNER (Large Premium Desktop, Fluid Mobile) */}
      <section className="mx-4 sm:mx-6 mt-28 mb-10 flex justify-center relative z-20">
        
        {/* CHANGED: w-full max-w-[900px] makes it wide and substantial without stretching too thin */}
        <div className="w-full max-w-[1100px] bg-gradient-to-r from-[#0a0f16] via-[#131b26] to-[#0a0f16] rounded-[28px] sm:rounded-[36px] p-4 sm:p-5 md:px-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-0 border border-white/10 relative overflow-hidden transition-all group">

          {/* Subtle Shimmer Sweep Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]"></div>

          {/* Left Side: Scaled Up Title & Live Timer */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 relative z-10">
            
            <div className="flex items-center gap-3 md:gap-4">
              {/* Scaled up pulsing dot */}
              <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-500 opacity-60"></span>
                <span className="relative rounded-full h-3 w-3 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"></span>
              </div>
              <span className="text-white font-black text-[1.1rem] mr-8 md:text-[1.3rem] uppercase drop-shadow-md whitespace-nowrap">
                Flash Drop Active
              </span>
            </div>
            
            {/* Enlarged Dynamic Timer Box */}
            <div className="bg-gradient-to-r from-[#ff9900]/10 to-[#ff3300]/10 border border-[#ff9900]/30 text-[#ff9900] font-mono font-black text-[1.1rem] md:text-[1.25rem] px-5 py-2 rounded-xl sm:rounded-2xl flex items-center tracking-widest shadow-[0_0_20px_rgba(255,153,0,0.15)]">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Right Side: Scaled Up Live Viewers */}
          <div className="bg-white/5 border border-white/10 text-emerald-400 font-medium text-sm md:text-base px-6 py-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2.5 relative z-10 w-full sm:w-auto shrink-0 shadow-inner">
            <i className="fa-solid fa-users text-emerald-500 animate-pulse text-lg"></i>
            <span className="font-bold text-emerald-400 font-mono text-[1.15rem] md:text-[1.25rem]">{shoppers.toLocaleString()}</span> 
            <span className="text-slate-300 hidden min-[450px]:inline-block font-semibold tracking-wide whitespace-nowrap">people shopping now</span>
          </div>
          
        </div>
      </section>

        <section className="my-10 px-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-[2rem] font-black text-[#0f172a] tracking-tight">Trending Right Now</h2>
          <a href="#" className="font-bold text-[#ff9900] hover:text-[#e38800] transition-colors">View All <i className="fa-solid fa-arrow-right"></i></a>
        </div>

        {/* TRENDING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <TrendingCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. NEXT-LEVEL VOICES OF EVERBUY (INFINITE MARQUEE) */}
      <section className="bg-[#0a0f16] py-20 mt-12 relative overflow-hidden border-t border-white/5">
        {/* Cinematic Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#ff9900] blur-[150px] opacity-10 rounded-full pointer-events-none"></div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Voices of EverBuy</h2>
          <p className="text-slate-400 font-medium">Trusted by thousands of professionals and tech enthusiasts.</p>
        </div>

        {/* Inline style for the smooth marquee animation without needing tailwind.config edits */}
        <style>
          {`
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-infinite-scroll {
              display: flex;
              width: max-content;
              animation: infinite-scroll 45s linear infinite;
            }
            .animate-infinite-scroll:hover {
              animation-play-state: paused;
            }
            /* Hide scrollbar for the wrapper */
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>

        {/* Marquee Wrapper */}
        <div className="w-full overflow-hidden no-scrollbar relative z-10">
          {/* Gradient fade edges for smooth entrance/exit */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0f16] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0f16] to-transparent z-20 pointer-events-none"></div>

          <div className="animate-infinite-scroll gap-6 px-3">
            {[
              { id: 1, name: "Priya S.", role: "Software Engineer", img: "https://i.pravatar.cc/150?u=1", review: "The delivery was incredibly fast, and the packaging was premium. It genuinely felt like unboxing a luxury item rather than a standard online order." },
              { id: 2, name: "Rahul K.", role: "Full Stack Developer", img: "https://i.pravatar.cc/150?u=2", review: "Best selection of high-end electronics I've found online. The UI is incredibly smooth and finding exact specifications takes seconds." },
              { id: 3, name: "Aisha M.", role: "Data Scientist", img: "https://i.pravatar.cc/150?u=3", review: "The checkout process is flawless. Secured with AES-256 and no unnecessary friction. EverBuy is now my default platform for tech." },
              { id: 4, name: "Savannah.", role: "Tech Enthusiast", img: "https://i.pravatar.cc/150?u=4", review: "EverBuy Prime shipping is no joke. I ordered a smartwatch at midnight and it was on my desk before my lunch break the next day." },
              { id: 5, name: "Anil N.", role: "University Student", img: "https://i.pravatar.cc/150?u=5", review: "Customer service handled my return in under 5 minutes. No endless automated bots, just instant, helpful support. Lifetime customer right here." },
              { id: 6, name: "Rebecca M.", role: "Digital Marketer", img: "https://i.pravatar.cc/150?u=6", review: "Managed to snag a massive flash deal on noise-cancelling headphones. The live tracking and inventory updates are highly accurate." },
              { id: 7, name: "Elisa P.", role: "Freelance Designer", img: "https://i.pravatar.cc/150?u=7", review: "The aesthetics of this platform are unmatched. It makes shopping for everyday home essentials feel like a curated, premium experience." },
              { id: 8, name: "Rohan V.", role: "Cloud Architect", img: "https://i.pravatar.cc/150?u=8", review: "Finally, an e-commerce architecture that doesn't lag or feel cluttered. The search debounce is perfectly tuned. Highly reliable." }
            ].concat([ // Duplicating the array seamlessly creates the infinite loop illusion
              { id: 11, name: "Priya S.", role: "Software Engineer", img: "https://i.pravatar.cc/150?u=1", review: "The delivery was incredibly fast, and the packaging was premium. It genuinely felt like unboxing a luxury item rather than a standard online order." },
              { id: 12, name: "Rahul K.", role: "Full Stack Developer", img: "https://i.pravatar.cc/150?u=2", review: "Best selection of high-end electronics I've found online. The UI is incredibly smooth and finding exact specifications takes seconds." },
              { id: 13, name: "Aisha M.", role: "Data Scientist", img: "https://i.pravatar.cc/150?u=3", review: "The checkout process is flawless. Secured with AES-256 and no unnecessary friction. EverBuy is now my default platform for tech." },
              { id: 14, name: "Savannah.", role: "Tech Enthusiast", img: "https://i.pravatar.cc/150?u=4", review: "EverBuy Prime shipping is no joke. I ordered a smartwatch at midnight and it was on my desk before my lunch break the next day." },
              { id: 15, name: "Anil.", role: "University Student", img: "https://i.pravatar.cc/150?u=5", review: "Customer service handled my return in under 5 minutes. No endless automated bots, just instant, helpful support. Lifetime customer right here." },
              { id: 16, name: "Arjun D.", role: "Digital Marketer", img: "https://i.pravatar.cc/150?u=6", review: "Managed to snag a massive flash deal on noise-cancelling headphones. The live tracking and inventory updates are highly accurate." },
              { id: 17, name: "Elisa P.", role: "Freelance Designer", img: "https://i.pravatar.cc/150?u=7", review: "The aesthetics of this platform are unmatched. It makes shopping for everyday home essentials feel like a curated, premium experience." },
              { id: 18, name: "Rohan V.", role: "Cloud Architect", img: "https://i.pravatar.cc/150?u=8", review: "Finally, an e-commerce architecture that doesn't lag or feel cluttered. The search debounce is perfectly tuned. Highly reliable." }
            ]).map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="w-[350px] md:w-[400px] bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col gap-5 transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,153,0,0.15)] hover:border-[#ff9900]/30 cursor-grab active:cursor-grabbing shrink-0"
              >
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-[#ff9900] text-sm">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                    <i className="fa-solid fa-circle-check"></i> Verified
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 leading-relaxed text-[0.95rem] italic flex-grow">
                  "{testimonial.review}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff9900] to-[#ff3300] p-[2px]">
                      <div className="w-full h-full bg-[#0a0f16] rounded-full"></div>
                    </div>
                    <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full relative z-10 object-cover border-2 border-transparent" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[1rem] tracking-tight m-0">{testimonial.name}</h4>
                    <p className="text-[#ff9900] text-xs font-semibold m-0">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- ADVANCED CSS ANIMATIONS INJECTED DIRECTLY --- */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite linear;
          }
          @keyframes spin-slow {
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .tech-grid {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
          }
        `}
      </style>

      {/* 6. PLATFORM ECOSYSTEM (ULTRA BENTO GRID) */}
      <section className="relative px-4 sm:px-6 max-w-[1300px] mx-auto my-20 lg:my-28 pb-10">
        {/* Animated Tech Grid Background */}
        <div className="absolute inset-0 tech-grid [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none -z-10"></div>

        <div className="flex flex-col items-center text-center mb-12 lg:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[0.65rem] sm:text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse"></div>
            Platform Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight drop-shadow-sm px-2">
            The EverBuy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Ecosystem</span>
          </h2>
        </div>

        {/* ULTRA COMPACT 3-COLUMN BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
          
          {/* Bento Box 1: EverBuy Obsidian (Glassmorphism) - Spans 2 cols on tablet & desktop */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#0a0f16] rounded-[24px] sm:rounded-[32px] p-1 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] group cursor-pointer">
            {/* Liquid Mesh Gradient Orb */}
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-[#ff9900] via-[#ff3300] to-[#8b5cf6] blur-[80px] sm:blur-[100px] opacity-20 group-hover:opacity-40 animate-spin-slow rounded-full pointer-events-none transition-opacity duration-700 transform-gpu"></div>
            
            <div className="bg-[#0f172a]/70 backdrop-blur-3xl w-full h-full rounded-[20px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 relative z-10 border border-white/10 flex flex-col justify-center">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <i className="fa-brands fa-galactic-republic text-2xl sm:text-3xl text-[#ff9900] drop-shadow-[0_0_15px_rgba(255,153,0,0.8)]"></i>
                <span className="text-white/80 font-black tracking-[0.2em] uppercase text-[0.65rem] sm:text-xs">Premium Tier</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none mb-3 sm:mb-4 tracking-tight drop-shadow-lg">
                EverBuy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Obsidian</span>
              </h3>
              <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-md mb-6 sm:mb-8 font-medium leading-relaxed">
                Unlock zero-friction checkout, unlimited free shipping, and exclusive early access to highly anticipated tech drops.
              </p>
              
              {/* Magnetic Shimmer Button */}
              <button className="relative overflow-hidden w-max bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-black text-sm sm:text-base transition-transform active:scale-95 hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group/btn">
                <span className="relative z-10 flex items-center gap-2">Upgrade Account <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i></span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 translate-x-[-150%] animate-shimmer"></div>
              </button>
            </div>
          </div>

          {/* Bento Box 2: Localized Logistics (1 col on tablet & desktop) */}
          <div className="bg-gradient-to-br from-[#ff9900] to-[#ff4500] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden shadow-[0_15px_30px_rgba(255,153,0,0.3)] group cursor-pointer flex flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.15]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_60%)]"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-white/40 animate-float">
                <i className="fa-solid fa-bolt-lightning drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-md">Hyper-Local<br/>Logistics</h3>
              <p className="text-orange-50 font-medium text-xs sm:text-sm leading-relaxed mb-6">EverBuy Prime same-day delivery routing is now active for all orders within your jurisdiction.</p>
              <div className="mt-auto">
                <span className="text-white font-black flex items-center gap-2 group-hover:gap-3 transition-all tracking-wide text-sm sm:text-base">Track Network <i className="fa-solid fa-truck-fast"></i></span>
              </div>
            </div>
          </div>

          {/* Bento Box 3: Bank-Grade Security (1 col on tablet & desktop) */}
          <div className="bg-[#022c22] rounded-[24px] sm:rounded-[32px] p-1 relative overflow-hidden shadow-[0_15px_30px_rgba(16,185,129,0.2)] group cursor-pointer">
            {/* Radar Sweep Effect */}
            <div className="absolute top-0 right-0 w-full h-full bg-[conic-gradient(from_90deg_at_80%_20%,transparent_0deg,#10b981_360deg)] opacity-10 group-hover:opacity-30 animate-spin-slow transition-opacity duration-500"></div>

            <div className="bg-[#064e3b]/90 backdrop-blur-xl w-full h-full rounded-[20px] sm:rounded-[28px] p-6 sm:p-8 relative z-10 border border-[#10b981]/20 flex flex-col">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#10b981] rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl mb-6 shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-500 border border-emerald-300">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight tracking-tight">AES-256<br/>Encryption</h3>
              <p className="text-emerald-100/70 font-medium text-xs sm:text-sm leading-relaxed mb-6">Every transaction is tokenized. Your raw financial data never touches our servers.</p>
              
              <div className="bg-black/40 rounded-lg p-2.5 font-mono text-[0.6rem] sm:text-[0.65rem] text-emerald-400 border border-emerald-900/50 flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>Status: Fully Encrypted</span>
              </div>

              <div className="mt-auto">
                <span className="text-[#34d399] font-black flex items-center gap-2 group-hover:gap-3 transition-all tracking-wide text-sm sm:text-base">View Protocol <i className="fa-solid fa-code"></i></span>
              </div>
            </div>
          </div>

          {/* Bento Box 4: Mobile App (Spans 2 cols on desktop) */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col sm:flex-row items-center justify-between group cursor-pointer gap-6 sm:gap-0">
            <div className="relative z-10 w-full sm:w-[55%] text-center sm:text-left order-2 sm:order-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
                <i className="fa-brands fa-app-store-ios text-slate-800"></i> iOS & Android
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight leading-tight">Shop from absolutely anywhere.</h3>
              <p className="text-slate-500 font-medium mb-6 sm:mb-8 text-sm sm:text-base">Download the EverBuy mobile app for real-time order tracking and AR product previews.</p>
              
              {/* Flex-wrap prevents buttons from breaking layout on small phones */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <button className="bg-slate-900 hover:bg-black text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1 text-sm sm:text-base active:scale-95">
                  <i className="fa-brands fa-apple text-lg sm:text-xl"></i> App Store
                </button>
                <button className="bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 text-sm sm:text-base active:scale-95">
                  <i className="fa-brands fa-google-play text-lg sm:text-xl text-[#ff9900]"></i> Google Play
                </button>
              </div>
            </div>
            
            <div className="w-full sm:w-[45%] flex justify-center sm:justify-end relative order-1 sm:order-2 h-[150px] sm:h-auto">
              {/* Massive Glowing Aura behind the phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-[40px] sm:blur-[50px] group-hover:scale-125 transition-transform duration-700"></div>
              {/* Levitating Phone Icon - Scaled down for mobile sanity */}
              <div className="relative animate-float flex items-center justify-center">
                <i className="fa-solid fa-mobile-screen text-[7rem] sm:text-[9rem] lg:text-[10rem] text-slate-800 drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 transition-transform duration-500 relative z-10"></i>
                <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-black/10 blur-[8px] rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. ULTRA CINEMATIC NEWSLETTER NODE (Seamless Dark Transition) */}
      <div className="w-full bg-gradient-to-b from-[#eaeded] via-[#0a0f16] to-[#0a0f16] pt-12 pb-8 sm:pt-20 sm:pb-12 mt-12">
        <section className="mx-4 sm:mx-6 xl:mx-auto max-w-[1400px] relative z-20">
        
        {/* Floating Rounded Container */}
        <div className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-[#0a0f16] rounded-[32px] sm:rounded-[48px] shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/5 flex flex-col items-center">
          
          {/* Massive Animated Background Orbs (Contained within rounded borders) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] sm:w-[1000px] h-[300px] sm:h-[500px] bg-gradient-to-r from-[#ff9900]/20 via-[#ff3300]/20 to-transparent blur-[80px] sm:blur-[120px] rounded-full pointer-events-none animate-pulse transform-gpu"></div>
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none"></div>
          
          {/* Subtle Tech Grid inside the dark area */}
          <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
            
            {/* System Online Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[0.65rem] sm:text-xs font-black uppercase tracking-widest mb-6 sm:mb-8 shadow-xl backdrop-blur-md">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              System Online
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-black text-white mb-4 sm:mb-6 drop-shadow-2xl px-2">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Network.</span>
            </h2>
            
            <p className="text-sm sm:text-lg md:text-xl text-slate-400 font-medium mb-10 sm:mb-12 max-w-[95%] sm:max-w-2xl mx-auto leading-relaxed px-2">
              Get exclusive early access to limited tech drops, flash deals, and Obsidian tier invitations directly to your mainframe.
            </p>
            
            {/* Glowing Neon Input Field - ULTRA FLUID PILL SHAPE */}
            <div className="relative w-full max-w-[95%] sm:max-w-xl mx-auto group">
              {/* The outer glowing border effect (Adaptive inset for mobile) */}
              <div className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-[#ff9900] via-[#ff3300] to-[#ff9900] rounded-full blur-md sm:blur-lg opacity-40 group-focus-within:opacity-80 group-hover:opacity-60 transition duration-500 animate-shimmer bg-[length:200%_auto]"></div>
              
              {/* The main form container */}
              <form onSubmit={handleInitialize} className="relative flex items-center w-full bg-[#0f172a] rounded-full p-1.5 sm:p-2 shadow-2xl border border-white/10 backdrop-blur-xl">
                
                {/* Mail Icon - Hides on ultra-small screens to preserve typing space */}
                <div className="pl-4 sm:pl-6 hidden min-[360px]:flex items-center justify-center text-slate-500 transition-colors group-focus-within:text-[#ff9900]">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                
                {/* text-[16px] REQUIRED to stop iOS auto-zoom */}
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isInitialized}
                  required
                  placeholder="Enter system email..." 
                  className="flex-grow bg-transparent border-none ml-4 mr-4 outline-none  px-3 sm:px-4 text-white font-medium placeholder:text-slate-500 py-2 sm:py-[14px] rounded-3xl text-[16px] sm:text-lg w-full disabled:opacity-50 tracking-wide"
                />
                
                {/* Adaptive Button */}
                <button 
                  type="submit"
                  disabled={isInitialized}
                  className={`px-5 sm:px-8 py-3 sm:py-4 rounded-full font-black text-sm sm:text-base transition-all flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 ${
                    isInitialized 
                      ? 'bg-emerald-500 text-white cursor-default shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                      : 'bg-white hover:bg-slate-200 text-slate-900 hover:scale-105 active:scale-95 shadow-md'
                  }`}
                >
                  {isInitialized ? (
                    <>
                      <span className="hidden tracking-wider min-[380px]:inline">Initialized</span> 
                      <i className="fa-solid fa-check text-white text-2xl"></i>
                    </>
                  ) : (
                    <>
                      <span className="hidden tracking-wide min-[380px]:inline">Initialize</span> 
                      <i className="fa-solid fa-bolt text-[#ff9900] text-lg"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Legal Text */}
            <p className="text-[0.65rem] sm:text-xs tracking-wider text-slate-500 mt-6 sm:mt-8 font-medium">
              By initializing, you agree to our <span className="text-white underline underline-offset-2 cursor-pointer hover:text-[#ff9900] transition-colors">Terms of Service</span> and <span className="text-white underline underline-offset-2 cursor-pointer hover:text-[#ff9900] transition-colors">Privacy Protocol</span>.
            </p>

          </div>
        </div>
        </section>
      </div>
    </main>
  );
}