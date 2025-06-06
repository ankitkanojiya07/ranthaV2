import React, { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown, Castle, Crown, Shield } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleCard = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Enhanced content for expandable cards
  const cardContent = [
    {
      title: "Ancient Glory",
      subtitle: "A Fortress With Stories",
      icon: <Castle size={24} className="text-[#594D3C]" />,
      shortDesc: "Tales of sieges, valiant Rajput kings, and Mughal invasions. The fort has witnessed centuries of battles and royal ceremonies.",
      fullContent: "The majestic Ranthambore Fort dates back to the 10th century and has been a silent witness to numerous historical events. Built by the Chauhan dynasty, it has weathered countless sieges and battles. The fort's strategic position atop a 700-foot hill gave it military advantage, while its intricate architecture showcases the artistic brilliance of medieval India. Within its walls, you'll find temples dedicated to Ganesh, Shiva, and Ramlalaji, each with their own fascinating history. The fort's massive stone ramparts and imposing gateways tell stories of valor, with each stone bearing witness to the rise and fall of empires. Archaeological findings suggest that the area around the fort has been inhabited since at least 5000 BCE, making it one of India's most historically significant landmarks.",
      image: "./Images/About/1.jpg",
      accent: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Royal Legacy",
      subtitle: "From Hunting Grounds to Sanctuary",
      icon: <Crown size={24} className="text-[#594D3C]" />,
      shortDesc: "The park's role in royal hunting expeditions. Experience the paths where Maharajas once tracked magnificent game.",
      fullContent: "Before becoming a wildlife sanctuary, Ranthambore served as the private hunting grounds for the Maharajas of Jaipur. The elaborate hunting pavilions scattered throughout the park offer glimpses into royal leisure activities of bygone eras. Maharajas would host extravagant hunting parties for visiting dignitaries, including British viceroys and European nobility. The famous hunting lodge known as 'Jogi Mahal' still stands at the edge of Padam Talao lake, though access is now restricted. Historical records mention tiger hunts where over 20 tigers were killed in a single expedition—a stark contrast to today's conservation efforts. The transition from royal hunting reserve to protected sanctuary represents a profound shift in our relationship with wildlife and marks an important chapter in Indian conservation history.",
      image: "./Images/About/2.jpg",
      accent: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Modern Conservation",
      subtitle: "Preserving Natural Heritage",
      icon: <Shield size={24} className="text-[#594D3C]" />,
      shortDesc: "Turning battlefields into biodiversity havens. Learn how Ranthambore has become a model for wildlife conservation in India.",
      fullContent: "Ranthambore National Park has evolved from near ecological disaster to conservation success story. In 1973, it was among the first nine tiger reserves established under Project Tiger—India's ambitious tiger conservation program. When protection began, fewer than 20 tigers remained; today, the park supports over 70 tigers. Conservation efforts extend beyond tigers to include habitat restoration, anti-poaching measures, and community involvement. The park has pioneered innovative approaches like camera trapping for monitoring wildlife and involving local communities as conservation stakeholders. Former poachers have been rehabilitated as forest guards, using their intimate knowledge of the terrain to protect rather than hunt wildlife. Ranthambore's success has inspired similar projects across Asia, demonstrating how determined conservation efforts can reverse the decline of endangered species.",
      image: "./Images/About/3.jpg",
      accent: "from-amber-500/20 to-orange-500/20"
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-24 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} bg-white relative overflow-hidden`}
    >
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className={`text-tiny text-[var(--color-text-secondary)] mb-2 block font-medium tracking-widest uppercase transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Discover Our Heritage
            </span>
            <h2 className={`heading-serif text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] relative inline-block pb-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              About Ranthambore
              <span className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary)]/50 transform origin-left transition-transform duration-1000 ease-out delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </h2>
          </div>
          <p className={`mt-4 text-[var(--color-text-secondary)] max-w-3xl mx-auto text-lg body-sans transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            A Tapestry of History, Nature, and Culture
          </p>
        </div>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Text Content */}
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-6">
              <p className="body-sans text-[var(--color-text-primary)] leading-relaxed text-lg">
                Ranthambore is not just about its tigers; it is a living museum where centuries-old temples, 
                hunting pavilions, and majestic forts blend with untamed wilderness. The park's 
                unique ecosystem supports an incredible variety of life against the backdrop of rugged terrain.
              </p>
              
              <div className="pl-5 border-l-4 border-[var(--color-secondary)] relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-[var(--color-secondary)] rounded-full animate-pulse"></div>
                <p className="text-[var(--color-text-secondary)] leading-relaxed italic heading-serif text-xl">
                  "Historically, the Ranthambore Fort, a UNESCO World Heritage Site, has been a sentinel 
                  of power since the 10th century. It overlooks the entire park, standing as a proud 
                  reminder of Rajasthan's valor and resilience."
                </p>
              </div>
              
              <p className="body-sans text-[var(--color-text-primary)] leading-relaxed text-lg">
                Once the private hunting grounds of Jaipur's Maharajas, Ranthambore now thrives as a conservation 
                success story under Project Tiger. Beyond its regal predators, visitors can experience an ecosystem 
                brimming with life: leopards, hyenas, sloth bears, marsh crocodiles, and over 300 bird species.
              </p>
            </div>
            
            {/* Enhanced Quick Facts */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Established", value: "1973" },
                { label: "Area", value: "1,334 sq km" },
                { label: "Elevation", value: "215-505m" },
                { label: "Tiger Population", value: "~70" }
              ].map((fact, idx) => (
                <div key={idx} className="bg-[var(--color-surface)] bg-opacity-70 backdrop-blur-sm p-4 rounded-lg shadow-sm border-2 border-black hover:shadow-md hover:scale-105 transition-all duration-300 group">
                  <span className="text-small text-[var(--color-text-secondary)] block font-medium group-hover:text-[var(--color-text-primary)] transition-colors duration-300">{fact.label}</span>
                  <span className="text-xl font-bold text-[var(--color-text-primary)] heading-serif">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Enhanced Image */}
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              {/* Main Image with enhanced effects */}
              <div className="rounded-lg overflow-hidden shadow-2xl relative">
                <img 
                  src="./Images/About/map.jpg" 
                  alt="Ranthambore Fort" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Enhanced UNESCO Badge */}
              <div className="absolute -bottom-5 -right-5 bg-[#bc6c25] text-white p-4 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 hover:scale-110">
                <div className="flex items-center">
                  <div className="mr-3">
                    <svg className="w-10 h-10" viewBox="0 0 122.88 122.88" fill="currentColor">
                      <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM76.39,32.94c-.11-.32-.22-.64-.34-1l-2.18.95a33.67,33.67,0,0,0-47.74,0l-2.18-.95c-.12.32-.23.64-.34,1L26.8,34.06a33.3,33.3,0,0,0,.63,37.8l-3.7,3.7L30,81.84l6.28-6.28-3.65-3.65a26.23,26.23,0,0,1,32.89-39.8,26.37,26.37,0,0,1,24.75,33.52L86.6,62.28L92.88,68.56l6.28-6.28-3.7-3.7a33.51,33.51,0,0,0,.63-37.8l3.19-1.12c-.11-.32-.22-.64-.34-1L96.76,19.6A33.58,33.58,0,0,0,74.82,10h0L76.39,32.94ZM74.05,45.51c0,12.93-7.46,23.61-17.2,24.94V86.06l9.65,9.65L62.22,100l-4.64-4.64L53,100l-4.28-4.29,9.65-9.65V70.45c-9.74-1.33-17.2-12-17.2-24.94Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wide">UNESCO</p>
                    <p className="font-bold">World Heritage Site</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Location Badge */}
              <div className="absolute -top-5 -left-5 bg-[#bc6c25] text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300 hover:scale-110">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Ranthambore, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Historical Timeline Cards */}
        <div className={`mt-16 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Professional section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-text-secondary)] to-transparent flex-1"></div>
              <div className="px-6">
                <div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full mx-auto mb-3 animate-pulse"></div>
              </div>
              <div className="h-px bg-gradient-to-l from-transparent via-[var(--color-text-secondary)] to-transparent flex-1"></div>
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3 heading-serif">
              Exploring Ranthambore's Legacy
            </h3>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto body-sans">
              Journey through time and discover the rich tapestry of history, royalty, and conservation that defines this remarkable sanctuary.
            </p>
          </div>
          
          <div className="space-y-8">
            {cardContent.map((card, index) => (
              <div 
                key={index}
                className={`bg-[var(--color-surface)] rounded-2xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl group relative ${
                  expandedCard === index ? 'ring-2 ring-[var(--color-secondary)] scale-[1.02]' : ''
                } ${isVisible ? `animate-fade-in-up` : ''}`}
                style={{ animationDelay: `${index * 200 + 800}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                
                <div className={`relative z-10 ${
                  expandedCard === index 
                    ? 'grid grid-cols-1 lg:grid-cols-3' 
                    : 'grid grid-cols-1 md:grid-cols-4'
                }`}>
                  {/* Enhanced Card Image */}
                  <div className={`${
                    expandedCard === index ? 'lg:col-span-1' : 'md:col-span-1'
                  } overflow-hidden relative group/image`}>
                    <img 
                      src={card.image}
                      alt={card.title} 
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        expandedCard === index ? 'h-64 lg:h-full' : 'h-48 md:h-full'
                      }`}
                    />
                    
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Floating icon indicator */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {card.icon}
                    </div>
                    
                    {expandedCard !== index && (
                      <div className="absolute inset-0 flex items-end p-6 md:hidden">
                        <div className="text-white">
                          <h4 className="font-bold text-xl mb-1">{card.title}</h4>
                          <p className="text-white/80 text-sm">{card.subtitle}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Card Content */}
                  <div className={`${
                    expandedCard === index ? 'lg:col-span-2 p-8' : 'md:col-span-3 p-6'
                  } relative`}>
                    {/* Professional header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`bg-[var(--color-surface-alt)] p-3 rounded-xl shadow-sm transition-all duration-300 ${
                        hoveredCard === index ? 'scale-110 rotate-3' : ''
                      }`}>
                        {card.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 heading-serif">
                          {card.title}
                        </h3>
                        <p className="text-[var(--color-text-secondary)] font-medium tracking-wide text-sm uppercase">
                          {card.subtitle}
                        </p>
                        {/* Professional divider */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[var(--color-secondary)] to-transparent mt-2"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced content area */}
                    <div className={`relative ${
                      expandedCard === index ? 'max-h-full' : 'max-h-20 overflow-hidden'
                    }`}>
                      <p className={`text-[var(--color-text-primary)] leading-relaxed transition-all duration-500 ${
                        expandedCard === index ? 'text-base' : 'text-sm'
                      }`}>
                        {expandedCard === index ? card.fullContent : card.shortDesc}
                      </p>
                      
                      {expandedCard !== index && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--color-surface)] to-transparent"></div>
                      )}
                    </div>
                    
                    {/* Enhanced action button */}
                    <button 
                      className={`mt-6 px-4 py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 group/btn ${
                        expandedCard === index 
                          ? 'bg-[var(--color-text-secondary)] text-[var(--color-surface)] hover:bg-[var(--color-text-primary)]' 
                          : 'bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-surface)]'
                      } focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2`}
                      onClick={(e) => toggleCard(index, e)}
                    >
                      {expandedCard === index ? (
                        <>
                          Show Less 
                          <ChevronUp size={18} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                        </>
                      ) : (
                        <>
                          Discover More 
                          <ChevronDown size={18} className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        

      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default About;