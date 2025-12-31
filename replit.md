# Mr.OSKAR Template Engine

## Overview

Mr.OSKAR is an interactive 3D particle template engine that transforms geometric shapes and uploaded images into thousands of interactive particles. Users can select from preset 3D shapes (sphere, helix, torus, etc.) or upload custom images that get converted to particle formations. The particles respond to mouse interaction with attraction and repulsion physics, creating an immersive visual experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite for development and bundling
- **3D Rendering**: Three.js handles WebGL particle simulation with 20,000+ particles that respond to mouse physics
- **UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with custom glassmorphism theme, Orbitron/Rajdhani fonts for futuristic aesthetic
- **State Management**: TanStack Query (React Query) for server state, React useState for local UI state
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth UI transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation schemas
- **Database ORM**: Drizzle ORM with type-safe schema definitions
- **Validation**: Zod schemas shared between frontend and backend for end-to-end type safety

### Data Storage
- **Database**: PostgreSQL for persistent storage
- **Tables**: 
  - `templates`: Stores template metadata including name, image URL (base64 for custom uploads), colors, and scale
  - `shape_descriptions`: Stores Markdown descriptions for each geometric shape

### Project Structure
- `/client`: React frontend with components, hooks, pages, and UI library
- `/server`: Express backend with routes, database connection, and storage layer
- `/shared`: Shared TypeScript schemas and API route definitions used by both frontend and backend

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle ORM for database operations with `drizzle-kit` for migrations

### UI Component Libraries
- Radix UI primitives for accessible components
- shadcn/ui configuration in `components.json`
- Lucide React for icons

### 3D Graphics
- Three.js for WebGL particle rendering
- Custom particle physics simulation (no external physics library)

### Development Tools
- Vite with React plugin and Replit-specific plugins for development
- esbuild for production server bundling
- TypeScript with path aliases (`@/` for client, `@shared/` for shared code)