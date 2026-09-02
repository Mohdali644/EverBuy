import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function SignInModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  if (!isOpen) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    // Require both fields to be filled before authenticating
    if (name.trim() && password.trim()) {
      // Only pass the name/email to the global state, keeping the password secure and out of the Navbar
      login({ name: name, email: `${name.toLowerCase().replace(/\s/g, '')}@example.com` });
      
      // Clear the form and close the modal
      setPassword('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Deep Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0f16]/60 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff9900] to-[#ff3300] p-0.5 shadow-lg">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <i className="fa-solid fa-bolt text-2xl text-[#ff9900]"></i>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight mb-2">Welcome to EverBuy</h2>
        <p className="text-slate-500 text-center text-sm font-medium mb-8">Sign in to unlock personalized deals and hyper-fast checkout.</p>

        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div className="relative flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username / Email</label>
            <input 
              type="text" 
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 transition-all"
            />
          </div>

          {/* New Password Field */}
          <div className="relative flex flex-col gap-1 mt-1">
            <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-[#ff9900] hover:text-[#ff3300] transition-colors tracking-wide">Forgot?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#ff9900] focus:ring-4 focus:ring-[#ff9900]/10 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-slate-900 hover:bg-black text-white rounded-2xl px-5 py-4 font-bold transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Authenticate <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}