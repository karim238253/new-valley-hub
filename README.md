# New Valley Hub - Tourism Platform

A comprehensive web platform for exploring Egypt's New Valley Governorate, featuring attractions, hotels, services, and AI-powered trip planning.

## 🌟 Features

- **29 Attractions** - Historical sites, natural wonders, cultural landmarks
- **15 Hotels** - From luxury resorts to budget accommodations
- **22 Services** - Hierarchical directory (Dining, Medical, Emergency, General)
- **AI Trip Planner** - Generate custom itineraries
- **Interactive Map** - Explore locations visually
- **Marketplace** - Local products and crafts

## 🛠️ Tech Stack

### Backend
- Django 5.x
- Django REST Framework
- SQLite database
- OpenAI API integration

### Frontend
- React 18+ (Vite)
- React Router
- Axios
- Tailwind CSS

## 📦 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

API Docs: `http://localhost:8000/api/`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd new-valley-hub
```

2. **Setup and run backend** (see Backend Setup above)

3. **Setup and run frontend** (see Frontend Setup above)

4. **Access the app** at `http://localhost:5173`

## 📱 Mobile App

React Native mobile app available in separate repository: `new-valley-mobile`

## 🗄️ Database

The project uses SQLite with pre-populated data:
- All images use public Wikimedia Commons URLs
- No external dependencies for images

## 🌐 API Endpoints

- `GET /api/tourism/attractions/` - List all attractions
- `GET /api/hospitality/hotels/` - List all hotels
- `GET /api/services/items/` - List all services
- `GET /api/services/categories/hierarchy/` - Hierarchical service categories
- `POST /api/tourism/attractions/generate_plan/` - AI trip planning

## 📝 Project Structure

```
new-valley-hub/
├── backend/               # Django backend
│   ├── tourism/          # Attractions app
│   ├── hospitality/      # Hotels app
│   ├── services/         # Services app
│   ├── marketplace/      # Products app
│   └── new_valley_hub/   # Main Django project
├── frontend/             # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   └── App.jsx      # Main app component
│   └── public/          # Static assets
└── README.md
```

## 🎨 Features Implemented

- ✅ Complete CRUD operations for all models
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Image optimization with public URLs
- ✅ AI-powered trip planning
- ✅ Hierarchical service categories
- ✅ Search and filtering
- ✅ Interactive mapping

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env` file in backend directory:
```
SECRET_KEY=your-secret-key
DEBUG=True
OPENAI_API_KEY=your-openai-key  # For AI planner
```

## 📄 License

This project was created for the New Valley Governorate tourism initiative.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🆘 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for exploring the New Valley Governorate**
