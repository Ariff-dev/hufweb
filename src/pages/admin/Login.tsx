import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../context/AuthContext'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const login = useAuthStore((s) => s.login)

    const handleLogin = async (formData: FormData) => {
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        setLoading(true)
        setError('')
        try {
            await login(email, password)
            navigate('/admin')
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-card-bg border border-card-border p-8 rounded-xl w-full max-w-sm">
                <h1 className="text-2xl font-display font-bold mb-6 text-center">Admin Login</h1>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form action={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="p-3 rounded bg-surface border border-card-border"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="p-3 rounded bg-surface border border-card-border"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary-light text-text font-semibold py-3 rounded hover:opacity-90 transition-opacity"
                    >
                        {loading ? 'Cargando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
