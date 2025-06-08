import React from 'react';
import { 
  PawPrint, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter,
  Linkedin
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#f5ebe0] text-[#3C3228] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-4">
              <PawPrint className="h-8 w-8 text-[#3C3228]" />
              <h3 className="text-xl font-bold ml-2 border-b-2 border-[#3C3228] pb-1 heading-serif">About Ranthambore</h3>
            </div>
            <p className="text-[#3C3228] mb-4 body-sans">
              Ranthambore National Park is a premier tiger reserve in Rajasthan, India. 
              With a rich blend of history, wildlife, and natural beauty, it offers an 
              unforgettable safari experience.
            </p>
            <p className="text-[#3C3228] body-sans">
              Once the private hunting grounds of Jaipur's Maharajas, Ranthambore now thrives 
              as a conservation success story under Project Tiger.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#3C3228] pb-1 heading-serif">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> About
                </a>
              </li>
              <li>
                <a href="#wildlife" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Wildlife
                </a>
              </li>
              <li>
                <a href="#zones" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Park Zones
                </a>
              </li>
              <li>
                <a href="#safari" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Safari Information
                </a>
              </li>
              <li>
                <a href="#booking" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Book Safari
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Photo Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#3C3228] pb-1 heading-serif">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Travel Guide
                </a>
              </li>
              <li>
                <a href="#conservation" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Conservation
                </a>
              </li>
              <li>
                <a href="#" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> FAQs
                </a>
              </li>
              <li>
                <a href="#tips" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Park Rules
                </a>
              </li>
              <li>
                <a href="#" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors flex items-center">
                  <span className="mr-2">•</span> Wildlife Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#3C3228] pb-1 heading-serif">Get In Touch</h3>
            <ul className="space-y-3 body-sans">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#3C3228] mr-2 mt-1 flex-shrink-0" />
                <span className="text-[#3C3228]">
                  Tourism Reception Centre<br />
                  Sawai Madhopur, Rajasthan<br />
                  India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#3C3228] mr-2 flex-shrink-0" />
                <span className="text-[#3C3228]">+91-XXXXXXXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#3C3228] mr-2 flex-shrink-0" />
                <a href="mailto:contact@ranthamborepark.in" className="text-[#3C3228] hover:text-[#3C3228]/80 transition-colors">
                  contact@ranthamborepark.in
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-[#3C3228] mr-2 mt-1 flex-shrink-0" />
                <span className="text-[#3C3228]">
                  <strong className="text-[#3C3228]">Office Hours:</strong><br />
                  Monday–Saturday: 9:00 AM–6:00 PM IST<br />
                  Sunday: 10:00 AM–4:00 PM IST
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-bold text-[#3C3228] mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-[#3C3228] p-2 rounded-full hover:bg-[#3C3228]/80 transition-colors">
                  <Instagram className="h-5 w-5 text-[#f5ebe0]" />
                </a>
                <a href="#" className="bg-[#3C3228] p-2 rounded-full hover:bg-[#3C3228]/80 transition-colors">
                  <Facebook className="h-5 w-5 text-[#f5ebe0]" />
                </a>
                <a href="#" className="bg-[#3C3228] p-2 rounded-full hover:bg-[#3C3228]/80 transition-colors">
                  <Youtube className="h-5 w-5 text-[#f5ebe0]" />
                </a>
                <a href="#" className="bg-[#3C3228] p-2 rounded-full hover:bg-[#3C3228]/80 transition-colors">
                  <Twitter className="h-5 w-5 text-[#f5ebe0]" />
                </a>
                <a href="#" className="bg-[#3C3228] p-2 rounded-full hover:bg-[#3C3228]/80 transition-colors">
                  <Linkedin className="h-5 w-5 text-[#f5ebe0]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#3C3228]/20 pt-8 text-center">
          <p className="text-[#3C3228] body-sans">
            &copy; {new Date().getFullYear()} Ranthambore National Park All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;