import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import axios from 'axios';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Ahlan ya habibi! I am Am Sa3ed (عم سعيد). How can I help you explore New Valley today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            console.log("Sending request to API...");
            // Use 127.0.0.1 to avoid potential localhost resolution issues
            const response = await axios.post('http://127.0.0.1:8000/api/tourism/chat/', {
                message: userMessage.text
            });
            console.log("API Response:", response.data);

            const aiMessage = { text: response.data.response, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            if (error.response) {
                console.error("Server Error details:", error.response.data);
            }
            const errorMessage = { text: "Ma3lesh (Sorry), I am having trouble connecting right now. Try again later!", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-24 z-50 overflow-hidden font-sans pointer-events-none">
            {/* Chat Window */}
            <div
                className={`
                    pointer-events-auto
                    transition-all duration-300 ease-in-out transform origin-bottom-right
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                    bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col mb-4 border border-gray-200
                `}
                style={{ maxHeight: 'calc(100vh - 120px)', height: '500px' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
                    <div className="flex items-center space-x-2">
                        <div className="bg-white p-1.5 rounded-full text-emerald-600">
                            <FaRobot size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">3m Sa3ed 🐫</h3>
                            <p className="text-xs text-emerald-100 opacity-90">Your Local Guide</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleChat}
                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors focus:outline-none"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-4 scroll-smooth">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`
                                    max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm
                                    ${msg.sender === 'user'
                                        ? 'bg-emerald-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}
                                `}
                            >
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-100 text-gray-500 rounded-2xl rounded-bl-none px-4 py-3 text-sm shadow-sm flex items-center space-x-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about New Valley..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={`
                                p-2 rounded-full transition-all
                                ${isLoading || !input.trim()
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-emerald-600 hover:bg-emerald-50 active:scale-95'}
                            `}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </form>
            </div>

            {/* Toggle Button */}
            {!isOpen && (
                <div className="fixed bottom-6 right-24 z-[100] flex items-center gap-3 pointer-events-none">
                    {/* Call to Action Label */}
                    <div className="bg-white px-4 py-2 rounded-lg shadow-md animate-bounce relative pointer-events-auto">
                        <span className="text-sm font-semibold text-emerald-700">Ask 3m Sa3ed 🐫</span>
                        {/* Arrow pointing to button */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
                        </div>
                    </div>

                    {/* Button & Pulse Wrapper */}
                    <div className="relative pointer-events-auto">
                        {/* The Pulse Effect */}
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

                        {/* The Main Button */}
                        <button
                            onClick={toggleChat}
                            className="relative z-10 w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
                        >
                            {/* Icon */}
                            <FaComments size={24} className="group-hover:animate-pulse" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotWidget;
