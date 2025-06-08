import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Home, Info, Camera, Map, Image, Heart, HelpCircle, Mail, Car, Sparkles, Mountain } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeHoverIndex, setActiveHoverIndex] = useState(-1);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY + 10) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 50) {
        setIsHeaderVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Mouse tracking for header glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (sideMenuRef.current && !sideMenuRef.current.contains(target) && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: <Home size={18} />, color: 'from-blue-400 to-cyan-400' },
    { id: 'about', label: 'About', icon: <Info size={18} />, color: 'from-green-400 to-emerald-400' },
    { id: 'wildlife', label: 'Wildlife', icon: <Camera size={18} />, color: 'from-orange-400 to-red-400' },
    { id: 'zones', label: 'Park Zones', icon: <Map size={18} />, color: 'from-purple-400 to-pink-400' },
    { id: 'sightings', label: 'Sightings Update', icon: <Mountain size={18} />, color: 'from-yellow-400 to-orange-400' },
    { id: 'safari', label: 'Safari', icon: <Car size={18} />, color: 'from-indigo-400 to-purple-400' },
    { id: 'gallery', label: 'Gallery', icon: <Image size={18} />, color: 'from-pink-400 to-rose-400' },
    { id: 'conservation', label: 'Conservation', icon: <Heart size={18} />, color: 'from-red-400 to-pink-400' },
    { id: 'visitor-guidelines', label: 'Visitor Tips', icon: <HelpCircle size={18} />, color: 'from-teal-400 to-blue-400' },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} />, color: 'from-amber-400 to-orange-400' }
  ];

  return (
    <>
      {/* Enhanced backdrop with blur and pattern */}
      <div 
        className={`fixed inset-0 transition-all duration-700 ${
          isMenuOpen ? 'opacity-60 z-40 backdrop-blur-sm' : 'opacity-0 -z-10'
        }`}
        style={{
          background: isMenuOpen ? 
            'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)' : 
            'transparent'
        }}
        aria-hidden="true"
      />
      
      {/* Enhanced side menu with glassmorphism and animations */}
      <div 
        ref={sideMenuRef}
        className={`side-menu fixed top-0 right-0 h-full w-80 z-50 transform transition-all duration-700 ease-out shadow-2xl
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          overflow-hidden flex flex-col`}
        style={{
          background: '#f5ebe0',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        aria-hidden={!isMenuOpen}
      >
        {/* Animated top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-pulse">
            <div className="h-full w-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" 
                 style={{ animation: 'shimmer 3s ease-in-out infinite alternate' }}></div>
          </div>
        </div>
        
        {/* Enhanced header with glow effect */}          <div className="flex justify-between items-center p-6 border-b border-[#3C3228]/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3C3228]/5 to-[#3C3228]/10 animate-pulse" />
          <span className="text-[#3C3228] font-bold tracking-wider text-lg flex items-center relative z-10">
            <Sparkles className="mr-2 text-[#3C3228] animate-pulse" size={20} />
            RANTHAMBORE
          </span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-teal-300 transition-all duration-300 p-2 rounded-full hover:bg-white/10 hover:rotate-90 transform relative z-10 group"
            aria-label="Close menu"
          >
            <X size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Enhanced navigation with hover effects */}
        <nav className="py-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500/50 scrollbar-track-transparent">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  className={`flex items-center px-6 py-4 font-medium transition-all duration-500 relative group overflow-hidden ${
                    activeSection === link.id
                      ? 'bg-gradient-to-r from-black/5 to-black/10 text-black border-r-2 border-black'
                      : 'text-black hover:text-black hover:bg-black/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={() => setActiveHoverIndex(index)}
                  onMouseLeave={() => setActiveHoverIndex(-1)}
                >
                  {/* Animated background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-all duration-500 transform translate-x-full group-hover:translate-x-0`} />
                  
                  {/* Active indicator */}
                  {activeSection === link.id && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-r animate-pulse" />
                  )}
                  
                  {/* Icon with special effects */}
                  <span className={`mr-4 relative z-10 transition-all duration-300 ${
                    activeSection === link.id ? 'text-black scale-110' : 
                    activeHoverIndex === index ? 'text-black scale-105' : 'text-black'
                  }`}>
                    <div className={`${activeHoverIndex === index ? 'animate-bounce' : ''}`}>
                      {link.icon}
                    </div>
                  </span>
                  
                  {/* Text with glow effect */}
                  <span className={`flex-1 relative z-10 transition-all duration-300 ${
                    activeSection === link.id ? 'font-semibold' : ''
                  } ${activeHoverIndex === index ? 'translate-x-1' : ''}`}>
                    {link.label}
                  </span>
                  
                  {/* Enhanced chevron */}
                  <ChevronRight 
                    size={16} 
                    className={`transform transition-all duration-500 relative z-10 ${
                      activeSection === link.id ? 'opacity-100 text-black scale-110' : 
                      activeHoverIndex === index ? 'opacity-80 translate-x-1 text-black' : 
                      'opacity-0 -translate-x-2'
                    }`} 
                  />
                  
                  {/* Ripple effect on hover */}
                  {activeHoverIndex === index && (
                    <div className="absolute inset-0 animate-ping bg-white/5 rounded-lg" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Enhanced CTA button */}
        <div className="w-full px-6 mt-6 mb-6">
          <a
            href="#booking"
            className="block w-full py-4 text-black bg-[#f5ebe0] border-2 border-black font-bold text-center rounded-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black relative overflow-hidden group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center justify-center">
              <Sparkles className="mr-2 animate-pulse text-black" size={18} />
              Book Safari Now
              <Sparkles className="ml-2 animate-pulse text-black" size={18} />
            </span>
          </a>
        </div>
      </div>
      
      {/* Enhanced main header */}
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-700 ${
          isScrolled 
            ? 'bg-black py-2' 
            : 'bg-gradient-to-b from-slate-900/70 via-slate-800/50 to-transparent py-4'
        } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="#home" className="flex items-center group relative">
                {/* Glow effect behind logo */}
                <div className={`absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-xl blur-xl transition-all duration-500 ${
                  isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
                }`} />
                
                <div className="overflow-hidden rounded-lg relative z-10">
                  <img 
                    src={isScrolled ? "./Images/Hero/logo.png" : "./Images/Hero/logo.png"}
                    alt="Ranthambore National Park Logo" 
                    className={`transition-all duration-700 transform group-hover:scale-105 group-hover:rotate-1 ${
                      isScrolled ? 'h-16 w-auto brightness-0 invert' : 'h-24 w-auto'
                    }`} 
                    style={{ 
                      imageRendering: 'crisp-edges',
                      filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(1)'
                    }}
                  />
                </div>
              </a>
            </div>
            
            <div className="flex items-center space-x-2">              
              <button
                className={`menu-button relative p-3 ${isScrolled ? 'text-white' : 'text-white/90'} hover:text-white rounded-xl transition-all duration-500 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400/50 group overflow-hidden`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                style={{
                  background: isMenuOpen ? 
                    'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)' :
                    isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-6 h-6 flex flex-col justify-center items-center relative z-10">
                  <span className={`bg-current block transition-all duration-500 ease-out h-0.5 w-5 rounded-sm ${
                    isMenuOpen ? 'rotate-45 translate-y-1 bg-teal-400' : '-translate-y-1'
                  }`}></span>
                  <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                    isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}></span>
                  <span className={`bg-current block transition-all duration-500 ease-out h-0.5 w-5 rounded-sm ${
                    isMenuOpen ? '-rotate-45 -translate-y-1 bg-teal-400' : 'translate-y-1'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced progress bar */}
        {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-700 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 transition-all duration-300 ease-out relative"
            style={{ 
              width: typeof window !== 'undefined' ? `${Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` : '0%'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-500 animate-pulse opacity-50" />
          </div>
        </div> */}
      </header>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.5);
          border-radius: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 184, 166, 0.8);
        }
      `}</style>
    </>
  );
};

export default Header;