import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
  safariType: string;
  guests: string;
  message: string;
}

const BookingSafari: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    date: '',
    time: '',
    safariType: '',
    guests: '1',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          date: '',
          time: '',
          safariType: '',
          guests: '1',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <style>
        {`
          .custom-form {
            --input-focus: #2d8cf0;
            --font-color: #323232;
            --font-color-sub: #666;
            --bg-color: beige;
            --main-color: black;
            padding: 30px;
            background: lightblue;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 20px;
            border-radius: 5px;
            border: 2px solid var(--main-color);
            box-shadow: 4px 4px var(--main-color);
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }

          .form-title {
            color: var(--font-color);
            font-weight: 900;
            font-size: 24px;
            margin-bottom: 25px;
            text-align: center;
            width: 100%;
          }

          .form-title span {
            color: var(--font-color-sub);
            font-weight: 600;
            font-size: 18px;
          }

          .form-input {
            width: 100%;
            height: 45px;
            border-radius: 5px;
            border: 2px solid var(--main-color);
            background-color: var(--bg-color);
            box-shadow: 4px 4px var(--main-color);
            font-size: 15px;
            font-weight: 600;
            color: var(--font-color);
            padding: 5px 15px;
            outline: none;
            transition: all 0.3s ease;
          }

          .form-input::placeholder {
            color: var(--font-color-sub);
            opacity: 0.8;
          }

          .form-input:focus {
            border: 2px solid var(--input-focus);
            transform: translateY(-2px);
            box-shadow: 6px 6px var(--main-color);
          }

          .form-textarea {
            width: 100%;
            min-height: 100px;
            border-radius: 5px;
            border: 2px solid var(--main-color);
            background-color: var(--bg-color);
            box-shadow: 4px 4px var(--main-color);
            font-size: 15px;
            font-weight: 600;
            color: var(--font-color);
            padding: 10px 15px;
            outline: none;
            resize: vertical;
            font-family: inherit;
            transition: all 0.3s ease;
          }

          .form-textarea:focus {
            border: 2px solid var(--input-focus);
            transform: translateY(-2px);
            box-shadow: 6px 6px var(--main-color);
          }

          .form-label {
            color: var(--font-color);
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 8px;
            display: block;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            width: 100%;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .form-button {
            margin: 30px auto 0 auto;
            width: 150px;
            height: 50px;
            border-radius: 5px;
            border: 2px solid var(--main-color);
            background-color: var(--bg-color);
            box-shadow: 4px 4px var(--main-color);
            font-size: 17px;
            font-weight: 600;
            color: var(--font-color);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .form-button:hover {
            transform: translateY(-2px);
            box-shadow: 6px 6px var(--main-color);
          }

          .form-button:active {
            box-shadow: 0px 0px var(--main-color);
            transform: translate(3px, 3px);
          }

          .form-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .success-message {
            text-align: center;
            padding: 40px;
            color: var(--font-color);
          }

          .success-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            background: var(--bg-color);
            border: 2px solid var(--main-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 4px 4px var(--main-color);
          }

          .info-card {
            --info-bg: #f0f8ff;
            --info-border: #2d8cf0;
            background: var(--info-bg);
            border: 2px solid var(--info-border);
            box-shadow: 4px 4px var(--info-border);
            border-radius: 5px;
            padding: 25px;
            margin-top: 30px;
          }

          .info-title {
            color: var(--info-border);
            font-weight: 900;
            font-size: 20px;
            margin-bottom: 15px;
          }

          .info-list {
            list-style: none;
            padding: 0;
            color: #333;
          }

          .info-list li {
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
            font-weight: 500;
          }

          .info-list li:before {
            content: "•";
            color: var(--info-border);
            font-weight: bold;
            position: absolute;
            left: 0;
          }

          @media (max-width: 768px) {
            .form-row {
              grid-template-columns: 1fr;
            }
            
            .custom-form {
              padding: 20px;
            }
          }
        `}
      </style>

      <section id="booking" className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] inline-block border-b-4 border-[var(--color-secondary)] pb-2">
              Book Your Safari
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-3xl mx-auto body-sans">
              Reserve your spot for an unforgettable wildlife adventure in Ranthambore National Park.
              Early booking is recommended, especially during peak season.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="custom-form">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="form-title">Booking Requested!</h3>
                  <p style={{color: 'var(--font-color-sub)', fontSize: '16px'}}>
                    Thank you for your interest in Ranthambore National Park.
                    We'll contact you shortly to confirm your safari reservation.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="form-title">
                    Safari Booking <span>Reserve Your Adventure</span>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date" className="form-label">Safari Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="time" className="form-label">Safari Time</label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="morning">Morning (6:30 AM - 10:00 AM)</option>
                        <option value="evening">Evening (2:30 PM - 6:00 PM)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="safariType" className="form-label">Safari Type</label>
                      <select
                        id="safariType"
                        name="safariType"
                        value={formData.safariType}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="">Select Safari Type</option>
                        <option value="gypsy">Gypsy Safari (6-Seater)</option>
                        <option value="canter">Canter Safari (20-Seater)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="guests" className="form-label">Number of Guests</label>
                      <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        min="1"
                        max="20"
                        className="form-input"
                        placeholder="Enter number of guests"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Special Requests</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder="Any special requests or additional information..."
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="form-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Book Now'}
                  </button>
                </div>
              )}
            </div>
            
            {/* <div className="info-card">
              <h3 className="info-title">Important Booking Information</h3>
              <ul className="info-list">
                <li>Bookings should be made at least 90 days in advance for the best chances of securing your preferred slot.</li>
                <li>A valid government-issued photo ID is required for all visitors entering the park.</li>
                <li>Children below 5 years of age are not recommended for safaris.</li>
                <li>Park entry fees are not included in the booking and must be paid separately at the park entrance.</li>
                <li>Cancellations made less than 48 hours before the scheduled safari are non-refundable.</li>
              </ul>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingSafari;