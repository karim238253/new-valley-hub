import React, { useState } from 'react';
import { generateItinerary } from '../services/api';

const PlannerPage = () => {
    const [formData, setFormData] = useState({
        days: 3,
        budget: 'medium',
        interests: []
    });
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInterestChange = (interest) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const [estimatedCost, setEstimatedCost] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await generateItinerary(formData);
            // Handle new response structure: { itinerary: [...], total_estimated_cost: X }
            if (res.data.itinerary) {
                setItinerary(res.data.itinerary);
                setEstimatedCost(res.data.total_estimated_cost);
            } else {
                // Fallback for backward compatibility if needed, though we changed the backend
                setItinerary(res.data);
            }
        } catch (error) {
            console.error("Error generating plan", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Trip Planner</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                    <h3 className="text-xl font-bold mb-4">Your Preferences</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Duration (Days)</label>
                            <input
                                type="number"
                                min="1" max="7"
                                value={formData.days}
                                onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Budget Level</label>
                            <select
                                value={formData.budget}
                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="low">Budget (Low)</option>
                                <option value="medium">Standard (Medium)</option>
                                <option value="high">Luxury (High)</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">Interests</label>
                            <div className="space-y-2">
                                {['natural', 'historical', 'cultural'].map(type => (
                                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.interests.includes(type)}
                                            onChange={() => handleInterestChange(type)}
                                            className="form-checkbox text-orange-500"
                                        />
                                        <span className="capitalize">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition"
                        >
                            {loading ? 'Generating...' : 'Generate Plan ✨'}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="md:col-span-2">
                    {itinerary ? (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-4 text-orange-600">Your Recommended Itinerary</h3>

                            {/* Budget Estimation Card */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5 mb-6 flex items-center justify-between shadow-sm">
                                <div>
                                    <h4 className="text-gray-700 font-bold text-lg">Estimated Total Cost</h4>
                                    <p className="text-xs text-gray-500 mt-1">*Includes estimated accommodation, food, and entry tickets.</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-3xl font-extrabold text-green-700">
                                        ≈ {estimatedCost.toLocaleString()} <span className="text-lg">EGP</span>
                                    </span>
                                </div>
                            </div>

                            {itinerary.map((day) => (
                                <div key={day.day} className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                                    <h4 className="text-xl font-bold mb-4">Day {day.day}</h4>
                                    <div className="space-y-4">
                                        {day.activities.map((act, idx) => (
                                            <div key={idx} className="flex items-start space-x-4 p-3 bg-gray-50 rounded">
                                                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded overflow-hidden">
                                                    {act.image && <img src={act.image} alt={act.name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{act.time}</span>
                                                        <h5 className="font-bold text-lg">{act.name}</h5>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mt-1">{act.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {day.activities.length === 0 && <p className="text-gray-500 italic">Relax and explore the local markets.</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-10">
                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7m0 0a2 2 0 012-2h.091a1.976 1.976 0 001.785-1.157L19 3M5 21a2 2 0 01-2-2v-5m0 0a2 2 0 012-2h.091a1.976 1.976 0 011.784 1.157l.111.222"></path></svg>
                            <p className="text-lg">Fill the form to generate your personal travel plan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlannerPage;
