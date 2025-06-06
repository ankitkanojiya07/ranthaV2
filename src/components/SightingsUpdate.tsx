import React, { useState, useEffect } from 'react';

const SightingsUpdate: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const timingsByMonth = [
    {
      period: "October 1st – October 31st",
      morning: "6:30 AM – 10:00 AM",
      afternoon: "2:30 PM – 6:00 PM"
    },
    {
      period: "November 1st – January 31st",
      morning: "7:00 AM – 10:30 AM",
      afternoon: "2:00 PM – 5:30 PM"
    },
    {
      period: "February 1st – March 31st",
      morning: "6:30 AM – 10:00 AM",
      afternoon: "2:30 PM – 6:00 PM"
    },
    {
      period: "April 1st – May 15th",
      morning: "6:00 AM – 9:30 AM",
      afternoon: "3:00 PM – 6:30 PM"
    },
    {
      period: "May 16th – June 30th",
      morning: "6:00 AM – 9:30 AM",
      afternoon: "3:30 PM – 7:00 PM"
    }
  ];

  return (
    <>
      <style>
        {`
          .custom-card {
            --font-color: #323232;
            --font-color-sub: #666;
            --bg-color: #fff;
            --main-color: #323232;
            --main-focus: #2d8cf0;
            background: var(--bg-color);
            border: 2px solid var(--main-color);
            box-shadow: 4px 4px var(--main-color);
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 20px;
            gap: 10px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            transition: all 0.3s;
            min-height: 400px;
          }

          .custom-card:hover {
            transform: translateY(-3px);
            box-shadow: 6px 6px var(--main-color);
          }

          .card-title {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            color: var(--font-color);
            margin-bottom: 15px;
          }

          .card-subtitle {
            font-size: 14px;
            font-weight: 400;
            color: var(--font-color-sub);
          }

          .card-divider {
            width: 100%;
            border: 1px solid var(--main-color);
            border-radius: 50px;
            margin: 10px 0;
          }

          .zone-number {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: #f0f0f0;
            color: var(--font-color);
            text-align: center;
            line-height: 24px;
            border-radius: 50%;
            font-size: 12px;
            font-weight: 600;
            margin: 2px;
            border: 1px solid var(--main-color);
          }

          .info-section {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 4px;
            border-left: 3px solid var(--main-color);
            margin: 8px 0;
          }

          .timing-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          .timing-table th {
            background: #f0f0f0;
            padding: 8px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            color: var(--font-color);
            border-bottom: 2px solid var(--main-color);
          }

          .timing-table td {
            padding: 8px;
            font-size: 11px;
            color: var(--font-color-sub);
            border-bottom: 1px solid #e0e0e0;
          }

          .timing-table tr:hover {
            background: #f8f9fa;
          }
        `}
      </style>

      <section id="sightings" className="py-20 bg-[var(--color-surface)] relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="absolute w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          >
            <source src="./Images/Hero/v1.MP4" type="video/mp4" />
          </video>
        </div>        {/* Animated background elements with reduced opacity */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-[var(--color-accent)]/30 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[var(--color-accent)]/30 animate-ping" style={{animationDuration: '4s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="heading-serif text-3xl md:text-4xl font-bold text-amber-800 inline-block border-b-4 border-amber-400 pb-2 relative">
              Zone Timings & Updates
              <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-amber-400 to-amber-300 animate-pulse transition-all duration-2000"
                   style={{width: isVisible ? '100%' : '0%'}}></div>
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-3xl mx-auto body-sans transform transition-all duration-1000 delay-300">
              Stay informed about zone availability and timings throughout the year at Ranthambore National Park.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Zone Information Card */}
            <div className={`custom-card transition-all duration-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                 style={{transitionDelay: '400ms'}}>
              <h3 className="card-title">Zone Availability</h3>
              
              <div className="card-divider"></div>
              
              <div>
                <p className="card-subtitle mb-3">
                  <span style={{fontWeight: 600}}>Zones Available:</span>
                </p>
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {[1,2,3,4,5,6,7,8,9,10].map((zone) => (
                    <span key={zone} className="zone-number">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-section">
                <p style={{fontWeight: 600, color: 'var(--font-color)', fontSize: '14px', marginBottom: '8px'}}>
                  Weekly Closure Schedule:
                </p>
                <ul style={{listStyle: 'disc', paddingLeft: '20px', fontSize: '13px', color: 'var(--font-color-sub)'}}>
                  <li>Zones 1/2/3/4/5 are Closed on Every Wednesday</li>
                  <li>Zones 6/7/8/9/10 are Closed on Every Tuesday</li>
                </ul>
              </div>

              <div className="info-section">
                <p style={{fontWeight: 600, color: 'var(--font-color)', fontSize: '14px', marginBottom: '8px'}}>
                  Monsoon Season Notice:
                </p>
                <p style={{fontSize: '13px', color: 'var(--font-color-sub)'}}>
                  During Monsoon (July, August & September) season only zones 6 to 10 are Open.
                </p>
              </div>
            </div>

            {/* Safari Timings Card */}
            <div className={`custom-card transition-all duration-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                 style={{transitionDelay: '600ms'}}>
              <h3 className="card-title">Safari Timings by Season</h3>
              
              <div className="card-divider"></div>
              
              <div style={{overflowX: 'auto'}}>
                <table className="timing-table">
                  <thead>
                    <tr>
                      <th>Months</th>
                      <th>Morning</th>
                      <th>Afternoon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timingsByMonth.map((timing, index) => (
                      <tr key={index}>
                        <td style={{fontWeight: 500, color: 'var(--font-color)'}}>{timing.period}</td>
                        <td>{timing.morning}</td>
                        <td>{timing.afternoon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SightingsUpdate;