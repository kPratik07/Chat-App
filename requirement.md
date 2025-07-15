# Installation Guide - Gemini Chat App

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## Quick Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd gemini-chat
   ```

2. **Install dependencies** (equivalent to pip install -r requirements.txt)
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Dependencies Overview

### Core Dependencies (Production)
- `react` ^19.1.0 - React framework
- `react-dom` ^19.1.0 - React DOM rendering
- `@reduxjs/toolkit` ^2.8.2 - State management
- `react-redux` ^9.2.0 - React Redux bindings
- `react-router-dom` ^7.6.3 - Routing
- `react-hook-form` ^7.60.0 - Form handling
- `@hookform/resolvers` ^5.1.1 - Form validation resolvers
- `zod` ^4.0.5 - Schema validation
- `react-toastify` ^11.0.5 - Toast notifications
- `lucide-react` ^0.525.0 - Icons
- `react-icons` ^5.5.0 - Additional icons
- `classnames` ^2.5.1 - CSS class utilities
- `uuid` ^11.1.0 - Unique ID generation

### Development Dependencies
- `vite` ^7.0.4 - Build tool and dev server
- `@vitejs/plugin-react` ^4.6.0 - React plugin for Vite
- `tailwindcss` ^3.4.1 - CSS framework
- `autoprefixer` ^10.4.21 - CSS autoprefixer
- `postcss` ^8.5.6 - CSS processor
- `eslint` ^9.30.1 - Code linting
- `@types/react` ^19.1.8 - TypeScript types for React
- `@types/react-dom` ^19.1.6 - TypeScript types for React DOM

## Alternative Installation Methods

### Using Yarn
```bash
yarn install
yarn dev
```

### Using pnpm
```bash
pnpm install
pnpm dev
```

## Build for Production

```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues

1. **Node version too old**
   ```bash
   # Check Node version
   node --version
   
   # Update Node.js from https://nodejs.org/
   ```

2. **Port already in use**
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

3. **Dependencies not installing**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## Environment Setup

No environment variables are required for this project as it's a frontend-only application with simulated data.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- The app uses Vite for fast development builds
- Tailwind CSS is purged in production builds
- Images are optimized automatically
- Code splitting is enabled for better performance 