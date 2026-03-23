import { useState } from 'react'
// @ts-ignore
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)
        if (!error) {
            navigate('/admin')
        } else {
            alert(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-card-bg border border-card-border p-8 rounded-xl w-full max-w-sm">
                <h1 className="text-2xl font-display font-bold mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 rounded bg-surface border border-card-border"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
