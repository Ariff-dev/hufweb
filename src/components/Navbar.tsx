import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Home, Music, Users, Sun, Moon, X, Menu } from 'lucide-react'

/* ── Nav items ────────────────────────────────── */
const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/artistas', icon: Users, label: 'Artistas' },
    { to: '/canciones', icon: Music, label: 'Canciones' },
]

/* ── Component ────────────────────────────────── */
export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [dark, setDark] = useState(() => {
        if (typeof window === 'undefined') return false
        return localStorage.getItem('huf-theme') === 'dark'
    })

    /* Toggle dark class on <html> */
    useEffect(() => {
        const root = document.documentElement
        if (dark) {
            root.classList.add('dark')
            localStorage.setItem('huf-theme', 'dark')
        } else {
            root.classList.remove('dark')
            localStorage.setItem('huf-theme', 'light')
        }
    }, [dark])

    /* Lock body scroll when drawer is open */
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [drawerOpen])

    return (
        <>
            {/* ─── DESKTOP SIDEBAR (right, fixed) ────── */}
            <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1 py-4 px-2 rounded-3xl bg-card-bg backdrop-blur-xl border border-card-border shadow-lg">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `group relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300
                             ${isActive
                                ? 'bg-complementary/20 text-complementary'
                                : 'text-text-muted hover:text-complementary hover:bg-complementary/10'
                            }`
                        }
                    >
                        <Icon size={20} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-surface-alt text-text text-xs font-medium whitespace-nowrap
                                         opacity-0 -translate-x-2 pointer-events-none
                                         group-hover:opacity-100 group-hover:translate-x-0
                                         transition-all duration-200">
                            {label}
                        </span>
                    </NavLink>
                ))}

                {/* Divider */}
                <div className="w-6 h-px bg-card-border my-2" />

                {/* Dark/light toggle */}
                <button
                    onClick={() => setDark(!dark)}
                    className="flex items-center justify-center w-11 h-11 rounded-xl text-text-muted hover:text-primary-light hover:bg-primary-light/10 transition-all duration-300"
                    aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                    {dark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </nav>

            {/* ─── MOBILE TOP BAR ────────────────────── */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <NavLink to="/" className="font-display font-900 text-xl gradient-text">
                    HUF
                </NavLink>

                {/* Right: toggle + hamburger */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDark(!dark)}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-card-bg backdrop-blur-xl border border-card-border text-text-muted hover:text-primary-light transition-colors"
                        aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
                    >
                        {dark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-card-bg backdrop-blur-xl border border-card-border text-text-muted hover:text-complementary transition-colors"
                        aria-label="Abrir menú"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </div>

            {/* ─── MOBILE DRAWER ─────────────────────── */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setDrawerOpen(false)}
                            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="lg:hidden fixed right-0 top-0 bottom-0 z-50 w-72 bg-primary border-l border-card-border shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-card-border">
                                <span className="text-complementary font-medium tracking-[0.2em] uppercase text-xs">Menú</span>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center justify-center w-9 h-9 rounded-xl text-text-muted hover:text-text hover:bg-card-bg transition-colors"
                                    aria-label="Cerrar menú"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav className="flex-1 px-4 py-6 space-y-1">
                                {navItems.map(({ to, icon: Icon, label }, i) => (
                                    <motion.div
                                        key={to}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    >
                                        <NavLink
                                            to={to}
                                            onClick={() => setDrawerOpen(false)}
                                            className={({ isActive }) =>
                                                `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200
                                                 ${isActive
                                                    ? 'bg-complementary/15 text-complementary font-semibold'
                                                    : 'text-text-muted hover:text-text hover:bg-card-bg'
                                                }`
                                            }
                                        >
                                            <Icon size={20} />
                                            <span className="text-sm">{label}</span>
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Footer */}
                            <div className="px-6 py-5 border-t border-card-border">
                                <div className="flex items-center gap-3">
                                    <span className="font-display font-900 text-lg gradient-text">HUF</span>
                                    <span className="text-text-muted text-xs">Hazte un favor</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
