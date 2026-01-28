import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAttractions, getServices, getHotels } from '../services/api';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        // Handle Online/Offline Status
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const fetchData = async () => {
            // If we are offline initially, don't try to fetch
            if (!navigator.onLine) {
                setLoading(false);
                return;
            }

            try {
                const [attractionsRes, servicesRes, hotelsRes] = await Promise.all([
                    getAttractions(),
                    getServices(),
                    getHotels()
                ]);

                const combinedLocations = [
                    ...attractionsRes.data.map(item => ({ ...item, type: 'Attraction', color: 'blue' })),
                    ...servicesRes.data.map(item => ({ ...item, type: 'Service', color: 'green' })),
                    ...hotelsRes.data.map(item => ({ ...item, type: 'Hotel', color: 'orange' }))
                ];

                setLocations(combinedLocations);
            } catch (error) {
                console.error("Error loading map data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Initial Loading State (only if online)
    if (loading && !isOffline) return <div className="text-center p-10">Loading Map...</div>;

    // Default center: Kharga Oasis (roughly)
    const center = [25.4390, 30.5586];

    return (
        <div className="h-[600px] min-h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0 relative">
            {isOffline ? (
                <div className="w-full h-full relative bg-gray-100 flex items-center justify-center">
                    <img
                        src="/offline-map.jpg"
                        alt="Offline Map of New Valley"
                        className="w-full h-full object-cover block"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 border-2 border-yellow-500 text-yellow-900 px-6 py-4 rounded-xl shadow-2xl flex flex-col items-center z-10">
                        <div className="text-3xl mb-2">⚡</div>
                        <h3 className="font-bold text-lg">You are viewing the Offline Map</h3>
                        <p className="text-sm opacity-80 mt-1">Interactive features are disabled</p>
                    </div>
                </div>
            ) : (
                <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {locations.map(loc => (
                        <Marker key={`${loc.type}-${loc.id}`} position={[loc.latitude, loc.longitude]}>
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-gray-900">{loc.name}</h3>
                                    <div className="badge badge-sm mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        {loc.type}
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2 my-1">{loc.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
};

export default MapComponent;
