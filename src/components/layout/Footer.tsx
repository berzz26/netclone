import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-netflix-black py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          {/* Column 1 */}
          <div>
            <h4 className="text-netflix-lightGray font-medium mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Movies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">TV Shows</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New & Popular</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">My List</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-netflix-lightGray font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Preferences</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Information</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-netflix-lightGray font-medium mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Devices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Account</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Media Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Netflix Clone. This is a demo project created for educational purposes.</p>
          <p className="mt-2">
            Data provided by <a href="https://www.themoviedb.org/" className="text-netflix-red hover:underline">The Movie Database (TMDB)</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;