import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAttractions } from '../services/api';
import WeatherWidget from '../components/WeatherWidget';
import TeamSection from '../components/TeamSection';
import GovernorSection from '../components/GovernorSection';

const HomePage = () => {
    const [topAttractions, setTopAttractions] = useState([]);
    const [totalAttractions, setTotalAttractions] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch top 3 attractions for highlights
        getAttractions()
            .then(res => {
                setTopAttractions(res.data.slice(0, 3));
                setTotalAttractions(res.data.length);
            })
            .catch(err => console.error("Error fetching attractions:", err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section with Background */}
            <div className="relative h-[600px] flex items-center justify-center text-center px-4">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="http://127.0.0.1:8000/media/locations/white_desert.jpg"
                        alt="White Desert"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                </div>

                {/* Weather Widget - Absolute positioned top right */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
                    <WeatherWidget />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
                        Discover the <span className="text-orange-400">New Valley</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-100 mb-10 drop-shadow-lg max-w-2xl mx-auto">
                        Experience the magic of Egypt's hidden oasis. From the White Desert to ancient temples, your journey begins here.
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link
                            to="/attractions"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            🗺️ Explore Attractions
                        </Link>
                        <Link
                            to="/planner"
                            className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            ✨ Trip Planner
                        </Link>
                    </div>

                    {/* Smart Search Bar */}
                    <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-2xl flex max-w-xl mx-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="🔍 Where do you want to go?"
                            className="flex-grow px-6 py-3 rounded-l-full focus:outline-none text-gray-700"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>

            {/* Photo Gallery Section */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Top Attractions</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore the breathtaking beauty and rich heritage of the New Valley Governorate
                        </p>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topAttractions.length > 0 ? (
                            topAttractions.map(attraction => (
                                <Link
                                    key={attraction.id}
                                    to="/attractions"
                                    className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                                >
                                    {/* Image Container */}
                                    <div className="h-64 relative overflow-hidden">
                                        {attraction.image ? (
                                            <img
                                                src={attraction.image}
                                                alt={attraction.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
                                                <span className="text-white text-6xl">🏜️</span>
                                            </div>
                                        )}
                                        {/* Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                                                {attraction.name}
                                            </h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase font-semibold">
                                                {attraction.attraction_type}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {attraction.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                ⏱ {attraction.visit_duration_minutes} mins
                                            </span>
                                            <span className="flex items-center gap-1 font-semibold text-green-600">
                                                💰 {parseFloat(attraction.ticket_price) === 0 ? 'Free' : `EGP ${attraction.ticket_price}`}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            // Loading Skeletons
                            [1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
                                    <div className="h-64 bg-gray-300"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-300 rounded mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Link
                            to="/attractions"
                            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            View All {totalAttractions} Attractions →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Governor Section */}
            <GovernorSection />

            {/* Features Section */}
            <div className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-5xl mb-4">🗺️</div>
                            <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                            <p className="text-gray-400 text-sm">Explore all locations on our interactive map</p>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl mb-4">✨</div>
                            <h3 className="text-xl font-bold mb-2">Trip Planner</h3>
                            <p className="text-gray-400 text-sm">Get personalized itineraries powered by AI</p>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl mb-4">🏨</div>
                            <h3 className="text-xl font-bold mb-2">Hotels & Services</h3>
                            <p className="text-gray-400 text-sm">Find accommodation and essential services</p>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl mb-4">🛍️</div>
                            <h3 className="text-xl font-bold mb-2">Local Marketplace</h3>
                            <p className="text-gray-400 text-sm">Shop authentic local products and crafts</p>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl mb-4">📸</div>
                            <h3 className="text-xl font-bold mb-2">Digital Souvenir Maker</h3>
                            <p className="text-gray-400 text-sm">Create and personalize your own digital memories from the New Valley's landmarks</p>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl mb-4">👥</div>
                            <h3 className="text-xl font-bold mb-2">Meet the Team</h3>
                            <p className="text-gray-400 text-sm">Connect with the creators and developers behind the New Valley Hub</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Banner */}
            <div className="relative py-20 px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="http://127.0.0.1:8000/media/locations/farafra_oasis.jpg"
                        alt="Farafra Oasis"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-900/80"></div>
                </div>
                <div className="relative z-10 text-center max-w-3xl mx-auto text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Adventure?</h2>
                    <p className="text-xl mb-8">
                        Let our Trip Planner create the perfect travel plan tailored just for you
                    </p>
                    <Link
                        to="/planner"
                        className="inline-block bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    >
                        🚀 Plan My Trip Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
