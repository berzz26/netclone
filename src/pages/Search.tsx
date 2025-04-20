import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchContent } from '../services/api';
import { Movie } from '../types';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MovieCard from '../components/movies/MovieCard';
import { Search as SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Effect to handle search when query param changes
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);
  
  // Search function
  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await searchContent(searchTerm);
      setResults(data);
    } catch (error) {
      console.error('Error searching content:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  return (
    <div className="bg-netflix-black min-h-screen">
      <Navbar />
      
      {/* Search Bar */}
      <div className="pt-28 pb-8 px-4 md:px-8 container mx-auto">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, TV shows, and more..."
              className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 focus:border-netflix-red rounded-md text-white focus:outline-none"
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-netflix-red hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Search Results or Initial State */}
        <div>
          {query ? (
            <h2 className="text-2xl font-medium text-white mb-6">
              {isLoading ? 
                'Searching...' : 
                results.length > 0 ?
                  `Results for "${query}"` :
                  `No results found for "${query}"`
              }
            </h2>
          ) : (
            <h2 className="text-2xl font-medium text-white mb-6">Search for movies and TV shows</h2>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="border-t-4 border-netflix-red rounded-full w-12 h-12 animate-spin"></div>
            </div>
          )}
          
          {/* Results Grid */}
          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map(item => (
                <MovieCard key={item.id} movie={item} isPoster={true} />
              ))}
            </div>
          )}
          
          {/* No Results State */}
          {!isLoading && query && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-netflix-lightGray">We couldn't find any matches for "{query}"</p>
              <p className="text-gray-500 mt-2">Try a different search term or check for typos</p>
            </div>
          )}
          
          {/* Initial Empty State */}
          {!isLoading && !query && (
            <div className="text-center py-12">
              <p className="text-netflix-lightGray">Enter a search term to find movies and TV shows</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;