import React, { useState, useCallback, useEffect } from 'react';
import { Map, X, Camera, Clock, Calendar, Award, AlertTriangle, ChevronRight, Eye, Sparkles } from 'lucide-react';

// Strong typing with appropriate interfaces
interface ZoneDetailedInfo {
  bestTime: string;
  difficulty: string;
  duration: string;
  wildlife: string[];
  photography: string;
  tips: string[];
}

interface ZoneData {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  detailedInfo: ZoneDetailedInfo;
}

type ZoneId = 'core' | 'buffer' | 'heritage';

// Separate data from component for cleaner organization
const ZONE_DATA: Record<ZoneId, ZoneData> = {
  core: {
    id: "core",
    name: "Zones (1-5)",
    description: "The prime tiger territories with higher chances of sightings. Zone 3 is particularly famous for lakes like Rajbagh and Padam Talao where tigers often come to drink water.",
    image: "./Images/zone/4.jpg",
    highlights:  [
      "Zone 1: T-101 (M), T-105(F), T-107(F) & T-39(F)",
      "Zone 2: T-84(F) with 3 cubs, T-101 (M), T-105(F), T-120(M), T-123(M)",
      "Zone 3: T-124(F) with 3 cubs, T-120(M)",
      "Zone 4: T-84(F) with 3 cubs, T-111(F), T-120(M), T-121(M), T-112(M)",
      "Zone 5: T-120(M), T-121(M), T-125(F) with 2 cubs, T-2311(M), T-112(M)"
    ],
    detailedInfo: {
      bestTime: "November to March, Early mornings (6:00-9:00 AM)",
      difficulty: "Moderate - Accessible by safari vehicle only",
      duration: "3-4 hours per safari",
      wildlife: [
        "Royal Bengal Tigers",
        "Leopards",
        "Sloth Bears",
        "Sambar Deer",
        "Indian Flying Fox"
      ],
      photography: "Excellent opportunities with natural light filtering through canopies. Zone 3 offers spectacular water reflection shots.",
      tips: [
        "Book at least 90 days in advance for these premium zones",
        "Morning safaris have 30% higher tiger sighting probability",
        "Bring a telephoto lens (200-600mm) for wildlife photography",
        "Zone 3 gets particularly busy - reserve early"
      ]
    }
  },
  buffer: {
    id: "buffer",
    name: "Zones (6-10)",
    description: "Less crowded but equally fascinating, these zones offer a more rustic experience. Zone 6 (Kundal) is known for its open meadows and exceptional birding opportunities.",
    image: "./Images/zone/5.jpg",
    highlights: [
      "Zone 6: T-39(F), T-108(M), T-127(F), T-101(M)",
      "Zone 7: T-108(M), T-127(F), T-8(F)",
      "Zone 8: T-2309(M), T-129(M), T-2310(F)",
      "Zone 9: T-108 (M), T-127(F)",
      "Zone 10: T-108(M), T-99(F), T-08(F), T-129(M),"
    ],
    detailedInfo: {
      bestTime: "Year-round, especially good during monsoon (July-September)",
      difficulty: "Easy to Moderate",
      duration: "2-3 hours per safari",
      wildlife: [
        "Nilgai (Blue Bull)",
        "Jackals",
        "Jungle Cats",
        "Indian Gazelle",
        "Over 270 bird species"
      ],
      photography: "Wide open landscapes provide fantastic panoramic shots. Golden hour lighting creates dramatic scenery.",
      tips: [
        "These zones are ideal for serious birdwatchers",
        "Easier to book last-minute compared to core zones",
        "Zone 10 offers the most peaceful experience with fewer vehicles",
        "Bring binoculars for distant wildlife observation"
      ]
    }
  },
  heritage: {
    id: "heritage",
    name: "Heritage Sites",
    description: "Discover the magnificent Ranthambore Fort, Jogi Mahal, and ancient temples within the park. These ruins tell tales of Rajput valor and the region's rich history.",
    image: "./Images/About/2.HEIC",
    highlights: [
      "Ranthambore Fort: 10th century UNESCO site",
      "Jogi Mahal: Ancient lakeside palace",
      "Ganesh Temple: Active pilgrimage spot",
      "Trinetra Ganesh Temple: One of the oldest Ganesh temples",
      "Ancient Step Wells: Historical water conservation systems"
    ],
    detailedInfo: {
      bestTime: "October to April, Early mornings for photography",
      difficulty: "Moderate - Involves walking and climbing",
      duration: "4-5 hours for complete exploration",
      wildlife: [
        "Langur Monkeys",
        "Peacocks",
        "Bats in the fort structures",
        "Occasional predator sightings near water bodies"
      ],
      photography: "Architectural photography paradise with stone textures and historical elements. Dawn light creates magical ambiance.",
      tips: [
        "Wear comfortable walking shoes for exploring the fort",
        "Carry water and sun protection",
        "Combine with Zone 3 safari for a complete day experience",
        "Respect religious sites and local customs"
      ]
    }
  }
};

// Separate subcomponents for better organization
const ZoneHighlight: React.FC<{ text: string; index: number }> = ({ text, index }) => (
  <li 
    className="flex items-start opacity-0 animate-fadeInUp"
    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
  >
    <span className="text-orange-600 mr-2 text-lg">🐅</span>
    <span className="text-gray-700 hover:text-orange-800 transition-colors duration-300">{text}</span>
  </li>
);

const DetailInfoCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
  delay?: number;
}> = ({ icon, title, children, delay = 0 }) => (
  <div 
    className="bg-[var(--color-surface)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[var(--color-text-secondary)] opacity-0 animate-fadeInUp"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <div className="relative">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center">
        <div className="p-2 rounded-lg bg-[var(--color-background)] mr-3">
          {icon}
        </div>
        <span>{title}</span>
      </h3>
    </div>
    {children}
  </div>
);

const WildlifeTag: React.FC<{ name: string; index: number }> = ({ name, index }) => (
  <span 
    className="bg-gradient-to-r from-orange-50 to-amber-50 text-orange-800 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 hover:border-orange-300 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md opacity-0 animate-fadeInUp cursor-default"
    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
  >
    {name}
  </span>
);

const ZoneDetailModal: React.FC<{
  zone: ZoneData;
  onClose: () => void;
}> = ({ zone, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-opacity-80 backdrop-blur-sm' : 'bg-opacity-0'
      }`} 
      onClick={handleClose}
    >
      <div 
        className={`relative bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative overflow-hidden">
          <img 
            src={zone.image} 
            alt={zone.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 group"
            aria-label="Close details"
          >
            <X size={24} className="text-gray-800 group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          {/* Sparkle effect */}
          <div className="absolute top-6 left-6">
            <Sparkles className="text-white/80 animate-pulse" size={28} />
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-800 to-amber-700 bg-clip-text text-transparent mb-3">
              {zone.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg leading-relaxed">{zone.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DetailInfoCard 
              icon={<Clock className="text-orange-700" size={20} />} 
              title="Best Time to Visit"
              delay={100}
            >
              <p className="text-gray-700 leading-relaxed">{zone.detailedInfo.bestTime}</p>
            </DetailInfoCard>
            
            <DetailInfoCard 
              icon={<Calendar className="text-orange-700" size={20} />} 
              title="Duration & Difficulty"
              delay={200}
            >
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-orange-800">Duration:</span> {zone.detailedInfo.duration}<br />
                <span className="font-semibold text-orange-800">Difficulty:</span> {zone.detailedInfo.difficulty}
              </p>
            </DetailInfoCard>
          </div>
          
          <DetailInfoCard 
            icon={<Award className="text-orange-700" size={20} />} 
            title="Wildlife Highlights"
            delay={300}
          >
            <div className="flex flex-wrap gap-3">
              {zone.detailedInfo.wildlife.map((animal, index) => (
                <WildlifeTag key={index} name={animal} index={index} />
              ))}
            </div>
          </DetailInfoCard>
          
          <div className="mt-8">
            <DetailInfoCard 
              icon={<Camera className="text-orange-700" size={20} />} 
              title="Photography"
              delay={400}
            >
              <p className="text-gray-700 leading-relaxed">{zone.detailedInfo.photography}</p>
            </DetailInfoCard>
          </div>
          
          <div className="mt-8">
            <DetailInfoCard 
              icon={<AlertTriangle className="text-orange-700" size={20} />} 
              title="Essential Tips"
              delay={500}
            >
              <ul className="space-y-3">
                {zone.detailedInfo.tips.map((tip, index) => (
                  <ZoneHighlight key={index} text={tip} index={index} />
                ))}
              </ul>
            </DetailInfoCard>
          </div>
          
          <div className="mt-10 flex justify-between items-center">
            <button 
              onClick={handleClose}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transform hover:scale-105"
            >
              Close
            </button>
            
            <a 
              href="#booking" 
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105"
              onClick={handleClose}
            >
              Book Safari
              <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Zones: React.FC = () => {
  const [activeZone, setActiveZone] = useState<ZoneId>("core");
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExploreClick = useCallback(() => {
    setShowDetailedView(true);
  }, []);

  const closeDetailedView = useCallback(() => {
    setShowDetailedView(false);
  }, []);

  const currentZone = ZONE_DATA[activeZone];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
      
      <section id="zones" className="py-20 bg-[var(--color-background)] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="inline-block relative">            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] inline-block border-b-4 border-[var(--color-accent)] pb-2 heading-serif">
              Explore Park Zones
            </h2>
            <div className="absolute -top-4 -right-8">
              <Eye className="text-[var(--color-accent)] animate-pulse" size={24} />
            </div>
            </div>
            <p className="mt-6 text-[var(--color-text-secondary)] max-w-3xl mx-auto text-lg body-sans">
              Ranthambore is divided into 10 zones, each offering unique wildlife experiences and landscapes. 
              From open grasslands to dense forests and serene lakes, every zone has its own charm.
            </p>
          </div>

          {/* Zone Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-16">
            {Object.keys(ZONE_DATA).map((zoneKey, index) => {
              const zone = ZONE_DATA[zoneKey as ZoneId];
              return (
                <button
                  key={zone.id}
                  className={`relative px-8 py-4 rounded-2xl font-bold mx-2 mb-2 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transform hover:scale-105 opacity-0 animate-fadeInUp shadow-lg hover:shadow-xl border-2 border-black ${
                    activeZone === zone.id 
                      ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xl scale-105' 
                      : 'bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                  }`}
                  style={{ animationDelay: `${600 + index * 200}ms`, animationFillMode: 'forwards' }}
                  onClick={() => setActiveZone(zone.id as ZoneId)}
                  aria-pressed={activeZone === zone.id}
                  aria-label={`View ${zone.name}`}
                >
                  <span className="relative z-10">{zone.name}</span>
                </button>
              );
            })}
          </div>

          {/* Zone Content */}
          <div className="grid gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-all duration-500">
              <div className="md:flex">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img 
                    src={currentZone.image} 
                    alt={currentZone.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
                </div>
                <div className="md:w-1/2 p-8 relative">
                  <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center">
                    <Map className="mr-3 text-[var(--color-accent)]" size={28} />
                    {currentZone.name}
                  </h3>
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">{currentZone.description}</p>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl mb-8 border border-orange-100 shadow-inner">
                    <h4 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                      <div className="p-2 bg-white rounded-lg shadow-sm mr-3">
                        <Map className="text-orange-600" size={20} />
                      </div>
                      Zone Tiger Highlights
                    </h4>
                    <ul className="space-y-3 text-orange-800">
                      {currentZone.highlights.map((highlight, index) => (
                        <ZoneHighlight key={index} text={highlight} index={index} />
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={handleExploreClick}
                      className="group inline-flex items-center px-8 py-4 bg-[var(--color-surface)] text-[var(--color-text-primary)] font-bold rounded-2xl hover:bg-[var(--color-background)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-black"
                      aria-label={`Explore ${currentZone.name} in detail`}
                    >
                      <Sparkles className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
                      Explore {currentZone.name}
                      <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>            </div>
          </div>
          </div>
        </div>

        {/* Detailed View Modal - Only render when needed */}
        {showDetailedView && (
          <ZoneDetailModal
            zone={currentZone}
            onClose={closeDetailedView}
          />
        )}
      </section>
    </>
  );
};

export default Zones;