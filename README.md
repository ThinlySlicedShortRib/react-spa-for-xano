# React SPA for Xano

A modern React Single Page Application template designed specifically for **Xano backends**. Features production-ready authentication, data fetching, and UI components with seamless Xano integration.

## 🎯 What This Template Is For

This template is optimized for building **internal applications** and **admin dashboards** where:

- **Developer velocity matters** - Ship features quickly with pre-built auth, API integration, and UI components
- **Quality is paramount** - Production-ready patterns, error handling, and TypeScript throughout
- **Xano is your backend** - First-class integration with Xano's authentication and API patterns
- **Battle-tested libraries** - Get instant access to shadcn/ui components, Zod validation, TanStack Query, and other proven React ecosystem tools
- **Fully customizable design** - Tailwind CSS v4 and shadcn/ui components that you own and can modify to match any brand or design system
- **Fine-tuned UX** - Optimistic updates, loading states, error boundaries, and smooth transitions create a polished user experience
- **SEO is not a concern** - Perfect for authenticated apps, internal tools, and B2B dashboards

### Ideal Use Cases:
- 🏢 **Internal company tools** - Employee portals, admin panels, workflow management
- 📊 **Data dashboards** - Analytics, reporting, and monitoring applications
- 🔧 **B2B SaaS applications** - Customer portals, multi-tenant platforms
- 🚀 **MVP development** - Rapidly prototype and validate ideas with production-quality code
- 📋 **Operations dashboards** - Inventory management, order processing, logistics tracking
- 👥 **HR applications** - Recruitment pipelines, performance reviews, time tracking
- 💰 **Financial tools** - Expense management, budgeting apps, invoice processing
- 🎯 **CRM systems** - Customer relationship management, lead tracking, sales pipelines
- 📈 **Business intelligence** - KPI dashboards, data visualization, executive reporting
- 🔐 **Admin consoles** - User management, system configuration, audit logs
- 🏥 **Healthcare management** - Patient portals, appointment scheduling, medical records
- 🎓 **Education platforms** - Learning management systems, student portals, grading tools
- 🤖 **AI-powered tools** - Prompt management interfaces, model training dashboards, AI agent monitoring
- 🧠 **ML operations** - Dataset management, experiment tracking, model performance analytics
- 💬 **Chatbot interfaces** - Custom ChatGPT wrappers, conversational AI dashboards, chat analytics
- 🎨 **AI content tools** - Image generation interfaces, content moderation dashboards, AI writing assistants

### Not Recommended For:
- 🌐 Public-facing websites requiring SEO
- 📱 Mobile-first consumer applications
- 🛍️ E-commerce storefronts
- 📰 Content-heavy marketing sites

## 🚀 Features

### Xano Integration

- **REST API Ready** - HTTP client configured for Xano endpoints
- **Bearer Token Auth** - Automatic JWT token management for Xano auth
- **Realtime Sync** - TanStack Query caching works perfectly with Xano's real-time features
- **Error Handling** - Structured error handling for Xano's HTTP responses

### Authentication & Security

- **Secure Cookie Storage** - JWT tokens in HttpOnly cookies with CSRF protection
- **Route Protection** - Public and protected route guards with auto-redirects
- **Demo Mode** - Complete auth flow with dummy data for immediate testing

### Modern Stack

- **React 19** with **Vite 7** - Latest performance and developer experience
- **TanStack Query** - Smart caching and background sync perfect for Xano
- **shadcn/ui + Tailwind CSS v4** - Beautiful, accessible components
- **React Hook Form + Zod** - Type-safe forms with validation
- **Error Boundaries** - Graceful error handling with user feedback

## 🛠️ Tech Stack

- **React 19.1.0** + **Vite 7.0.4**
- **TanStack Query 5.84.1** - Data fetching and caching
- **React Router 7.7.1** - Client-side routing
- **Tailwind CSS v4.1.11** - Styling
- **React Hook Form 7.62.0** + **Zod 4.0.14** - Forms and validation
- **Axios 1.11.0** - HTTP client optimized for Xano
- **shadcn/ui** - Component library

## 📋 Quick Start

### Prerequisites

- Node.js 20.19.0+
- Xano workspace with authentication enabled

### Installation

```bash
# Clone and install
git clone https://github.com/ThinlySlicedShortRib/react-spa-for-xano.git
cd react-spa-for-xano
npm install

# Configure Xano endpoint
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL to your Xano API endpoint

# Start development
npm run dev
```

### Demo Mode Testing

Visit `http://localhost:5173` and login with:

- **Email**: `user@test.com`
- **Password**: `123456`

Or use any email/password combination - demo mode accepts all credentials.

## 🔧 Xano Configuration

### 1. Environment Setup

```bash
# .env
VITE_API_BASE_URL=https://your-xano-instance.com/api/v1
VITE_API_TIMEOUT=10000  # Optional: API timeout in milliseconds
VITE_ENABLE_DEBUG=true  # Optional: Enable debug logging
```

### 2. Connect to Your Xano Backend

Edit `src/services/authService.js` and uncomment the API calls:

```javascript
// Replace demo mode with real Xano calls
export async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  const { authToken, user } = response.data;

  setCookie("authToken", authToken);
  return { token: authToken, user };
}
```

### 3. Expected Xano Endpoints

Configure these endpoints in your Xano workspace:

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user data
- `PATCH /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/                 # Route protection
│   └── ui/                   # Reusable components
├── hooks/
│   └── useAuth.js           # Authentication hooks
├── lib/
│   ├── axios.js             # HTTP client for Xano
│   ├── config.js            # Environment configuration with env helpers
│   ├── queryClient.js       # TanStack Query setup
│   └── validation.js        # Zod schemas
├── pages/
│   ├── Dashboard.jsx        # Main dashboard
│   ├── Login.jsx           # Authentication
│   └── UserInfo.jsx        # User profile
└── services/
    └── authService.js       # Xano API integration
```

## 🔄 Data Fetching with Xano

The template uses TanStack Query for optimal Xano integration:

```javascript
// Example: Fetch user data from Xano
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(), // Calls Xano /auth/me
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

// Example: Update user profile in Xano
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile, // Calls Xano PATCH /auth/profile
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
}
```

## 🏗️ Service & Hook Pattern Architecture

This template follows a clean separation of concerns using the **Service Layer Pattern** combined with **Custom React Hooks**. This architecture provides maintainable, testable, and reusable code structure.

### Service Layer Pattern

The service layer acts as an abstraction between your React components and external APIs (Xano). Services handle all API communication, data transformation, and business logic.

#### Service Structure (`src/services/`)

```javascript
// src/services/authService.js
import { api } from "../lib/axios";

export const authService = {
  // Login user
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.post("/auth/me");
    return response.data;
  },

  // Update user profile
  async updateProfile(userData) {
    const response = await api.patch("/auth/profile", userData);
    return response.data;
  },

  // Logout user
  async logout() {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
```

#### Benefits of Service Layer

- **Separation of Concerns**: API logic is isolated from UI components
- **Reusability**: Services can be used across different components
- **Testability**: Easy to mock services for unit testing
- **Maintainability**: API changes only require service updates
- **Type Safety**: Can be easily extended with TypeScript

### Custom Hook Pattern

Custom hooks encapsulate React Query logic and provide a clean interface for components to interact with data and mutations.

#### Hook Structure (`src/hooks/`)

```javascript
// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

export function useAuth() {
  const queryClient = useQueryClient();

  // Query hook for current user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: authService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Mutation hook for login
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Update cache and redirect
      queryClient.setQueryData(["user"], data.user);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      // Handle login errors
      console.error("Login failed:", error);
    },
  });

  // Mutation hook for logout
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear cache and redirect
      queryClient.clear();
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
```

#### Benefits of Custom Hooks

- **Clean Component Logic**: Components focus on UI, not data fetching
- **Reusable Logic**: Hooks can be shared across multiple components
- **Automatic Caching**: TanStack Query handles caching, background updates
- **Error Handling**: Centralized error handling and loading states
- **Optimistic Updates**: Easy to implement optimistic UI updates

### Complete Pattern Example

Here's how the service and hook patterns work together:

```javascript
// 1. Service handles API communication
// src/services/userService.js
export const userService = {
  async fetchUsers() {
    const response = await api.get("/users");
    return response.data;
  },

  async createUser(userData) {
    const response = await api.post("/users", userData);
    return response.data;
  },
};

// 2. Hook encapsulates React Query logic
// src/hooks/useUsers.js
export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: (newUser) => {
      // Optimistically update cache
      queryClient.setQueryData(["users"], (oldUsers) => [...oldUsers, newUser]);
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
  };
}

// 3. Component uses the hook
// src/components/UserList.jsx
export function UserList() {
  const { users, isLoading, createUser, isCreating } = useUsers();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <CreateUserForm onSubmit={createUser} isSubmitting={isCreating} />
    </div>
  );
}
```

### Best Practices

1. **Service Functions**: Keep them pure and focused on API communication
2. **Hook Naming**: Use descriptive names like `useUsers`, `useUserProfile`
3. **Query Keys**: Use consistent, hierarchical query keys for proper cache management
4. **Error Handling**: Implement proper error boundaries and user feedback
5. **Loading States**: Always provide loading indicators for better UX
6. **Cache Invalidation**: Strategically invalidate related queries after mutations
7. **Optimistic Updates**: Use `setQueryData` for immediate UI feedback

### Extending the Pattern

To add new features:

1. **Create Service**: Add methods to existing services or create new ones
2. **Create Hook**: Build custom hooks that use the service methods
3. **Use in Components**: Import and use the hooks in your React components
4. **Update Cache**: Handle cache invalidation and optimistic updates

This pattern scales well as your application grows and makes it easy to maintain clean, testable code while providing excellent developer and user experience.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Hosting

Deploy the `dist/` folder to:

- **Vercel** (recommended)
- **Netlify**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

### Production Checklist

1. ✅ Set production `VITE_API_BASE_URL` in deployment environment
2. ✅ Uncomment real API calls in `authService.js`
3. ✅ Configure Xano CORS settings for your domain
4. ✅ Test authentication flow end-to-end

## 📱 Features Included

- **Dashboard** - Overview page with user stats
- **Authentication** - Login/logout with session management
- **User Profile** - Edit profile information
- **Form Validation** - Real-time validation with error handling
- **Toast Notifications** - User feedback for all actions
- **Error Boundaries** - Graceful error handling
- **Loading States** - Skeleton loaders and spinners
- **Responsive Design** - Mobile-first approach

## 🛠️ Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build locally
npm run lint         # Code linting
```

## 🔒 Security Features

- **Route protection** with automatic redirects
- **Auto token cleanup** on authentication errors
- **Secure authentication flow** with proper token management

## 🎨 Customization

### Add New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Create Xano service calls if needed

### Extend Authentication

1. Add new methods to `authService.js`
2. Create corresponding React Query hooks
3. Update Xano authentication endpoints

### Style Customization

- Use CSS configuration with `@config` directive for design tokens
- Add global styles in `src/index.css`
- Install additional shadcn/ui components: `npx shadcn-ui@latest add button`

#### Adding New shadcn/ui Components

When installing new shadcn/ui components, you'll need to update import paths and ensure proper theme integration:

1. **Install the component**:

   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add dialog
   ```

2. **Update import paths** - shadcn components are installed to `src/components/ui/`:

   ```javascript
   // ✅ Correct import path
   import { Button } from "@/components/ui/button";
   import { Card, CardContent, CardHeader } from "@/components/ui/card";

   // ❌ Incorrect import path (don't use relative paths)
   import { Button } from "../components/ui/button";
   ```

3. **Ensure theme integration** - Components automatically use your Tailwind theme:

   ```javascript
   // The Button component will automatically use your theme colors
   <Button variant="default" className="bg-primary text-primary-foreground">
     Click me
   </Button>
   ```

4. **Customize component variants** using CSS configuration:

   ```css
   /* src/index.css */
   @import "tailwindcss";

   @config {
     theme: {
       colors: {
         primary: hsl(var(--primary));
         primary-foreground: hsl(var(--primary-foreground));
         /* Add more custom colors as needed */
       }
     }
   }
   ```

5. **Global CSS variables** - shadcn components use CSS variables for theming:

   ```css
   /* src/index.css */
   :root {
     --background: 0 0% 100%;
     --foreground: 222.2 84% 4.9%;
     --primary: 222.2 47.4% 11.2%;
     --primary-foreground: 210 40% 98%;
     /* Add more CSS variables for custom theming */
   }

   .dark {
     --background: 222.2 84% 4.9%;
     --foreground: 210 40% 98%;
     --primary: 210 40% 98%;
     --primary-foreground: 222.2 47.4% 11.2%;
   }
   ```

**Note**: The `@/` alias in import paths is configured in your `jsconfig.json` to point to the `src/` directory, making imports clean and consistent across your project.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📚 Resources

- [Xano Documentation](https://docs.xano.com)
- [TanStack Query Guide](https://tanstack.com/query)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)

---

**Ready to build amazing apps with React + Xano** 🚀
