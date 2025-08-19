# React SPA Project Kickstart Prompt

## Project Overview
Create a modern React Single Page Application with the following battle-tested architecture and patterns. This template is based on a production application and includes all the configurations, patterns, and best practices needed for a scalable, secure React dashboard.

## Quick Start Command
```bash
# Replace 'my-dashboard' with your project name
npm create vite@latest my-dashboard -- --template react
cd my-dashboard
npm install @tanstack/react-query @tanstack/react-query-devtools react-router-dom axios @radix-ui/react-dialog @radix-ui/react-tooltip @tailwindcss/vite tailwindcss clsx tailwind-merge class-variance-authority lucide-react date-fns react-hook-form @hookform/resolvers react-hot-toast react-error-boundary zod vite-plugin-html
```

## Core Technology Stack
- **React 19.1.0** - Modern React with direct imports
- **Vite 7.0.4** - Fast build tool and dev server with security enhancements
- **TanStack Query 5.84.1** - Data fetching and state management
- **React Router 7.7.1** - Client-side routing
- **Axios 1.11.0** - HTTP client
- **Tailwind CSS v4.1.11** - Utility-first CSS framework
- **React Hook Form 7.62.0** - Performant forms with easy validation
- **Hookform Resolvers 5.2.1** - Schema validation resolvers for React Hook Form
- **Zod 4.0.14** - TypeScript-first schema validation
- **React Hot Toast 2.5.2** - Toast notifications
- **React Error Boundary 6.0.0** - Error boundary components
- **shadcn/ui** - Minimal component library installation
- **Radix UI primitives** - Accessible component foundation
- **Vite Plugin HTML 3.2.2** - HTML processing with CSP injection

## React Query Architecture
Implement comprehensive data fetching with:
- Dedicated `queryClient.js` file with smart configuration and sensible defaults
- Hierarchical query key factory pattern with domain-driven organization
- Smart retry logic: no retry for 4xx errors, exponential backoff for server errors with configurable attempts
- Sophisticated optimistic updates with proper rollback mechanisms in mutation hooks
- Global error handling setup (currently console logging - ready for toast notifications)
- Real-time capabilities with configurable background refetching intervals
- DevTools integration for development debugging and performance monitoring
- Configurable stale times and cache times based on data volatility patterns
- Query hooks following domain-driven organization pattern for scalable architecture
- Mutation hooks following standardized CRUD patterns with configurable retry logic
- Query key factory pattern for consistent and type-safe key generation
- Direct React Query API usage - no unnecessary abstractions or wrapper utilities
- Network mode configuration for offline/online behavior
- Refetch strategies: window focus, reconnect, mount with configurable options

## Service Layer Pattern
Create centralized API communication with:
- Centralized HTTP client with configurable timeout and CORS configuration
- JWT token management with Bearer token injection and secure cookie storage
- Advanced request/response interceptors with comprehensive error handling and logging
- RESTful service methods following CRUD conventions: get, update, delete patterns
- Comprehensive error handling with structured error objects and status-specific logic
- React Query integration with custom hooks wrapping service calls
- File upload support with progress tracking and FormData transformation
- Authentication utilities: isAuthenticated(), clearAuth(), getCurrentUser(), getToken()
- Automatic auth redirects and multi-field token support
- Minimal data transformation approach preserving API response formats
- Domain-specific service organization by feature/module for separation of concerns
- Configurable retry logic and timeout settings
- Request/response logging for debugging and monitoring
- Request cancellation support for cleanup of ongoing requests
- **Demo Mode Ready**: All API calls can be easily toggled between real endpoints and dummy data
- Cookie-based token storage with user data fetched via API calls for security and freshness

## Demo Mode Architecture
Comprehensive development environment with realistic simulation:
- All authentication endpoints commented out with dummy implementations ready for production
- Any email/password combination works for login (basic validation still applies)
- Realistic API delays (500ms-1200ms) to simulate actual network behavior
- Dummy user data with complete profile information for realistic testing
- Form validation and error handling remain fully functional
- Profile updates and password changes simulate successful API responses
- Loading states, success/error feedback, and UI flows work identically to production
- Easy toggle between demo and production mode via commenting/uncommenting API calls
- Console logging shows demo operations for debugging and development clarity
- Maintains all React Query caching, state management, and data flow patterns

## Enhanced UI Component Patterns
Build reusable components with:
- **RequestStatusDisplay** component for consistent error/success feedback across the application
- **ErrorFallback** component with user-friendly error pages and debug details for development
- **ApiButton** component with integrated loading states and API call handling
- **LoadingSpinner** component for consistent loading indicators
- API response data display instead of simple string messages for better debugging
- Expandable debug details in development mode with JSON formatting
- Consistent error handling with HTTP status codes and structured error objects
- Compact mode support for space-constrained layouts
- Success/error state management with proper loading indicators
- Integration with React Query mutations for real-time status updates
- User-friendly titles with detailed technical information in collapsible sections
- Responsive design with mobile-first approach and accessibility considerations
- Toast notifications with React Hot Toast integration for user feedback

## shadcn/ui Component Architecture
Implement pragmatic UI component strategy with:
- Minimal installation approach with selective component installation from shadcn/ui
- Configuration in components.json with CSS variables enabled and Tailwind CSS integration
- Enhanced component patterns with custom props and extensive sub-components
- Custom component patterns with React Query integration and variant systems
- **React Hook Form integration** with Zod resolvers for performant form handling
- Native HTML forms enhanced with React Hook Form and consistent Tailwind styling patterns
- Pragmatic business-focused approach installing components as needed rather than full design system
- Integration-focused design with React Query, React Router, and auth state
- Standard utility function for className composition
- Layout architecture with collapsible sidebar and responsive grid patterns
- Radix UI primitives as foundation for accessible component building
- Component customization with theme styling and portal rendering for proper z-index
- Component composition patterns for reusable UI elements
- Responsive design patterns with mobile-first approach

## Form Architecture & Validation
Implement performant, type-safe forms with:
- **React Hook Form** as the primary form library for optimal performance and minimal re-renders
- **Zod resolvers** via @hookform/resolvers for seamless schema validation integration
- **Comprehensive validation schemas** in src/lib/validation.js for reusable form validation
- **Error handling** with detailed field-level and form-level error messages
- **Performance optimization** through React Hook Form's subscription-based re-rendering
- **Type safety** with Zod schemas providing runtime validation and TypeScript inference
- **Form patterns**: Login, profile editing, and password change forms with proper validation
- **Integration** with React Query mutations for form submission and state management

## Authentication Patterns
Implement secure authentication with:
- No React Context for auth - use React Query and cookies for state management
- Authentication hooks: useLogin(), useLogout(), useAuthStatus(), useRequireAuth(), useManualLogout()
- **React Hook Form** with Zod validation for login and profile forms with comprehensive error handling
- Simple login flow with email/password form and automatic dashboard redirect
- Centralized route protection with ProtectedRoute and PublicRoute wrapper components
- HTTP client interceptor automatically adds Bearer token from cookies to all requests
- Auth error responses trigger automatic redirect to login page via axios interceptors
- **Demo Mode**: Token refresh and expiration handling ready for implementation
- **Demo Mode**: Role-based access control foundation ready for enhancement
- Client-side authentication validation with React Query state management
- Auth utilities: isAuthenticated(), clearAuth(), getCurrentUser(), getToken()
- Manual logout clears cookies and React Query cache with automatic redirect
- Flexible token storage with multiple field detection for backend compatibility
- Configurable auth redirects and token management
- Auth state persistence across browser sessions via secure cookies
- Custom cookie utility with configurable security flags: Secure, SameSite: strict, path: /
- Cookie configuration: 7-day expiration, HTTPS-only in production, same-site requests only
- Token storage in authToken cookie only - user data fetched via API calls for security
- Cookie-based security: prevents CSRF attacks and man-in-the-middle attacks
- User data retrieved from /auth/me endpoint with React Query caching (or dummy data in demo mode)
- Automatic cookie cleanup on logout with proper expiration handling

## Project Configuration
Set up modern development environment with:
- React SPA with Vite 7.x build tool and ES modules (requires Node.js 20.19.0+)
- Core dependencies: TanStack Query, React Router, Axios, Radix UI primitives, Zod validation
- **Security-first configuration** with CSP headers and security optimizations
- ESLint flat config with React hooks plugin and custom rules
- Git repository with main/development branches and comprehensive gitignore
- Firebase hosting deployment with SPA routing fallback
- shadcn/ui configuration with CSS variables and JSX (no TypeScript)
- VS Code integration with Prettier formatting and auto-imports
- Production build optimization with tree shaking and source maps
- Package.json scripts: dev, build, lint, preview, docs:generate
- **Centralized configuration system** with type-safe environment variable helpers
- Environment variable configuration for API endpoints and backend integration
- Modern development toolchain with hot reload and fast builds
- Component library integration with design system consistency
- Deployment pipeline with automated builds and hosting
- **Error boundary integration** with React Error Boundary for robust error handling
- **Toast notification system** with React Hot Toast for user feedback
- **Vite Plugin HTML** for CSP injection and security headers

## MCP Tool Setup (Optional)
If using Claude/Cursor with MCP:
- MCP configuration file with mcpServers object for project-scoped tools
- MemCP knowledge graph server using mcp-knowledge-graph package with memory.jsonl storage
- Memory storage location in memories/ directory for persistent knowledge graph data
- MCP servers provide extended capabilities beyond built-in Claude Code tools
- Project-scoped servers require user approval for security before activation
- Team collaboration enabled through version-controlled MCP configuration file
- Command line tools for MCP server management and configuration
- MemCP provides memory management tools: create_entities, create_relations, add_observations
- Knowledge graph enables persistent context and architectural documentation storage
- MCP integration extends Claude capabilities with project-specific tools
- Configuration follows MCP (Model Context Protocol) standard for tool integration
- Memory persistence across development sessions and team collaboration

## File Structure
Create the following structure:
```
project-name/
├── src/
│   ├── assets/
│   │   └── react.svg           # React logo asset
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   │   ├── ProtectedRoute.jsx    # Protected route guard
│   │   │   ├── PublicRoute.jsx       # Public route guard
│   │   │   └── index.js              # Barrel exports
│   │   ├── ui/                 # Generic UI components
│   │   │   ├── ApiButton.jsx         # API-aware button (handles loading states)
│   │   │   ├── LoadingSpinner.jsx    # Reusable loading spinner
│   │   │   ├── RequestStatusDisplay.jsx  # Error/success feedback display
│   │   │   ├── dialog.jsx            # shadcn/ui Dialog component
│   │   │   └── tooltip.jsx           # shadcn/ui Tooltip component
│   │   └── Layout.jsx              # Main layout with sidebar
│   ├── hooks/
│   │   └── useAuth.js              # Authentication hooks
│   ├── lib/
│   │   ├── axios.js                # HTTP client with interceptors
│   │   ├── config.js               # Centralized configuration system
│   │   ├── cookies.js              # Cookie utilities
│   │   ├── queryClient.js          # React Query setup
│   │   ├── utils.js                # Helper functions
│   │   └── validation.js           # Zod schemas for form validation
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main dashboard page
│   │   ├── ErrorFallback.jsx       # Error boundary fallback component
│   │   ├── Login.jsx               # Authentication page
│   │   └── UserInfo.jsx            # User profile page
│   ├── services/
│   │   └── authService.js          # Authentication API calls
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles with Tailwind
├── .github/
│   └── workflows/
│       ├── firebase-hosting-merge.yml
│       └── firebase-hosting-pull-request.yml
├── memories/              # MCP knowledge graph storage
│   └── memory.jsonl       # MemCP storage file
├── public/
│   └── vite.svg           # Vite logo
├── components.json        # shadcn/ui configuration
├── eslint.config.js       # ESLint flat configuration
├── index.html             # Main HTML file
├── jsconfig.json          # JavaScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration with security headers
└── package.json           # Dependencies and scripts
```

## Key Implementation Notes
1. **Use direct React imports**: `import { useState, useEffect } from 'react'` (not React.useState)
2. **Cookie-based authentication**: Secure, SameSite: strict, path: /, 7-day expiration
3. **Domain-driven organization**: Group by feature, not by file type
4. **React Query for all server state**: No localStorage, no Context for server data
5. **Pragmatic component approach**: Install shadcn/ui components as needed
6. **Smart error handling**: Structured error objects with status-specific logic
7. **Optimistic updates**: Implement with proper rollback mechanisms
8. **Centralized configuration**: Type-safe environment variable helpers with validation
9. **API-only user data**: Store only auth tokens in cookies, fetch user data via API calls
10. **Debug-friendly components**: Show actual API response data in status displays
11. **Demo Mode First**: Start with dummy data for immediate testing, easy production toggle
12. **No unnecessary abstractions**: Use React Query API directly, avoid wrapper utilities
13. **Node.js compatibility**: Requires Node.js 20.19.0+ for Vite 7.x crypto.hash support
14. **Global error handling**: Auto-initialized with queryClient import with toast notifications
15. **Component separation of concerns**: ApiButton handles loading states, RequestStatusDisplay handles error/success feedback
16. **Security-first approach**: CSP headers, security optimizations, and HTTPS enforcement
17. **Form validation**: React Hook Form with Zod resolvers for performant, type-safe validation
18. **Performance-first forms**: React Hook Form for minimal re-renders and optimal UX
18. **Error boundaries**: React Error Boundary for robust error handling and user-friendly fallbacks
19. **Toast notifications**: React Hot Toast for consistent user feedback across the application

## Implementation Checklist
### Phase 1: Foundation ✅
- [x] Set up Vite project with React template
- [x] Install and configure TanStack Query with queryClient.js
- [x] Set up Axios with interceptors and error handling
- [x] Configure Tailwind CSS v4 with @tailwindcss/vite
- [x] Create basic folder structure following the pattern above
- [x] Verify Node.js 20.19.0+ compatibility

### Phase 2: Authentication ✅
- [x] Implement cookie utility with secure flags
- [x] Create authService with login/logout/isAuthenticated methods (demo mode)
- [x] Build useAuth hooks (useLogin, useLogout, useAuthStatus, useRequireAuth, useManualLogout)
- [x] Set up HTTP interceptor for automatic Bearer token injection
- [x] Create Login page with form validation and redirect logic
- [x] Implement ProtectedRoute and PublicRoute wrappers

### Phase 3: Core Features ✅
- [x] Implement Layout component with collapsible sidebar navigation
- [x] Set up React Router with nested routes and protected routing
- [x] Create domain-specific service modules (authService)
- [x] Build React Query hooks with optimistic updates
- [x] Add comprehensive error handling and loading states
- [x] Set up global error handling foundation

### Phase 4: UI Components ✅
- [x] Configure shadcn/ui with components.json setup
- [x] Create reusable components (ApiButton, LoadingSpinner, RequestStatusDisplay)
- [x] Implement UserInfo page with profile editing and debug capabilities
- [x] Implement responsive design patterns with mobile-first approach
- [x] Add proper accessibility with Radix UI primitives
- [x] Integrate RequestStatusDisplay across all mutation operations
- [x] Create Dashboard page with demo data and template information
- [x] Add ErrorFallback component for error boundary handling
- [x] Install shadcn/ui Dialog and Tooltip components
- [x] Integrate React Hot Toast for user notifications

### Phase 5: Enhanced Features & Security ✅
- [x] Implement comprehensive demo mode with realistic API simulation
- [x] Create detailed README.md with usage instructions
- [x] Set up centralized configuration system with type-safe helpers
- [x] Add development credentials and demo notices
- [x] Document production deployment preparation
- [x] Add Zod validation schemas for forms
- [x] Implement error boundary with React Error Boundary
- [x] Add security headers and CSP configuration
- [x] Integrate toast notification system
- [x] Add comprehensive form validation with error handling

### Phase 6: Production Readiness (Next Steps)
- [ ] Uncomment API calls in authService.js for production
- [ ] Set up real backend API endpoints
- [ ] Configure deployment pipeline (Firebase/Netlify/Vercel)
- [ ] Implement token refresh mechanism
- [ ] Add role-based access control
- [ ] Set up testing suite (Vitest + React Testing Library)
- [ ] Consider TypeScript migration
- [ ] Add performance monitoring and analytics
- [ ] Implement progressive web app features
- [ ] Add advanced form components (react-hook-form integration)
- [ ] Set up continuous integration and automated testing

## Deployment Strategy
Set up GitHub Actions with:
- **Development branch** → Deploy to staging environment
- **Main branch** → Deploy to production environment
- **Pull requests** → Deploy to preview environment
- Firebase Hosting with automatic deployments
- Environment-specific configurations

## Security Considerations
- Secure cookie configuration (HTTPS, SameSite, proper expiration)
- CSRF protection through SameSite: strict
- Bearer token auto-injection via interceptors
- Automatic auth redirects on 401 responses
- No sensitive data in localStorage

## Essential Configuration Files

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          cspContent: process.env.NODE_ENV === 'production' 
            ? `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' ${process.env.VITE_API_BASE_URL || 'https://api.example.com'}; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self';`
            : `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' ws: wss: ${process.env.VITE_API_BASE_URL || 'https://api.example.com'}; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self';`
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  build: {
    rollupOptions: {
      output: {
        sanitizeFileName(name) {
          return name.replace(/[<>:"/\\|?*]/g, '_')
        }
      }
    }
  }
})
```

### components.json (shadcn/ui)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### ESLint Configuration
```javascript
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "tests/**/*"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
]);
```

## Template Status & Lessons Learned

### ✅ Current Status: Production-Ready Foundation
This React SPA template is **fully functional** with demo mode active. All core features are implemented and tested:
- **Authentication system** with secure cookie management and Zod validation
- **Data fetching** with React Query and smart caching
- **Responsive UI** with collapsible sidebar navigation
- **Error handling** with React Error Boundary and toast notifications
- **Security-first configuration** with CSP headers and security optimizations
- **Centralized configuration** with type-safe environment variable helpers
- **Form validation** with comprehensive Zod schemas
- **Demo mode** for immediate testing and development

### 🎯 Key Architectural Decisions Made
1. **Demo Mode First**: Start with dummy data, easy production toggle via commenting/uncommenting
2. **Direct API Usage**: Removed unnecessary abstractions (cacheUtils) - use React Query directly
3. **Cookie-Only Tokens**: Store auth tokens in secure cookies, fetch user data via API
4. **Global Error Handling**: Auto-initialized with toast notifications and error boundaries
5. **Route Protection**: Dedicated auth components with proper separation of concerns
6. **Component Simplicity**: Pragmatic shadcn/ui usage without over-engineering
7. **Security-First**: CSP headers, security optimizations, and HTTPS enforcement
8. **Centralized Configuration**: Type-safe environment helpers with validation
9. **Form Validation**: React Hook Form with Zod resolvers for performant client-side validation
10. **Error Boundaries**: React Error Boundary for robust error handling

### 🚀 Quick Start for New Projects
1. **Copy this template**
2. **Run `npm install && npm run dev`** (requires Node.js 20.19.0+)
3. **Test with demo credentials** (any email/password works)
4. **Customize for your needs**:
   - Update `src/services/authService.js` for real API
   - Add your pages in `src/pages/`
   - Install shadcn/ui components as needed
   - Configure your API endpoints in `.env`

### 🔧 Common Customizations
- **Add toast notifications**: Enhance global error handler in `queryClient.js`
- **Role-based access**: Extend authentication system with permissions
- **Dark mode**: Add theme provider and toggle component
- **Forms**: Integrate react-hook-form with shadcn/ui form components
- **Testing**: Add Vitest + React Testing Library setup

### 🎓 Template Learning Value
This template demonstrates **production patterns** without over-engineering:
- Clean architecture with logical separation of concerns
- Modern React patterns (hooks, React Query, functional components)
- Security best practices (secure cookies, CSRF protection, auth redirects)
- Developer experience optimizations (debug panels, demo mode, error handling)
- Performance considerations (code splitting, optimistic updates, smart caching)

This architecture provides a robust, scalable foundation for modern React applications with excellent developer experience and production-ready patterns. The implementation checklist ensures you don't miss any critical components, and the configuration files give you working starting points. 