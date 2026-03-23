import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../context/AuthContext'
import { Music, Users, LogOut } from 'lucide-react'

const shortcuts = [
    {
        to: '/admin/artistas',
        icon: Users,
        title: 'Artistas',
        desc: 'Gestiona los artistas del catálogo',
        color: 'complementary',
    },
    {
        to: '/admin/canciones',
        icon: Music,
        title: 'Canciones',
        desc: 'Gestiona las canciones y catálogos',
        color: 'primary-light',
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
}

export default function Dashboard() {
    const { logout } = useAuthStore()

    return (
        <main className="relative min-h-screen px-8 md:px-16 lg:px-24 py-16 overflow-hidden">
            {/* Floating orbs */}
            <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-complementary/15 dark:bg-complementary/10 blur-3xl animate-float pointer-events-none" />
            <div className="absolute bottom-32 right-[15%] w-96 h-96 rounded-full bg-primary-light/10 dark:bg-primary-light/8 blur-3xl animate-float-delayed pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-3"
                        >
                            Panel de administración
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display font-800 text-4xl sm:text-5xl leading-tight"
                        >
                            <span className="gradient-text">Dashboard</span>
                        </motion.h1>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onClick={() => logout()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-card-border text-text-muted font-semibold text-sm
                            hover:border-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <LogOut size={16} />
                        Cerrar sesión
                    </motion.button>
                </div>

                {/* Shortcut Cards */}
                <div className="grid sm:grid-cols-2 gap-8">
                    {shortcuts.map((item, i) => (
                        <motion.div
                            key={item.to}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                        >
                            <Link
                                to={item.to}
                                className="glass-card p-8 md:p-10 block group relative overflow-hidden"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-${item.color}/15 flex items-center justify-center mb-5 
                                    group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={24} className={`text-${item.color}`} />
                                </div>

                                <h2 className="font-display font-700 text-2xl text-text mb-2 group-hover:text-complementary transition-colors duration-300">
                                    {item.title}
                                </h2>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {item.desc}
                                </p>

                                {/* Hover glow */}
                                <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-${item.color}/10 blur-2xl 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
