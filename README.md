# New Valley Hub (بوابة الوادي الجديد) 🌴
> **"Discover the Magic of Egypt's Hidden Oasis - Digital Tourism Platform."**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Canvas API](https://img.shields.io/badge/Canvas_API-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-Verified-blue?style=for-the-badge)

---

## 📖 About the Project

**New Valley Hub** is a comprehensive full-stack digital tourism platform dedicated to the New Valley Governorate (Al-Wadi Al-Gadid) in Egypt. Whether exploring the surreal landscapes of the White Desert or the historic oasis towns of Kharga and Dakhla, this platform connects travelers with the rich heritage and hidden gems of the region. Built with modern web technologies, it bridges the gap between digital convenience and authentic local experiences.

---

## 🔥 Key Features

### 📸 Digital Souvenir Maker
A unique, interactive feature allowing travelers to create their own digital memories.
*   **Custom Canvas Tool:** Users can upload photos or select from high-quality local backgrounds.
*   **Personalization:** Add custom text with stylized Arabic/English calligraphy fonts.
*   **Instant Download:** Generate and share high-resolution souvenirs instantly.

### 🌍 Bilingual Support (i18n) & Auto-Translation
A truly accessible platform for both local and international tourists.
*   **Full RTL/LTR Support:** Seamless UI flipping between Arabic and English.
*   **Smart Backend Translation:** Utilizes Django Signals to handle content translation automatically.

### 🏛️ Official Leadership Section
*   **Dynamic Governor's Message:** A managed section featuring the Governor's vision and biography.
*   **CMS Controlled:** Fully editable via the custom Django Admin panel specifically designed for non-technical staff.

### 👥 Meet the Team & Team Structure
*   **Smart Rendering:** Automatically detects and displays social media icons (GitHub, LinkedIn) based on team member links.
*   **Organizational Chart:** Visual representation of the tourism board structure.

### ✨ Modern UI/UX
*   **Glassmorphism Design:** Sleek, modern aesthetics using Tailwind CSS.
*   **Responsive Grids:** Flawless experience across mobile, tablet, and desktop.
*   **Interactive Animations:** Engaging micro-interactions to delight users.

### 🤖 Smart Admin Panel
*   **Customized Dashboard:** A clean, intuitive interface for managing tourism data, hotels, and products without writing a single line of code.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Axios, i18next (Internationalization) |
| **Backend** | Django Rest Framework (DRF), Django Modeltranslation, Python |
| **Database** | SQLite (Dev) / PostgreSQL (Prod) |
| **Tools** | Vite, Postman, Git |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js & npm installed
*   Python 3.8+ installed
*   Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/new-valley-hub.git
    cd new-valley-hub
    ```

2.  **Backend Setup (Django)**
    Navigate to the backend folder:
    ```bash
    cd backend
    ```
    Create and activate a virtual environment:
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```
    Install dependencies and migrate database:
    ```bash
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```
    *The backend runs on `http://localhost:8000`*

3.  **Frontend Setup (React)**
    Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
    Install dependencies and start the dev server:
    ```bash
    npm install
    npm run dev
    ```
    *The frontend runs on `http://localhost:5173`*

---

## 📸 Screenshots

| Home Page | Governor's Section |
| :---: | :---: |
| ![Home Page](./screenshots/home.png) | ![Governor Profile](./screenshots/governor.png) |

| Souvenir Maker | Team Section |
| :---: | :---: |
| ![Souvenir Maker](./screenshots/souvenir.png) | ![Team](./screenshots/team.png) |

---

Made with ❤️ for **Egypt** 🇪🇬
