import React, { useEffect, useState, useRef } from 'react';

interface Media {
  type: 'image' | 'video';
  src: string;
}

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  const mediaItems: Media[] = [
    { type: 'image', src: './Images/Hero/8.jpg' },
    { type: 'image', src: './Images/Hero/1.png' },
    // Add your video here. For example:
    // { type: 'video', src: './Images/Hero/v1.MOV' },
    { type: 'image', src: './Images/Hero/10.jpg' },
    { type: 'image', src: './Images/Hero/7.jpg' },
    { type: 'image', src: './Images/Hero/9.jpg' },
  ];

  useEffect(() => {
    const entranceTimer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    const sliderInterval = setInterval(() => {
      if (!isPaused) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
          setIsTransitioning(false);
        }, 100);
      }
    }, 5000);

    const handleParallax = () => {
      if (sliderRef.current && heroRef.current) {
        const scrollPosition = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const scrollPercentage = Math.min(scrollPosition / heroHeight, 1);
        sliderRef.current.style.transform = `translateY(${scrollPosition * 0.2}px) rotate(${scrollPosition * 0.01}deg)`;
        if (heroRef.current) {
          heroRef.current.style.opacity = `${1 - scrollPercentage * 0.6}`;
        }
      }
    };

    window.addEventListener('scroll', handleParallax);
    
    return () => {
      clearTimeout(entranceTimer);
      clearInterval(sliderInterval);
      window.removeEventListener('scroll', handleParallax);
    };
  }, [isPaused, mediaItems.length]);

  useEffect(() => {
    // Preload images and video
    mediaItems.forEach((item) => {
      if (item.type === 'image') {
        const img = new Image();
        img.src = item.src;
      }
    });
  }, [mediaItems]);

  const getMediaTransition = (index: number) => {
    const isActive = currentIndex === index;
    const isPrevious = index === (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    const isNext = index === (currentIndex + 1) % mediaItems.length;
    
    if (isActive) {
      return isTransitioning 
        ? 'opacity-100 scale-110 rotate-1' 
        : 'opacity-100 scale-105 rotate-0';
    } else if (isPrevious) {
      return 'opacity-0 scale-95 -rotate-2 -translate-x-12 translate-y-4';
    } else if (isNext) {
      return 'opacity-0 scale-95 rotate-2 translate-x-12 -translate-y-4';
    } else {
      return 'opacity-0 scale-90';
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Welcome to Ranthambore National Park"
    >
      <div 
        ref={sliderRef}
        className="absolute inset-0 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getMediaTransition(index)}`}
          >
            {item.type === 'image' ? (
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${item.src}')`,
                  filter: currentIndex === index 
                    ? 'brightness(1) contrast(1.05) saturate(1.1)' 
                    : 'brightness(0.7) contrast(0.8) saturate(0.8)'
                }}
              />
            ) : (
              <video
                className="w-full h-full object-cover"
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  filter: currentIndex === index 
                    ? 'brightness(1) contrast(1.05) saturate(1.1)' 
                    : 'brightness(0.7) contrast(0.8) saturate(0.8)'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {mediaItems.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                currentIndex === index 
                  ? 'w-8 bg-white shadow-lg shadow-white/50' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 flex flex-col items-center">
        <div className={`max-w-5xl text-center transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}>
          {/* Content here */}
          <div className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {/* Additional content here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;