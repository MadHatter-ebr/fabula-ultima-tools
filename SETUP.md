# 🚀 Fabula Ultima Tools - Setup Guide

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)
- A Netlify account (free tier available)

## 🔧 Setup Steps

### 1. Clone Repository
```bash
git clone https://github.com/MadHatter-ebr/fabula-ultima-tools.git
cd fabula-ultima-tools
```

### 2. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to initialize
3. Go to Settings → API
4. Copy your **Project URL** and **anon public key**
5. Go to SQL Editor in Supabase dashboard
6. Copy and paste the contents of `supabase-schema.sql` 
7. Click "Run" to create all tables and policies

### 3. Configure Environment Variables

1. In `webapp/frontend/`, copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Install Dependencies
```bash
cd webapp/frontend
npm install
```

### 5. Test Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to test the app.

### 6. Deploy to Netlify

#### Option A: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `webapp/frontend/dist`
   - **Base directory**: `webapp/frontend`
6. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Deploy!

#### Option B: Manual Deploy
```bash
cd webapp/frontend
npm run build
# Upload 'dist' folder to Netlify
```

## 🔑 Authentication Setup

### Enable OAuth Providers in Supabase

1. Go to Authentication → Providers in Supabase
2. Configure OAuth providers:
   - **Google**: Enable and add OAuth credentials
   - **GitHub**: Enable and add OAuth credentials
   - **Discord**: Enable and add OAuth credentials

### OAuth Redirect URLs
Add these redirect URLs in your OAuth provider settings:
- Local development: `http://localhost:3000`
- Production: `https://your-netlify-site.netlify.app`

## 📊 Database Schema

The app creates these tables:
- `user_profiles` - User information
- `characters` - Player characters
- `campaigns` - Campaign data
- `combat_sessions` - Combat tracking
- `dice_rolls` - Roll history
- `shared_content` - Community content

## 🎯 Features

### ✅ Working Features
- 🎭 Character Generator with all 15 classes
- 🎲 Dice Roller with Fabula Ultima mechanics
- ⚔️ Combat Tracker with HP/MP tracking
- 🔐 User Authentication (Email + OAuth)
- 💾 Data persistence in Supabase
- 📱 Responsive design

### 🔄 Planned Features
- 🎮 8-bit character sprites
- 🤖 AI-powered adventure generator
- 🗺️ Interactive battle maps
- 👥 Real-time multiplayer sessions
- 📚 Rule reference system
- 🎒 Inventory management

## 🛠️ Development

### Project Structure
```
fabula-ultima-tools/
├── webapp/
│   ├── frontend/          # React app
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── lib/          # Supabase config
│   │   │   └── styles/       # CSS files
│   │   └── dist/             # Build output
│   └── shared/               # Shared game data
├── supabase-schema.sql       # Database schema
├── netlify.toml             # Netlify config
└── SETUP.md                 # This file
```

### Local Development
```bash
# Install dependencies
cd webapp/frontend
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Make sure `.env` file is in `webapp/frontend/`
   - Variables must start with `VITE_`
   - Restart development server after changes

2. **Database connection errors**
   - Check your Supabase URL and key
   - Verify the database schema was created
   - Check RLS policies are enabled

3. **Authentication not working**
   - Verify OAuth providers are configured
   - Check redirect URLs match your domain
   - Ensure Supabase project is not paused

4. **Build errors**
   - Clear node_modules and reinstall
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/MadHatter-ebr/fabula-ultima-tools/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MadHatter-ebr/fabula-ultima-tools/discussions)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

🎮 **Happy gaming with Fabula Ultima Tools!**