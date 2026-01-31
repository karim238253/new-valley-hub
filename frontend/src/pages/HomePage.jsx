import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaRobot, FaSuitcase, FaBed, FaStore, FaCameraRetro } from 'react-icons/fa';
import { getAttractions } from '../services/api';
import WeatherWidget from '../components/WeatherWidget';
import TeamSection from '../components/TeamSection';
import GovernorSection from '../components/GovernorSection';

const HomePage = () => {
    const [topAttractions, setTopAttractions] = useState([]);
    const [totalAttractions, setTotalAttractions] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Features data array
    const features = [
        {
            title: "AI Tour Guide (3m Sa3ed)",
            description: "Chat with our local expert '3m Sa3ed' for instant advice, hidden gems, and 24/7 support in Egyptian dialect.",
            icon: <FaRobot className="w-8 h-8" />,
            link: null // Could link to chatbot or about page
        },
        {
            title: "Smart Trip Planner",
            description: "Get a personalized itinerary tailored to your budget and time in seconds using our AI engine.",
            icon: <FaSuitcase className="w-8 h-8" />,
            link: '/planner'
        },
        {
            title: "Interactive Map",
            description: "Explore all 28+ destinations, hotels, and services on a detailed, easy-to-navigate digital map.",
            icon: <FaMapMarkedAlt className="w-8 h-8" />,
            link: '/map'
        },
        {
            title: "Hotels & Eco-Lodges",
            description: "Find and book the perfect stay, from luxury resorts to authentic traditional mud-brick houses.",
            icon: <FaBed className="w-8 h-8" />,
            link: '/hotels'
        },
        {
            title: "Local Marketplace",
            description: "Support the community and buy authentic handmade crafts and dates directly from local artisans.",
            icon: <FaStore className="w-8 h-8" />,
            link: '/marketplace'
        },
        {
            title: "Digital Souvenir Maker",
            description: "Create personalized digital memories with our custom filters and share your adventure with the world.",
            icon: <FaCameraRetro className="w-8 h-8" />,
            link: '/souvenir'
        }
    ];

    useEffect(() => {
        // Ensure page title is correct
        document.title = 'New Valley Hub';

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
            <div className="py-20 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-white">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                            Platform Features
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Everything you need to explore the New Valley like a local
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => {
                            const CardContent = (
                                <>
                                    {/* Gradient Background Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />

                                    {/* Icon Container */}
                                    <div className="relative inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 text-orange-400 mb-6 shadow-lg group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        {feature.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Optional Link Indicator */}
                                    {feature.link && (
                                        <div className="relative mt-6 flex items-center text-orange-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-sm">Explore →</span>
                                        </div>
                                    )}
                                </>
                            );

                            const cardClasses = "group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/20 hover:border-orange-500/50 overflow-hidden";

                            return feature.link ? (
                                <Link
                                    key={index}
                                    to={feature.link}
                                    className={`${cardClasses} block cursor-pointer`}
                                >
                                    {CardContent}
                                </Link>
                            ) : (
                                <div
                                    key={index}
                                    className={cardClasses}
                                >
                                    {CardContent}
                                </div>
                            );
                        })}
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
