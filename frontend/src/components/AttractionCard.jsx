import React from 'react';

const AttractionCard = ({ attraction }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="h-48 overflow-hidden">
                {attraction.image ? (
                    <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{attraction.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                        {attraction.attraction_type}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{attraction.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span>⏱ {attraction.visit_duration_minutes} mins</span>
                    <span>💰 {parseFloat(attraction.ticket_price) === 0 ? 'Free' : `EGP ${attraction.ticket_price}`}</span>
                </div>
            </div>
        </div>
    );
};

export default AttractionCard;
