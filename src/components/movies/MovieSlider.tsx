import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../../types';
import MovieCard from './MovieCard';

interface MovieSliderProps {
  title: string;
  movies: Movie[];
  isPoster?: boolean;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies, isPoster = false }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle slider scroll
  const scroll = (direction: 'left' | 'right') => {
    if (isScrolling || !sliderRef.current) return;
    
    setIsScrolling(true);
    
    const slider = sliderRef.current;
    const scrollAmount = slider.clientWidth * 0.75;
    const currentScroll = slider.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    slider.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Reset scroll lock after animation (matches scroll-behavior: smooth duration)
    setTimeout(() => setIsScrolling(false), 500);
  };

  // Handle scroll event to show/hide arrows
  const handleScroll = () => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const isAtStart = slider.scrollLeft < 10;
    const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;
    
    setShowLeftArrow(!isAtStart);
    setShowRightArrow(!isAtEnd);
  };

  // Calculate the number of cards to display based on viewport width
  const getGridCols = () => {
    // Base this on the expected viewport width:
    // Small screens: 2-3 cards
    // Medium screens: 3-4 cards
    // Large screens: 5-6 cards
    return isPoster ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
  };

  return (
    <div className="mb-8">
      {/* Section Title */}
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4 md:px-8">{title}</h2>
      
      {/* Slider Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
        )}
        
        {/* Right Arrow */}
        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        )}
        
        {/* Slider Content */}
        <div 
          className="overflow-x-auto scrollbar-hide"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          <div className={`grid ${getGridCols()} gap-2 md:gap-3 px-4 md:px-8 pb-4`}>
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} isPoster={isPoster} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;