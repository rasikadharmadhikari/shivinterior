   # Elegance Studio – SHIV INTERIORS

   A modern, full-stack interior design showcase website built for **SHIV INTERIORS**, Pune.  
   Features a stunning UI with GSAP animations, contact form with backend API, and Google Maps integration.

   ---

   ## 🌟 Live Preview

   > Coming Soon...

   ---

   ## 🏠 About

   SHIV INTERIORS is a premium interior design firm based in Pune, Maharashtra with **20+ years of experience** and **200+ projects delivered**.  
   This website showcases their portfolio, services, and provides a contact/enquiry system.

   ---

   ## ✨ Features

   - 🎨 Beautiful UI with GSAP scroll animations
   - 📱 Fully responsive (mobile, tablet, desktop)
   - 📬 Contact form with backend API & database storage
   - 🗺️ Google Maps integration
   - 📊 Animated statistics counters
   - ⚡ Fast performance with Vite

   ---

   ## 🛠️ Tech Stack

   ### Frontend
   - **React 18** with TypeScript
   - **Vite** – Build tool
   - **Tailwind CSS** – Styling
   - **GSAP** – Animations
   - **React Hook Form** + **Zod** – Form validation
   - **Lucide React** – Icons
   - **Wouter** – Routing

   ### Backend
   - **Node.js** + **Express**
   - **Drizzle ORM**
   - **PostgreSQL** – Database

   ---

   ## 📁 Project Structure

   ```
   elegance-studio/
   ├── client/               # React frontend
   │   ├── src/
   │   │   ├── components/   # Reusable UI components
   │   │   ├── hooks/        # Custom React hooks
   │   │   ├── pages/        # Page components
   │   │   └── lib/          # Utility functions
   ├── server/               # Express backend
   │   ├── routes.ts         # API routes
   │   └── index.ts          # Server entry point
   ├── shared/               # Shared types & schema
   │   └── schema.ts
   └── README.md
   ```

   ---

   ## 🚀 Getting Started

   ### Prerequisites
   - Node.js 18+
   - PostgreSQL database

   ### Installation

   1. **Clone the repository**
      ```bash
      git clone https://github.com/your-username/elegance-studio.git
      cd elegance-studio
      ```

   2. **Install dependencies**
      ```bash
      npm install
      ```

   3. **Set up environment variables**
      ```bash
      cp .env.example .env
      ```
      Fill in your `.env`:
      ```env
      DATABASE_URL=postgresql://user:password@localhost:5432/elegance_studio
      NODE_ENV=development
      ```

   4. **Run database migrations**
      ```bash
      npm run db:push
      ```

   5. **Start development server**
      ```bash
      npm run dev
      ```

   6. Open [http://localhost:5000](http://localhost:5000)

   ---

   ## 📦 Available Scripts

   | Command | Description |
   |---|---|
   | `npm run dev` | Start development server |
   | `npm run build` | Build for production |
   | `npm run db:push` | Push database schema |

   ---

   ## 🌐 Deployment

   This project is best deployed on **Railway** (supports full-stack + database).  
   See [railway.app](https://railway.app) for details.

   ---

   ## 📍 Business Info

   **SHIV INTERIORS**  
   Ganapati Matha, 44/2, NDA Road  
   Vitthal Nagar, Warje, Pune – 411058  
   📞 09370455666  
   🔗 [Facebook Page](https://www.facebook.com/share/16yjiLwBC4/)

   ---

   ## 📄 License

   This project is private and intended for **SHIV INTERIORS** use only.

   ---

   *Designed & Developed for SHIV INTERIORS, Pune*
