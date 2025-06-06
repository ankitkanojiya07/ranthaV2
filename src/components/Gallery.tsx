import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
  category: string;
  photographer?: string;
  dateTaken?: string;
}

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTigerIndex, setActiveTigerIndex] = useState(0);

  // Categories with improved organization
  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'tigers', name: 'Tigers' },
    { id: 'landscape', name: 'Landscapes' },
    { id: 'birds', name: 'Birds' },
    { id: 'heritage', name: 'Heritage Sites' }
  ];

  // Enhanced image data with additional metadata
  const images: GalleryImage[] = [
    {
      id: '1',
      src: './Images/Gallery/1.jpg',
      title: 'Tiger by the Lake',
      description: 'A majestic tiger cooling off near the water edge in Ranthambore National Park.',
      category: 'tigers',
      photographer: 'Aditya Singh',
      dateTaken: 'March 2024'
    },
    {
      id: '2',
      src: './Images/Gallery/2.JPG',
      title: 'Sunrise at Padam Talao',
      description: 'Golden hour at one of Ranthambore\'s most iconic lakes, showcasing the vibrant colors of dawn.',
      category: 'landscape',
      photographer: 'Ravi Prakash',
      dateTaken: 'January 2024'
    },
    {
      id: '3',
      src: './Images/Gallery/3.jpg',
      title: 'Peacock in Full Display',
      description: 'A male peacock showing off his colorful plumage during mating season in the grasslands.',
      category: 'birds',
      photographer: 'Meera Subramaniam',
      dateTaken: 'April 2024'
    },
    {
      id: '4',
      src: './Images/Gallery/4.jpg',
      title: 'Ranthambore Fort',
      description: 'The ancient 10th century Ranthambore Fort standing tall amidst the forest, a UNESCO World Heritage site.',
      category: 'heritage',
      photographer: 'Vikram Joshi',
      dateTaken: 'February 2024'
    },
    {
      id: '5',
      src: './Images/Gallery/5.jpg',
      title: 'Tiger on Patrol',
      description: 'A Royal Bengal tiger patrolling its territory in the early morning mist, showcasing the apex predator in its natural habitat.',
      category: 'tigers',
      photographer: 'Aditya Singh',
      dateTaken: 'May 2024'
    },
    {
      id: '6',
      src: './Images/Gallery/6.jpg',
      title: 'Kingfisher in Action',
      description: 'A White-throated Kingfisher perched perfectly, ready to dive for prey in one of Ranthambore\'s many water bodies.',
      category: 'birds',
      photographer: 'Sanjay Kumar',
      dateTaken: 'June 2024'
    },
    {
      id: '7',
      src: './Images/Gallery/7.jpg',
      title: 'Misty Morning',
      description: 'The forest comes alive as the morning mist begins to clear, revealing the diverse ecosystem of Ranthambore.',
      category: 'landscape',
      photographer: 'Priya Sharma',
      dateTaken: 'March 2024'
    },
    {
      id: '8',
      src: './Images/Gallery/8.jpg',
      title: 'Ancient Temple',
      description: 'One of the many ancient temples within the Ranthambore Fort complex, showcasing intricate architectural details from the 10th century.',
      category: 'heritage',
      photographer: 'Rajesh Mishra',
      dateTaken: 'April 2024'
    },
    {
      id: '9',
      src: './Images/Gallery/9.jpg',
      title: 'Tiger Cubs at Play',
      description: 'Rare capture of tiger cubs playing near their den in Zone 3 of Ranthambore National Park.',
      category: 'tigers',
      photographer: 'Divya Patel',
      dateTaken: 'July 2024'
    },
    {
      id: '10',
      src: './Images/Gallery/10.jpg',
      title: 'Jogi Mahal',
      description: 'The historic Jogi Mahal hunting lodge at the base of the fort, surrounded by lush monsoon vegetation.',
      category: 'heritage',
      photographer: 'Karan Desai',
      dateTaken: 'August 2024'
    },
    {
      id: '11',
      src: './Images/Gallery/11.jpg',
      title: 'Spotted Owlet',
      description: 'A pair of spotted owlets roosting in the hollow of an ancient banyan tree.',
      category: 'birds',
      photographer: 'Nisha Singh',
      dateTaken: 'February 2024'
    },
    {
      id: '12',
      src: './Images/Gallery/12.jpg',
      title: 'Monsoon Waterfall',
      description: 'Seasonal waterfall cascading down the cliffs near Ranthambore Fort during peak monsoon season.',
      category: 'landscape',
      photographer: 'Anand Verma',
      dateTaken: 'September 2024'
    }
  ];

  // Tiger data with varied gallery images
  const tigers = [
    {
      name: 'Machli (T-16)',
      subtitle: 'The Queen Mother of Ranthambore',
      image: './Images/Gallery/1.jpg', // Tiger by the Lake
      description: 'Machli was one of the most famous tigresses in the world, known for her fishing abilities and territorial nature.'
    },
    {
      name: 'Arrowhead (T-84)',
      subtitle: 'The Territorial Warrior',
      image: './Images/Gallery/5.jpg', // Tiger on Patrol
      description: 'A dominant male tiger known for his distinctive arrowhead marking and fierce territorial behavior.'
    },
    {
      name: 'Krishna (T-19)',
      subtitle: 'The Gentle Giant',
      image: './Images/Gallery/9.jpg', // Tiger Cubs at Play
      description: 'A gentle male tiger known for his calm demeanor and excellent parenting skills with cubs.'
    },
    {
      name: 'Sultan (T-72)',
      subtitle: 'The Lake Master',
      image: './Images/Gallery/2.JPG', // Use landscape image for variety
      description: 'Sultan controlled the prime territory around the lakes and was known for his impressive hunting skills.'
    },
    {
      name: 'Noor (T-39)',
      subtitle: 'The Fierce Protector',
      image: './Images/Gallery/7.jpg', // Misty Morning
      description: 'A protective mother tigress known for her fierce defense of her cubs and territory.'
    },
    {
      name: 'Riddhi (T-124)',
      subtitle: 'The Rising Star',
      image: './Images/Gallery/4.jpg', // Ranthambore Fort
      description: 'One of the younger generation tigers showing great promise and territorial expansion.'
    },
    {
      name: 'Fateh (T-123)',
      subtitle: 'The Bold Explorer',
      image: './Images/Gallery/12.jpg', // Monsoon Waterfall
      description: 'A bold young tiger known for exploring new territories and adapting to changing environments.'
    }
  ];

  // Filter images based on active category
  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(image => image.category === activeCategory);

  // Lightbox controls with keyboard navigation
  const openLightbox = useCallback((index: number) => {
    setActiveImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [filteredImages.length]);

  // Tiger navigation
  const goToPreviousTiger = () => {
    setActiveTigerIndex((prev) => (prev - 1 + tigers.length) % tigers.length);
  };

  const goToNextTiger = () => {
    setActiveTigerIndex((prev) => (prev + 1) % tigers.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToPrevious, goToNext, closeLightbox]);

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Current active image for lightbox
  const activeImage = filteredImages[activeImageIndex];
  const activeTiger = tigers[activeTigerIndex];

  return (
    <section id="gallery" className="py-24 bg-[#F8F5F0] font-serif">
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100px) translateY(-50%) rotate(-15deg);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(-50%) rotate(2deg);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes rotate {
          from {
            transform: translateX(-50%) translateY(-50%) rotate(-5deg) scale(0.9);
          }
          to {
            transform: translateX(-50%) translateY(-50%) rotate(2deg) scale(1);
          }
        }
      `}</style>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with improved typography */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3C3228] mb-4">
            Ranthambore Gallery
          </h2>
          <div className="h-1 w-24 bg-[#C4B6A6] mx-auto mb-6"></div>
          <p className="mt-4 text-[#5C5248] max-w-3xl mx-auto text-lg">
            Discover the breathtaking beauty of Ranthambore National Park through our curated collection of 
            premium wildlife and landscape photography captured by renowned professionals.
          </p>
        </div>

        {/* Category Filter with refined design */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                aria-label={`Filter by ${category.name}`}
                className={`px-6 py-3 rounded-md text-base font-medium transition-all duration-300 shadow-sm ${
                  activeCategory === category.id
                    ? 'bg-[#997B66] text-white ring-2 ring-offset-2 ring-[#997B66]'
                    : 'bg-white text-[#3C3228] hover:bg-[#E5DED3] hover:text-[#3C3228]'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#997B66]"></div>
          </div>
        ) : (
          <>
            {/* Gallery Grid with masonry-like layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl"
                >
                  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                    <img 
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-[#E5DED3] text-sm font-medium mb-1">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
                      <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Camera size={14} className="mr-1" />
                        <span>{image.photographer}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="absolute top-0 right-0 m-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    onClick={() => openLightbox(index)}
                    aria-label="View larger image"
                  >
                    <svg className="w-5 h-5 text-[#997B66]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Empty state when no images match the filter */}
            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F2EDE4] mb-4">
                  <Camera size={32} className="text-[#997B66]" />
                </div>
                <h3 className="text-xl font-medium text-[#3C3228]">No images found</h3>
                <p className="mt-2 text-[#5C5248]">There are no images in this category yet.</p>
              </div>
            )}
          </>
        )}

        {/* Know about Ranthambore Tigers Section */}
        <div className="mt-24 pt-16 border-t border-[#E5DED3]">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#3C3228] mb-4">
              Know about Ranthambore Tigers
            </h3>
            <div className="h-1 w-24 bg-[#C4B6A6] mx-auto mb-6"></div>
            <p className="text-[#5C5248] max-w-3xl mx-auto text-lg">
              Discover the majestic tigers of Ranthambore National Park, each with their own unique story and territory.
            </p>
          </div>

          {/* Tiger Card Display */}
          <div className="max-w-4xl mx-auto">
            <div className="">
              {/* Counter */}
              <div className="text-center mb-6">
                <span className="text-Black-900 text-lg">
                  {activeTigerIndex + 1} / {tigers.length}
                </span>
              </div>

              {/* Main Content */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Polaroid Style Image Stack */}
                <div className="order-2 md:order-1 relative h-80 flex items-center justify-center">
                  {/* Background scattered photos */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-80">
                      {/* Photo 1 - Rotated left */}
                      <div className="absolute top-2 left-2 w-48 h-64 bg-white p-2 shadow-xl transform -rotate-12 transition-all duration-700">
                        <img 
                          src="./Images/Gallery/3.jpg" 
                          alt="Background"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      
                      {/* Photo 2 - Rotated right */}
                      <div className="absolute top-4 right-2 w-48 h-64 bg-white p-2 shadow-xl transform rotate-6 transition-all duration-700">
                        <img 
                          src="./Images/Gallery/6.jpg" 
                          alt="Background"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      
                      {/* Main Tiger Photo - Slightly rotated */}
                      <div 
                        key={activeTigerIndex}
                        className="absolute top-6 left-1/2 transform -translate-x-1/2 w-52 h-68 bg-white p-3 shadow-2xl rotate-2 transition-all duration-1000 hover:rotate-0 hover:scale-105 hover:z-20"
                        style={{
                          animation: `slideIn 0.8s ease-out, rotate 0.8s ease-out`,
                        }}
                      >
                        <img 
                          src={activeTiger.image}
                          alt={activeTiger.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="text-center mt-2">
                          <p className="text-gray-800 font-bold text-sm">{activeTiger.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Content with slide animation */}
                <div 
                  key={`text-${activeTigerIndex}`}
                  className="order-1 md:order-2"
                  style={{
                    animation: `fadeInUp 0.8s ease-out 0.2s both`,
                  }}
                >
                  <h4 className="text-3xl font-bold text-[#F8F5F0] mb-2">
                    {activeTiger.name}
                  </h4>
                  <p className="text-black-500 text-lg italic mb-4">
                    {activeTiger.subtitle}
                  </p>
                  <p className="text-red-800 leading-relaxed">
                    {activeTiger.description}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center gap-4 mt-8">
                <button 
                  className="w-12 h-12 rounded-full bg-[#C4B6A6]/20 hover:bg-[#C4B6A6]/30 transition-colors duration-300 flex items-center justify-center text-[#C4B6A6] hover:scale-110"
                  onClick={goToPreviousTiger}
                  aria-label="Previous tiger"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="w-12 h-12 rounded-full bg-[#C4B6A6]/20 hover:bg-[#C4B6A6]/30 transition-colors duration-300 flex items-center justify-center text-[#C4B6A6] hover:scale-110"
                  onClick={goToNextTiger}
                  aria-label="Next tiger"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#C4B6A6] transition-all duration-500"
                    style={{ width: `${((activeTigerIndex + 1) / tigers.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox with navigation */}
      {isLightboxOpen && activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-center p-4">
          <div 
            className="absolute inset-0 z-0"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          ></div>
          
          <div className="relative z-10 max-w-6xl w-full mx-auto bg-[#F9F6F1] rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Image Container */}
            <div className="w-full md:w-2/3 bg-black relative">
              <div className="relative h-[50vh] md:h-[80vh] flex items-center justify-center">
                <img 
                  src={activeImage.src} 
                  alt={activeImage.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Navigation Buttons */}
              <button 
                className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-[#F9F6F1]/70 hover:bg-[#F9F6F1] transition-colors duration-300 shadow-md"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-[#3D3026]" />
              </button>
              
              <button 
                className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-[#F9F6F1]/70 hover:bg-[#F9F6F1] transition-colors duration-300 shadow-md"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-[#3D3026]" />
              </button>
            </div>
            
            {/* Details Panel */}
            <div className="w-full md:w-1/3 p-6 md:p-8 relative font-serif">
              <button 
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#E9E4DC] transition-colors duration-300"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6 text-[#3D3026]" />
              </button>
              
              <div className="mb-4">
                <p className="text-[#7D6E5B] uppercase tracking-wider text-sm font-medium">
                  {activeImage.category.charAt(0).toUpperCase() + activeImage.category.slice(1)}
                </p>
                <h3 className="text-2xl font-bold mt-1 text-[#3D3026]">{activeImage.title}</h3>
              </div>
              
              <p className="text-[#3D3026]/80 mb-6 leading-relaxed">{activeImage.description}</p>
              
              <div className="pt-6 border-t border-[#E9E4DC] space-y-3">
                <div className="flex items-start">
                  <div className="w-24 flex-shrink-0 text-[#7D6E5B] font-medium">Photographer</div>
                  <div className="text-[#3D3026]">{activeImage.photographer}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-24 flex-shrink-0 text-[#7D6E5B] font-medium">Date</div>
                  <div className="text-[#3D3026]">{activeImage.dateTaken}</div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#E9E4DC]">
                <div className="flex items-center gap-x-4">
                  <p className="text-[#7D6E5B] font-medium">Image {activeImageIndex + 1} of {filteredImages.length}</p>
                  <div className="flex-1 h-1 bg-[#E9E4DC] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#7D6E5B]" 
                      style={{ width: `${((activeImageIndex + 1) / filteredImages.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;