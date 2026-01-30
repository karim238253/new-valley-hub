import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaHotel, FaShoppingBag, FaStar, FaSpinner } from 'react-icons/fa';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log('Fetching search results for query:', query);
                const response = await axios.get(`http://127.0.0.1:8000/api/tourism/search/?q=${encodeURIComponent(query)}`);
                console.log('Search API Response:', response.data);
                setResults(response.data.results);
                setError(null);
            } catch (err) {
                console.error('Search error:', err);
                console.error('Error response:', err.response);
                console.error('Error message:', err.message);
                setError('Failed to fetch search results. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'attraction':
                return <FaMapMarkerAlt className="text-emerald-600" />;
            case 'hotel':
                return <FaHotel className="text-blue-600" />;
            case 'product':
                return <FaShoppingBag className="text-amber-600" />;
            default:
                return null;
        }
    };

    const getTypeBadge = (type) => {
        const badges = {
            attraction: 'bg-emerald-100 text-emerald-700',
            hotel: 'bg-blue-100 text-blue-700',
            product: 'bg-amber-100 text-amber-700',
        };
        return badges[type] || 'bg-gray-100 text-gray-700';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-emerald-600 text-5xl mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Searching for "{query}"...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Search Results for "{query}"
                    </h1>
                    <p className="text-gray-600">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && results.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No results found</h2>
                        <p className="text-gray-500 mb-6">
                            We couldn't find anything matching "{query}". Try different keywords.
                        </p>
                        <Link
                            to="/"
                            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                )}

                {/* Results Grid */}
                {results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((result, index) => (
                            <div
                                key={`${result.type}-${result.id}-${index}`}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Image */}
                                {result.image && (
                                    <div className="h-48 overflow-hidden bg-gray-200">
                                        <img
                                            src={result.image}
                                            alt={result.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-5">
                                    {/* Type Badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        {getTypeIcon(result.type)}
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeBadge(result.type)}`}>
                                            {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                        {result.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {result.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between">
                                        {result.type === 'hotel' && result.rating && (
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <FaStar />
                                                <span className="text-sm font-semibold">{result.rating}</span>
                                            </div>
                                        )}
                                        {result.type === 'product' && result.price && (
                                            <div className="text-emerald-600 font-bold text-lg">
                                                ${result.price}
                                            </div>
                                        )}
                                        {result.type === 'attraction' && result.category && (
                                            <div className="text-gray-500 text-sm italic">
                                                {result.category}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
