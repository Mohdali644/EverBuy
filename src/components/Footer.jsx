export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    {
      title: "Get to Know Us",
      links: [
        "Careers at EverBuy",
        "Engineering Blog",
        "Corporate Information",
        "Sustainability Protocol",
      ],
    },
    {
      title: "Make Money",
      links: [
        "Sell on Platform",
        "Global Affiliate Program",
        "Fulfillment by EverBuy",
        "Advertise Your Brand",
      ],
    },
    {
      title: "Payment Architecture",
      links: [
        "EverBuy Obsidian Card",
        "Reward Points Network",
        "Installment Plans",
        "Currency Converter",
      ],
    },
    {
      title: "Help & Support",
      links: [
        "Your Account",
        "Order Tracking",
        "Return Center",
        "24/7 Support Desk",
      ],
    },
  ];

  return (
    // Reduced overall padding from pt-24 pb-10 to pt-12 pb-8
    <footer className="relative bg-[#0a0f16] pt-12 pb-8 border-t border-white/5 overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#ff9900]/5 to-transparent blur-[80px] pointer-events-none"></div>

      {/* Massive Faded Watermark */}
      <div className="absolute -bottom-20 -right-10 text-[15rem] font-black text-white/[0.02] tracking-tighter pointer-events-none select-none rotate-[-5deg]">
        EVERBUY
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* --- TOP ROW: BRAND & STATUS --- */}
        {/* Reduced padding and margins from pb-12 mb-12 to pb-8 mb-8 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-8 gap-6">
          <div className="flex flex-col gap-2">
            {/* Logo */}

            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group w-max"
              onClick={scrollToTop}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#ff9900] blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full"></div>
                <svg
                  className="w-8 h-8 relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22.5L2 16.7V7.3L12 1.5L22 7.3V16.7L12 22.5Z"
                    stroke="url(#logo-grad-footer)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22.5V12M12 12L2 7.3M12 12L22 7.3"
                    stroke="url(#logo-grad-footer)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 1.5L22 7.3L12 12L2 7.3L12 1.5Z"
                    fill="url(#logo-grad-footer)"
                    fillOpacity="0.2"
                  />
                  <defs>
                    <linearGradient
                      id="logo-grad-footer"
                      x1="3"
                      y1="2"
                      x2="21"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF9900" />
                      <stop offset="1" stopColor="#FF3300" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex items-baseline tracking-[-0.05em]">
                <span className="text-2xl font-black text-white drop-shadow-md">
                  Ever
                </span>
                <span className="text-2xl font-black bg-gradient-to-br from-[#FF9900] to-[#FF3300] bg-clip-text text-transparent italic drop-shadow-md">
                  Buy
                </span>
              </div>
            </div>
          </div>
          {/* Live System Status */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
            </div>
            <span className="text-slate-200 text-xs font-bold tracking-wide">
              All Systems Operational
            </span>
          </div>
        </div>

        {/* --- MIDDLE ROW: LINKS GRID --- */}
        {/* Reduced bottom margin to mb-8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((column, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">
                {column.title}
              </h3>
              {/* Tightened link gap from gap-4 to gap-2.5 */}
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="group flex items-center text-slate-400 hover:text-white transition-colors duration-300 font-medium text-[0.9rem] w-max"
                    >
                      <span className="relative overflow-hidden flex items-center">
                        <i className="fa-solid fa-arrow-right text-[#ff9900] text-[0.65rem] absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300"></i>
                        <span className="group-hover:translate-x-5 transition-transform duration-300">
                          {link}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- BOTTOM ROW: COPYRIGHT & SOCIALS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-6">
          <div className="text-slate-500 text-xs font-medium flex items-center gap-1">
            &copy; {new Date().getFullYear()} EverBuy.com, Inc.{" "}
            <span className="hidden sm:inline">or its affiliates.</span>
          </div>

          {/* Pill-Shaped Social Links */}
          <div className="flex gap-2">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <i className="fa-brands fa-twitter text-[0.9rem]"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#E1306C] hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <i className="fa-brands fa-instagram text-[0.9rem]"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#0077B5] hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <i className="fa-brands fa-linkedin-in text-[0.9rem]"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <i className="fa-brands fa-github text-[0.9rem]"></i>
            </a>
          </div>

          {/* Glowing Back to Top Pill */}
          <button
            onClick={scrollToTop}
            className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-[#ff9900]/50 text-white px-5 py-2 rounded-full font-bold text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,153,0,0.2)] flex items-center gap-2"
          >
            <span className="relative z-10">Back to Top</span>
            <i className="fa-solid fa-arrow-up relative z-10 group-hover:-translate-y-1 transition-transform duration-300 text-[#ff9900]"></i>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff9900]/20 to-[#ff3300]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </footer>
  );
}
