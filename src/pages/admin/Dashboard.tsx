import { useAuthStore } from '../../context/AuthContext'

export default function Dashboard() {
    const { user, logout } = useAuthStore()

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display font-bold">Dashboard Admin</h1>
                <button 
                    onClick={() => logout()}
                    className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600"
                >
                    Cerrar Sesión
                </button>
            </div>
            <p className="text-text-muted">
                Bienvenido al panel de administración de HUF.
                {user?.email && <span className="ml-1 font-medium">({user.email})</span>}
            </p>
        </div>
    )
}
