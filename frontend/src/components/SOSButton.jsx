import React, { useState } from 'react';

const SOSButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const emergencyContacts = [
        { name: 'Ambulance', number: '123', icon: '🚑' },
        { name: 'Police', number: '122', icon: '🚓' },
        { name: 'Tourist Police', number: '126', icon: '👮' },
    ];

    const handleCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
            {/* Menu */}
            {isOpen && (
                <div className="flex flex-col space-y-2 mb-2 animate-fade-in-up">
                    {emergencyContacts.map((contact) => (
                        <button
                            key={contact.name}
                            onClick={() => handleCall(contact.number)}
                            className="flex items-center justify-between bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors w-48 border-l-4 border-red-500"
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-xl">{contact.icon}</span>
                                <span className="font-bold text-sm">{contact.name}</span>
                            </div>
                            <span className="text-red-600 font-bold">{contact.number}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110
                    ${isOpen ? 'bg-gray-800 rotate-45' : 'bg-red-600 animate-pulse'}
                `}
                aria-label="SOS Emergency"
            >
                {isOpen ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-2xl">🆘</span>
                        <span className="text-[10px] font-bold text-white uppercase mt-[-2px]">SOS</span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default SOSButton;
