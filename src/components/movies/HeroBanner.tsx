import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../../types';
import Button from '../common/Button';

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {
  // Format title and release date
  const title = movie.title || movie.name || 'Unknown';
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  
  // Truncate overview if too long
  const overview = movie.overview?.length > 200 
    ? `${movie.overview.substring(0, 200)}...` 
    : movie.overview;
  
  // Determine media type for routing
  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
  
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black to-transparent"></div>
      </div>
      
      {/* Content Container */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8 md:max-w-3xl">
          <div className="animate-fade-in">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {title}
            </h1>
            
            {/* Metadata */}
            <div className="flex items-center text-netflix-lightGray mb-4">
              {year && <span className="mr-3">{year}</span>}
              <span className="border border-netflix-lightGray px-1 mr-3 text-xs">
                {mediaType === 'movie' ? 'MOVIE' : 'SERIES'}
              </span>
              <span className="text-green-500 font-medium">{Math.round((movie.vote_average / 10) * 100)}% Match</span>
            </div>
            
            {/* Overview */}
            <p className="text-white text-lg md:text-xl mb-6 max-w-2xl drop-shadow">
              {overview || 'No description available.'}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                <span>Play</span>
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Info className="h-5 w-5" />
                <span>More Info</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;