import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Ruler, Calendar, Compass, Camera, Leaf, CloudSun, BadgeCheck } from 'lucide-react';

const QuickFacts: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
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

  const facts = [
    {
      icon: <MapPin className="h-8 w-8 text-[#997B66]" />,
      title: "Location",
      description: "Sawai Madhopur district, Rajasthan, at the junction of Aravalli and Vindhya hill ranges.",
      stats: [
        { value: "180 km", label: "from Jaipur" },
        { value: "400 km", label: "from Delhi" }
      ]
    },
    {
      icon: <Ruler className="h-8 w-8 text-[#997B66]" />,
      title: "Park Area",
      description: "1,334 sq. km of diverse landscapes including dry deciduous forests, open grasslands, and lakes.",
      stats: [
        { value: "10", label: "safari zones" },
        { value: "3", label: "major lakes" }
      ]
    },
    {
      icon: <CloudSun className="h-8 w-8 text-[#997B66]" />,
      title: "Best Time to Visit",
      description: "October to April when the weather is pleasant and wildlife sightings are frequent.",
      stats: [
        { value: "15-35°C", label: "temperature" },
        { value: "Low", label: "rainfall" }
      ]
    },
    {
      icon: <Camera className="h-8 w-8 text-[#997B66]" />,
      title: "Wildlife Viewing",
      description: "Royal Bengal Tigers and diverse ecosystem with over 300 bird species and various wildlife.",
      stats: [
        { value: "70+", label: "tigers" },
        { value: "300+", label: "bird species" }
      ]
    },
    {
      icon: <Compass className="h-8 w-8 text-[#997B66]" />,
      title: "Safari Types",
      description: "Jeep safaris, canter safaris, and nature walks with expert guides for comprehensive wildlife exploration.",
      stats: [
        { value: "2", label: "daily slots" },
        { value: "3.5 hrs", label: "per safari" }
      ]
    },
    {
      icon: <Calendar className="h-8 w-8 text-[#997B66]" />,
      title: "Park Season",
      description: "Open from October 1 to June 30 annually. Closed during monsoon season (July-September).",
      stats: [
        { value: "9", label: "months open" },
        { value: "6 AM & 2 PM", label: "safari timings" }
      ]
    },
    {
      icon: <Leaf className="h-8 w-8 text-[#997B66]" />,
      title: "Ecosystem",
      description: "Diverse habitats including dense jungle, grasslands, lakes, and ancient ruins providing unique niches for wildlife.",
      stats: [
        { value: "5+", label: "ecosystems" },
        { value: "40+", label: "mammals" }
      ]
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-[#997B66]" />,
      title: "Conservation Status",
      description: "Designated as Project Tiger reserve in 1973 and continues to be one of India's most successful conservation stories.",
      stats: [
        { value: "1973", label: "established" },
        { value: "UNESCO", label: "nominated" }
      ]
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-[#fcfcf4] relative overflow-hidden font-serif"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with highlighted tagline */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
          <div className="inline-block max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-[#3C3228] relative inline-block px-6 py-3 bg-[#F2EDE4] rounded-lg shadow-sm">
            Quick Facts About Ranthambore
            <span className={`absolute bottom-0 left-0 w-full h-1 bg-[#997B66] transform origin-left transition-transform duration-1000 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
          </h2>
          </div>
        </div>
        
        {/* Facts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => (
            <div
              key={index}
              className={`card transform transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${150 * (index % 4)}ms`,
                width: '100%', // Override the fixed width to make it responsive
                height: 'auto'  // Override the fixed height to make it responsive
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#997B66]">{fact.icon}</span>
                <h3 className="text-lg font-bold text-[#3C3228]">{fact.title}</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-[#5C5248] leading-relaxed">{fact.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5DED5]">
                  {fact.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-bold text-[#997B66] text-lg">{stat.value}</div>
                      <div className="text-xs text-[#7D7268] uppercase tracking-wide mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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

        .card {
          padding: 1.5rem;
          background: #f8f8f8;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.08);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  );
};

export default QuickFacts;