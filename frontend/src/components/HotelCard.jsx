import React from 'react';

const HotelCard = ({ hotel }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="h-48 overflow-hidden relative">
                {hotel.image ? (
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded font-bold text-xs shadow">
                    {hotel.stars} ★
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hotel.description}</p>
                    <div className="text-sm text-gray-500 mb-2">Price Range: <span className="font-semibold text-green-600">{hotel.price_range}</span></div>
                </div>

                <div className="flex gap-2 mt-auto">
                    {hotel.google_map_url && (
                        <a
                            href={hotel.google_map_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-2 rounded transition-colors duration-200 flex items-center justify-center gap-2"
                            title="Get Directions"
                        >
                            <span>📍</span> Directions
                        </a>
                    )}
                    <a
                        href={hotel.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[2] text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
