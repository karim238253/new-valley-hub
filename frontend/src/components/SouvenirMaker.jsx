import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SouvenirMaker.css';

const SouvenirMaker = () => {
    const canvasRef = useRef(null);
    const [text, setText] = useState('New Valley Hub');
    const [font, setFont] = useState('Ancient');
    const [bgImage, setBgImage] = useState(null); // No initial background
    const [customUrl, setCustomUrl] = useState('');
    const [apiArtifacts, setApiArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Digital Artifacts from API
        const fetchArtifacts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tourism/artifacts/');
                setApiArtifacts(response.data);
                // Automatically select first artifact if available
                if (response.data.length > 0) {
                    setBgImage(response.data[0]);
                }
            } catch (error) {
                console.error("Error fetching artifacts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtifacts();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Define canvas dimensions first
        canvas.width = 800;
        canvas.height = 600;

        // If no background image selected yet
        if (!bgImage) {
            ctx.fillStyle = '#f3f4f6'; // Gray background
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#6b7280';
            ctx.font = "20px 'Inter', sans-serif";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("Select a background to start", canvas.width / 2, canvas.height / 2);
            return;
        }

        const image = new Image();

        // CORS handling for external images
        image.crossOrigin = "Anonymous";

        // Determine Source URL
        let imgSrc = bgImage.url || '';

        // Handle API Images
        if (bgImage.final_image_src) {
            if (bgImage.final_image_src.startsWith('http')) {
                imgSrc = bgImage.final_image_src;
            } else {
                imgSrc = `http://127.0.0.1:8000${bgImage.final_image_src}`;
            }
        }

        image.src = imgSrc;

        image.onload = () => {
            // Draw Background
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Overlay styling
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Text Styling
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';

            // Set Font based on selection
            let fontStr = "bold 60px ";
            if (font === 'Ancient') fontStr += "'Ancient', serif";
            else if (font === 'Hieroglyphs') fontStr += "'Hieroglyphs', cursive";
            else fontStr += "'Inter', sans-serif";

            ctx.font = fontStr;

            // Add Text
            ctx.shadowColor = "rgba(0,0,0,0.8)";
            ctx.shadowBlur = 10;
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            // Branding/Watermark
            ctx.font = "20px 'Inter', sans-serif";
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillText("New Valley Hub", canvas.width - 100, canvas.height - 30);
        };

        image.onerror = () => {
            console.error("Failed to load image:", imgSrc);
            // Verify this isn't a loop if it fails repeatedly, usually safe here
        }
    }, [text, font, bgImage]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!bgImage) return; // Prevent download if no image

        const link = document.createElement('a');
        link.download = `new-valley-souvenir-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const handleCustomUrlChange = (e) => {
        const url = e.target.value;
        setCustomUrl(url);
        if (url) {
            setBgImage({ id: 'custom-url', name: 'Custom URL', url: url });
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setBgImage({ id: 'custom-file', name: 'Custom File', url: objectUrl });
            setCustomUrl('');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                <h3 className="text-xl font-bold mb-4 text-orange-600">Customize Souvenir</h3>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Message</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500"
                        maxLength="30"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Font Style</label>
                    <div className="grid grid-cols-1 gap-2">
                        {['Ancient', 'Hieroglyphs', 'Default'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFont(f)}
                                className={`p-2 border rounded text-left px-4 transition-all ${font === f ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                <span className={`text-lg ${f === 'Ancient' ? 'souvenir-font-ancient' :
                                    f === 'Hieroglyphs' ? 'souvenir-font-hieroglyphs' : 'souvenir-font-default'
                                    }`}>
                                    {f} Style
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Background</label>

                    {/* Presets + API Artifacts */}
                    <p className="text-xs text-gray-500 mb-2">Select a Background:</p>

                    {loading ? (
                        <p className="text-sm text-gray-500 italic mb-4">Loading souvenirs...</p>
                    ) : apiArtifacts.length === 0 ? (
                        <p className="text-sm text-red-500 italic mb-4 border p-2 rounded bg-red-50">
                            No souvenirs available. Please add Digital Artifacts in the admin panel.
                        </p>
                    ) : (
                        <div className="grid grid-cols-4 gap-2 mb-4 max-h-40 overflow-y-auto">
                            {/* API Artifacts ONLY */}
                            {apiArtifacts.map((artifact) => (
                                <button
                                    key={artifact.id}
                                    onClick={() => {
                                        setBgImage(artifact);
                                        setCustomUrl('');
                                    }}
                                    className={`relative h-12 rounded overflow-hidden border-2 transition-all ${bgImage && bgImage.id === artifact.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    title={artifact.name}
                                >
                                    <img
                                        src={artifact.final_image_src?.startsWith('http') ? artifact.final_image_src : `http://127.0.0.1:8000${artifact.final_image_src}`}
                                        alt={artifact.name}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Dual Input: URL or File */}
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-xs text-gray-500 mb-2 font-bold">Or use your own:</p>

                        {/* URL Input */}
                        <input
                            type="text"
                            placeholder="Paste Image URL..."
                            value={customUrl}
                            onChange={handleCustomUrlChange}
                            className="w-full border p-2 rounded text-sm mb-2 focus:ring-2 focus:ring-orange-500"
                        />

                        {/* Divider */}
                        <div className="flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink-0 mx-2 text-xs text-gray-400">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* File Input */}
                        <label className="flex items-center justify-center w-full px-4 py-2 bg-white text-orange-600 rounded-lg shadow-sm tracking-wide uppercase border border-orange-200 cursor-pointer hover:bg-orange-50 transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c5 5 0 0 1 5 5 5 5 0 0 1-4.88-3.9z" /></svg>
                            <span className="text-xs font-bold">Upload File</span>
                            <input type='file' className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    disabled={!bgImage}
                    className={`w-full text-white font-bold py-3 rounded transition flex items-center justify-center space-x-2 ${bgImage ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>Download Image</span>
                </button>
            </div>

            {/* Preview */}
            <div className="md:col-span-2 flex items-center justify-center bg-gray-100 rounded-lg p-4 border border-gray-200">
                <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto shadow-lg rounded"
                />
            </div>
        </div>
    );
};

export default SouvenirMaker;
