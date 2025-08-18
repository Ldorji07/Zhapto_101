# HR Platform Auth UI (React + Vite + Tailwind)

This is a responsive frontend implementing Sign Up, Sign In, and Admin Login screens inspired by your design, plus role-based routing to user and admin dashboards.

## Stack
- React 18 + Vite
- TailwindCSS
- React Router v6
- Framer Motion
- Lucide React icons

## Quickstart
```bash
npm install
npm run dev
```

### Build
```bash
npm run build && npm run preview
```

### Auth (Demo Only)
Authentication here is **front-end only** for demo purposes.
- Signing in from **/signin** stores `role=user` in `localStorage` and redirects to `/dashboard`.
- Admin login from **/admin** stores `role=admin` and goes to `/admin/dashboard`.
- `ProtectedRoute` component guards role-specific pages.

Replace this with your real backend integration later.
