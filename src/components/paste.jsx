import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function OmdbPagination() {
  const [inputValue, setInputValue] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [omdbPage, setOmdbPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const DISPLAY_COUNT = 6;
  const OMDB_PAGE_SIZE = 10;
  const API_KEY = 'YOUR_API_KEY'; // Replace with your OMDB API key

  const fetchOmdbPage = async (page) => {
    try {
      setLoading(true);
      const url = new URL('https://www.omdbapi.com/');
      url.searchParams.append('apikey', API_KEY);
      url.searchParams.append('s', inputValue);
      url.searchParams.append('page', page);

      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True') {
        setAllResults(prev => page === 1 ? data.Search : [...prev, ...data.Search]);
        setOmdbPage(page);
        setTotalResults(parseInt(data.totalResults));
        setError('');
      } else {
        setError(data.Error || 'No results found');
        if (page === 1) {
          setAllResults([]);
          setTotalResults(0);
        }
      }
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    setIsSearching(true);
    setDisplayIndex(0);
    setOmdbPage(0);
    setAllResults([]);
    await fetchOmdbPage(1);
  };

  const showNextResults = async () => {
    const nextDisplayIndex = displayIndex + DISPLAY_COUNT;
    const neededResults = nextDisplayIndex + DISPLAY_COUNT;
    const availableResults = omdbPage * OMDB_PAGE_SIZE;

    // Check if we need to fetch more before showing next set
    if (neededResults > availableResults && availableResults < totalResults) {
      await fetchOmdbPage(omdbPage + 1);
    }

    setDisplayIndex(nextDisplayIndex);
  };

  const showPrevResults = () => {
    setDisplayIndex(Math.max(0, displayIndex - DISPLAY_COUNT));
  };

  const displayedResults = allResults.slice(displayIndex, displayIndex + DISPLAY_COUNT);
  const hasNext = displayIndex + DISPLAY_COUNT < totalResults;
  const hasPrev = displayIndex > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">OMDB Movie Search</h1>
        
        {/* Search Input */}
        <div className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for movies..."
              className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !inputValue.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center text-gray-400 py-8">
            Loading...
          </div>
        )}

        {/* Results Info */}
        {isSearching && totalResults > 0 && (
          <div className="text-gray-300 mb-4 text-center">
            Showing {displayIndex + 1}-{Math.min(displayIndex + DISPLAY_COUNT, totalResults)} of {totalResults} results
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedResults.map((movie, idx) => (
            <div
              key={`${movie.imdbID}-${idx}`}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{movie.Title}</h3>
                <p className="text-gray-400 text-sm">{movie.Year}</p>
                <p className="text-gray-500 text-sm capitalize">{movie.Type}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {isSearching && totalResults > 0 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={showPrevResults}
              disabled={!hasPrev || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            <span className="text-gray-300">
              Page {Math.floor(displayIndex / DISPLAY_COUNT) + 1} of {Math.ceil(totalResults / DISPLAY_COUNT)}
            </span>
            <button
              onClick={showNextResults}
              disabled={!hasNext || loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Debug Info (Optional - remove in production) */}
        {isSearching && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg text-gray-400 text-sm">
            <p>Display Index: {displayIndex}</p>
            <p>OMDB Pages Fetched: {omdbPage}</p>
            <p>Total Results Loaded: {allResults.length}</p>
            <p>Total Available: {totalResults}</p>
          </div>
        )}
      </div>
    </div>
  );
}