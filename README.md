# React SPA Template

A modern, production-ready React Single Page Application template with authentication, state management, and best practices built-in.

## 🚀 Features

- **React 19** with modern hooks and patterns
- **Vite 7.0.4** for fast development and optimized builds with security enhancements
- **TanStack Query 5.84.1** for powerful data fetching and caching
- **React Router DOM 7.7.1** for client-side routing
- **Tailwind CSS v4.1.11** for utility-first styling
- **React Hook Form 7.62.0** with Zod validation for performant forms
- **Centralized configuration** with type-safe environment variable helpers
- **Axios 1.11.0** with request/response interceptors and error handling
- **Cookie-based authentication** with secure configuration
- **Error boundaries** with React Error Boundary for robust error handling
- **Toast notifications** with React Hot Toast for user feedback
- **Security-first approach** with CSP headers and security optimizations
- **Development debugging** with conditional debug panels
- **Component library ready** with shadcn/ui integration
- **TypeScript-ready** architecture (currently JavaScript)
- **ESLint** with React-specific rules and flat configuration
- **Production deployment** configurations

## 📋 Prerequisites

- **Node.js 20.19.0+** (required for Vite 7.x crypto.hash support)
- npm or yarn
- Git

## 🛠️ Quick Start

1. **Clone or use this template**
   ```bash
   git clone <repository-url>
   cd react-spa-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API endpoint
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   │   ├── ProtectedRoute.jsx   # Protected route guard
│   │   ├── PublicRoute.jsx      # Public route guard
│   │   └── index.js             # Barrel exports
│   ├── ui/              # Generic UI components
│   │   ├── ApiButton.jsx        # API-aware button (handles loading states)
│   │   ├── LoadingSpinner.jsx   # Reusable loading spinner
│   │   └── RequestStatusDisplay.jsx  # Error/success feedback display
│   └── Layout.jsx       # Main layout with sidebar
├── hooks/               # Custom React hooks
│   └── useAuth.js       # Authentication hooks
├── lib/                 # Utility libraries
│   ├── axios.js         # HTTP client with interceptors and error handling
│   ├── config.js        # Centralized configuration with env helpers
│   ├── cookies.js       # Cookie utilities with secure defaults
│   ├── queryClient.js   # React Query setup
│   ├── utils.js         # Helper functions
│   └── validation.js    # Zod schemas for form validation
├── pages/               # Page components
│   ├── Dashboard.jsx    # Main dashboard
│   ├── ErrorFallback.jsx # Error boundary fallback component
│   ├── Login.jsx        # Authentication page with React Hook Form
│   └── UserInfo.jsx     # User profile page with React Hook Form
├── services/            # API service layer
│   └── authService.js   # Authentication API calls
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🔧 Configuration

### Environment Variables

The template uses a centralized configuration system with type-safe environment variable helpers. Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000

# Application Settings
VITE_APP_NAME="My React App"
VITE_APP_VERSION=1.0.0

# Authentication & Security
VITE_TOKEN_EXPIRES_IN=60
VITE_COOKIE_SECURE=false
VITE_COOKIE_SAME_SITE=lax
VITE_STORAGE_PREFIX=spa_template_

# Feature Flags
VITE_ENABLE_DEVTOOLS=true
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
VITE_USE_MOCK_API=false

# UI Settings
VITE_TOAST_DURATION=4000
VITE_LOADING_DELAY=200

# External Services
VITE_SENTRY_DSN=
VITE_GA_TRACKING_ID=
VITE_UPLOAD_MAX_SIZE=10485760
VITE_UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,application/pdf

# Social Auth (Optional)
VITE_GOOGLE_CLIENT_ID=
VITE_GITHUB_CLIENT_ID=

# Production Settings
VITE_FORCE_HTTPS=false
VITE_CDN_URL=
VITE_CSP_ENABLED=false
```

**Note**: Only variables prefixed with `VITE_` are exposed to the browser for security reasons.

### Configuration System

The `src/lib/config.js` file provides:
- **Type-safe helpers**: `getEnv()`, `getBooleanEnv()`, `getNumberEnv()`
- **Centralized defaults**: Fallback values for all settings
- **Validation**: Required environment variables are checked on startup
- **Debug logging**: Configuration values logged in development mode
- **Comprehensive settings**: API, auth, features, UI, services, and production configs

Access configuration values consistently across your app:
```javascript
import { config } from './lib/config'

// Use centralized config instead of direct env access
if (config.isDevelopment) {
  console.log('Debug info:', config.api.baseUrl)
}

// Access nested configuration
if (config.features.devtools) {
  // Enable development tools
}
```

### API Integration

The template expects a backend API with these endpoints:

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout  
- `GET /auth/me` - Get current user
- `PATCH /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password

### Authentication

The template uses cookie-based authentication with:
- Secure, HttpOnly cookies (production)
- SameSite: strict for CSRF protection
- Automatic token injection in API calls
- Auth redirects on 401 responses

## 🎨 Styling & Forms

### Tailwind CSS

The template uses Tailwind CSS v4.1.11 with:
- Custom color scheme
- Responsive design patterns
- Dark mode ready (not implemented)
- Component-friendly utilities
- Security-focused configuration

### React Hook Form + Zod Validation

The template uses React Hook Form for optimal form performance:
- **Minimal re-renders** through subscription-based updates
- **Zod validation** via @hookform/resolvers for type-safe schemas
- **Comprehensive validation** in `src/lib/validation.js`
- **Form patterns**: Login, profile editing, password changes
- **Error handling**: Field-level and form-level error messages

### Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

Components will be added to `src/components/ui/`

## 🔍 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

The template includes:
- ESLint with React hooks rules
- Prettier-ready configuration
- Import organization
- Consistent code formatting

### Debugging & Development Features

The template includes comprehensive debugging tools that are only active in development:

- **React Query DevTools** - Visual query inspector and cache browser
- **API request/response logging** - Automatic console logging for HTTP calls
- **Error boundaries** - User-friendly error pages with detailed stack traces using React Error Boundary
- **Debug panels** - Expandable debug sections in components showing API data
- **Configuration logging** - Startup logs showing current environment settings
- **Form debugging** - React Hook Form DevTools integration for form state inspection
- **Toast notifications** - Development-friendly error and success messages

All debug features are controlled by `config.isDevelopment` and automatically hidden in production builds.

## 🚀 Deployment

### Build

```bash
npm run build
```

### Static Hosting

The build output in `dist/` can be deployed to:
- Netlify
- Vercel  
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

### Environment Configuration

For production, set:
- `VITE_API_BASE_URL` to your production API
- Configure secure cookie settings
- Enable HTTPS for secure cookies

## 🔐 Security Features

- **Secure cookies** with environment-aware flags (secure in production)
- **CSRF protection** via SameSite: strict configuration
- **Content Security Policy (CSP)** headers with environment-specific rules
- **Security headers** - X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Automatic auth redirects** on 401 unauthorized responses
- **JWT token injection** via Axios interceptors
- **No sensitive data in localStorage** - all auth data in secure cookies
- **Request/response logging** (development only) - no sensitive data leaks in production
- **Environment variable isolation** - only `VITE_` prefixed vars exported to browser
- **Centralized error handling** with user-friendly messages and debug details (dev only)
- **Filename sanitization** in production builds to prevent code injection
- **Production optimizations** with security-focused build configuration

## 🧪 Testing

Testing setup is not included but can be added with:
- Vitest for unit tests
- React Testing Library for component tests
- Cypress or Playwright for E2E tests

## 📦 Adding Features

### New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Layout.jsx`

### New API Services

1. Create service in `src/services/`
2. Add React Query hooks in `src/hooks/`
3. Update query keys in `src/lib/queryClient.js`

### New Components

1. Create in `src/components/` (or `src/components/ui/` for generic components)
2. Follow existing patterns - one main component per file
3. Import from `components/ui/` for generic components: `ApiButton` (loading states), `RequestStatusDisplay` (error/success), `LoadingSpinner`
4. For forms, use React Hook Form with Zod validation from `src/lib/validation.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This template is available under the MIT License.

## 🆘 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include error messages and steps to reproduce

## 🔄 Updates

This template includes:
- **React Hook Form** integration with Zod validation
- **Security-first configuration** with CSP headers
- **Centralized configuration** system with type-safe helpers
- **Error boundary** integration with user-friendly fallbacks
- **Toast notifications** for consistent user feedback

Future updates will include:
- TypeScript migration guide
- Testing setup with Vitest + React Testing Library
- CI/CD configurations
- Additional component examples
- Performance optimizations
- Progressive Web App features

---

**Happy coding!** 🎉

This template provides a solid foundation for modern React SPAs. Customize it to match your specific requirements and design system.
