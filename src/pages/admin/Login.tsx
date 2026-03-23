import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../context/AuthContext'
import { Lock } from 'lucide-react'

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
        <main className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
            {/* Floating orbs — same style as HomePage hero */}
            <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-complementary/15 dark:bg-complementary/10 blur-3xl animate-float pointer-events-none" />
            <div className="absolute bottom-32 right-[15%] w-96 h-96 rounded-full bg-primary-light/10 dark:bg-primary-light/8 blur-3xl animate-float-delayed pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-complementary-light/8 dark:bg-complementary-light/5 blur-[120px] animate-pulse-glow pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass-card p-10 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-complementary/15 mb-5"
                        >
                            <Lock size={26} className="text-complementary" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-3"
                        >
                            Panel de administración
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="font-display font-800 text-3xl sm:text-4xl leading-tight"
                        >
                            <span className="gradient-text">Iniciar</span>{' '}
                            <span className="text-text">sesión</span>
                        </motion.h1>
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        action={handleLogin}
                        className="flex flex-col gap-5"
                    >
                        <div>
                            <label className="text-text-muted text-xs font-medium tracking-wide uppercase mb-2 block">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder=""
                                className="w-full p-4 rounded-xl bg-surface/60 border border-card-border text-text placeholder:text-text-muted/50 
                                    focus:outline-none focus:border-complementary/50 focus:ring-2 focus:ring-complementary/15 
                                    transition-all duration-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-text-muted text-xs font-medium tracking-wide uppercase mb-2 block">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full p-4 rounded-xl bg-surface/60 border border-card-border text-text placeholder:text-text-muted/50 
                                    focus:outline-none focus:border-complementary/50 focus:ring-2 focus:ring-complementary/15 
                                    transition-all duration-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-complementary text-white font-semibold text-base
                                hover:bg-complementary-light transition-all duration-300 hover:shadow-lg hover:shadow-complementary/25 hover:-translate-y-0.5
                                disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            {loading ? 'Cargando...' : 'Entrar'}
                        </button>
                    </motion.form>
                </div>

                {/* Decorative blobs behind the card */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-light/20 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-complementary/15 blur-2xl pointer-events-none" />
            </motion.div>
        </main>
    )
}
