import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

// Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';

// Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Drawers & Modals
import CartDrawer from './components/CartDrawer';
import GlobalModals from './components/GlobalModals';
import SignInModal from './components/SignInModal';

export default function App() {
  // Modal states triggered by Navbar interactions
  const [locOpen, setLocOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(null);

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          
          <div className="min-h-screen bg-[#131921] flex flex-col font-sans">
            
            <Navbar 
              setLocOpen={setLocOpen} 
              setSignInOpen={setSignInOpen} 
              setInfoOpen={setInfoOpen} 
            />

            <main className="flex-grow"> 
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Standard exact matches */}
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                
                {/* Catch plural typos if your Home page links use "categories" instead of "category" */}
                <Route path="/categories/:categoryId" element={<CategoryPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                
                <Route path="/checkout" element={<Checkout />} />
                
                {/* WILDCARD FALLBACK: If a URL is completely broken, return to Home instead of a black screen */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>


            <Footer />

            {/* --- GLOBAL OVERLAYS & MODALS --- */}
            
            {/* Slide-out cart panel */}
            <CartDrawer />
            
            {/* The new Sign-In Modal */}
            <SignInModal 
              isOpen={signInOpen} 
              onClose={() => setSignInOpen(false)} 
            />
            
            {/* Handles Location, Categories, and Info Popups */}
            <GlobalModals 
              locOpen={locOpen} 
              setLocOpen={setLocOpen}
              infoOpen={infoOpen} 
              setInfoOpen={setInfoOpen}
            />
            
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}