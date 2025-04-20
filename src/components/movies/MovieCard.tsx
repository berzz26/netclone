import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Info } from 'lucide-react';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  isPoster?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isPoster = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if it's a movie or TV show for routing
  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
  
  // Format title and release date
  const title = movie.title || movie.name || 'Unknown';
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  
  // Calculate rating percentage
  const rating = Math.round((movie.vote_average / 10) * 100);
  
  // Image URL
  const imageUrl = isPoster 
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    
  const fallbackUrl = isPoster
    ? `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div 
      className={`relative group ${isPoster ? 'w-full aspect-[2/3]' : 'w-full aspect-video'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/${mediaType}/${movie.id}`}>
        <div className={`
          relative overflow-hidden rounded-md
          ${isPoster ? 'h-full' : 'h-full'}
          transition-transform duration-300
          ${isHovered ? 'transform scale-105 shadow-lg z-10' : ''}
        `}>
          {/* Movie Image */}
          <img 
            src={imageUrl || fallbackUrl} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackUrl) {
                target.src = fallbackUrl;
              } else {
                target.src = 'https://via.placeholder.com/500x281?text=No+Image';
              }
            }}
          />
          
          {/* Overlay */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black to-transparent
            flex flex-col justify-end p-3
            ${isPoster ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            transition-opacity duration-300
          `}>
            <h3 className="text-white font-medium truncate">{title}</h3>
            {year && <p className="text-gray-300 text-sm">{year}</p>}
          </div>
          
          {/* Hover Details (only for landscape/backdrop view) */}
          {!isPoster && isHovered && (
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-75 animate-fade-in">
              <div>
                <h3 className="text-white font-medium truncate">{title}</h3>
                {year && <p className="text-gray-300 text-sm">{year}</p>}
              </div>
              
              <div>
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="text-green-500 font-medium mr-2">{rating}% Match</div>
                  {year && <div className="text-gray-400 text-sm">{year}</div>}
                </div>
                
                {/* Overview Preview */}
                <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                  {movie.overview || 'No description available.'}
                </p>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="p-1.5 bg-white rounded-full text-black hover:bg-gray-300">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 bg-gray-800 rounded-full text-white hover:bg-gray-700 border border-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 bg-gray-800 rounded-full text-white hover:bg-gray-700 border border-gray-600">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 bg-gray-800 rounded-full text-white hover:bg-gray-700 border border-gray-600 ml-auto">
                    <Info className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;