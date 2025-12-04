# Sistema de Gestión de Transporte

## Overview
This is a corporate transport management system (Sistema de Gestión de Transporte Corporativo) for OXXO GO. The application is a React + TypeScript frontend built with Vite, featuring a comprehensive UI for managing transportation operations.

The system includes three user roles:
- **Admin**: Administrative dashboard with route management, finance module, reports & analytics, and settings
- **Conductor (Driver)**: Driver-specific interface for managing routes and deliveries
- **Empleado (Employee)**: Employee interface for transport requests and tracking

## Tech Stack
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS (via globals.css)
- **Charts**: Recharts
- **Form Handling**: React Hook Form
- **State Management**: React Context (ThemeContext)
- **Additional Libraries**: 
  - Lucide React (icons)
  - Motion (animations)
  - Sonner (toast notifications)
  - Next Themes (theme switching)

## Project Structure
```
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── figma/          # Figma-specific components
│   │   └── ui/             # Reusable UI components (Radix-based)
│   ├── assets/             # Image assets
│   ├── guidelines/         # Project guidelines
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── Recursos2/              # Additional resources (images, logos)
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## Development
The application runs on port 5000 and is configured for the Replit environment:
- Host: `0.0.0.0` (accessible via Replit's web preview)
- Port: `5000` (required for Replit webview)
- HMR: Configured for proper hot module replacement

### Running Locally
```bash
npm install
npm run dev
```

The development server will start at http://0.0.0.0:5000/

## Build & Deployment
The project is configured for static deployment:
- Build command: `npm run build`
- Output directory: `build/`
- Deployment type: Static site

### Building for Production
```bash
npm run build
```

## Configuration Notes
- **Vite Config**: Custom aliases are configured for all dependencies to ensure proper module resolution
- **TypeScript**: Strict mode enabled with ESNext target
- **Replit Integration**: Server configured to bind to 0.0.0.0:5000 for proper Replit preview functionality

## Recent Changes
- **2024-12-04**: Initial Replit environment setup
  - Created TypeScript configuration files (tsconfig.json, tsconfig.node.json)
  - Updated Vite config for Replit environment (port 5000, host 0.0.0.0)
  - Created .gitignore for Node.js projects
  - Configured workflow for frontend development
  - Set up static deployment configuration

## User Preferences
None documented yet.

## Project Architecture
This is a single-page application (SPA) with:
- Client-side routing (implied by user role selection)
- Component-based architecture using React
- Comprehensive UI component library based on Radix UI
- Theme support (light/dark mode via ThemeContext)
- Responsive design patterns
- No backend component (frontend-only application)

## Original Project
This project was imported from Figma: https://www.figma.com/design/iLqwl69JyXQqAVccA1sxvp/Sistema-de-Gesti%C3%B3n-de-Transporte
