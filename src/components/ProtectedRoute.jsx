import { Navigate, Outlet } from 'react-router-dom'
import { getRole, isAuthed } from '../lib/auth'

export default function ProtectedRoute({ role }) {
  const authed = isAuthed()
  const current = getRole()

  if (!authed) {
    return <Navigate to={role === 'admin' ? '/admin' : '/signin'} replace />
  }

  if (role && current !== role) {
    // If wrong role, bounce them to their correct dashboard
    return <Navigate to={current === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />
  }

  return <Outlet />
}
