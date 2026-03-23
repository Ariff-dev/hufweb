import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../context/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuthStore()

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-semibold">Cargando sesión...</div>
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute