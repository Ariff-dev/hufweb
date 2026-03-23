import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Search } from 'lucide-react'
// @ts-ignore
import { supabase } from '../../lib/supabase'
import CardSong from '../../components/CardSong'

interface Artista {
    id: number
    nombre: string
}

interface Cancion {
    id: number
    nombre: string
    descripcion_corta: string | null
    foto_url: string | null
    url_spotify: string | null
    url_youtube: string | null
    url_tiktok: string | null
    artistas?: Artista | null
}

export default function SongsPage() {
    const [canciones, setCanciones] = useState<Cancion[]>([])
    const [artistas, setArtistas] = useState<Artista[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [artistaFiltro, setArtistaFiltro] = useState<number | null>(null)

    useEffect(() => {
        const fetchAll = async () => {
            const [{ data: songs }, { data: acts }] = await Promise.all([
                supabase
                    .from('canciones')
                    .select('*, artistas(id, nombre)')
                    .order('nombre', { ascending: true }),
                supabase
                    .from('artistas')
                    .select('id, nombre')
                    .order('nombre', { ascending: true }),
            ])
            if (songs) setCanciones(songs)
            if (acts) setArtistas(acts)
            setLoading(false)
        }
        fetchAll()
    }, [])

    const filtered = canciones.filter((c) => {
        const matchSearch =
            c.nombre.toLowerCase().includes(search.toLowerCase()) ||
            (c.artistas?.nombre ?? '').toLowerCase().includes(search.toLowerCase())
        const matchArtist = artistaFiltro === null || c.artistas?.id === artistaFiltro
        return matchSearch && matchArtist
    })

    return (
        <main className="relative overflow-x-hidden">
            {/* ── HERO / HEADER ─────────────────────── */}
            <section className="relative px-8 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden">
                {/* Orbs */}
                <div className="absolute top-16 right-[8%] w-80 h-80 rounded-full bg-primary-light/15 dark:bg-primary-light/10 blur-3xl animate-float pointer-events-none" />
                <div className="absolute bottom-0 left-[10%] w-96 h-96 rounded-full bg-complementary/10 dark:bg-complementary/8 blur-3xl animate-float-delayed pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary-light/5 blur-[140px] animate-pulse-glow pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-complementary font-medium tracking-[0.3em] uppercase text-sm mb-6"
                    >
                        Escucha
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.12 }}
                        className="font-display font-900 text-6xl sm:text-7xl md:text-8xl leading-none tracking-tight mb-8"
                    >
                        <span className="gradient-text">Canciones</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.28 }}
                        className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Cada canción aquí tiene una razón para estar. No están porque sean famosas, están porque me movieron algo.
                    </motion.p>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.42 }}
                        className="relative max-w-md mx-auto"
                    >
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50" />
                        <input
                            type="text"
                            placeholder="Buscar canción o artista..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 rounded-full bg-surface/60 border border-card-border text-text placeholder:text-text-muted/50
                                focus:outline-none focus:border-complementary/50 focus:ring-2 focus:ring-complementary/15 transition-all duration-300 text-sm"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Section divider */}
            <div className="section-divider mx-8 md:mx-16 lg:mx-24 mb-12" />

            {/* ── ARTIST FILTER PILLS ───────────────── */}
            {!loading && artistas.length > 0 && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="px-8 md:px-16 lg:px-24 mb-10"
                >
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setArtistaFiltro(null)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                                ${artistaFiltro === null
                                    ? 'bg-complementary text-white shadow-md shadow-complementary/20'
                                    : 'border border-card-border text-text-muted hover:border-complementary/40 hover:text-text'
                                }`}
                        >
                            Todos
                        </button>
                        {artistas.map((a) => (
                            <button
                                key={a.id}
                                onClick={() => setArtistaFiltro(a.id === artistaFiltro ? null : a.id)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                                    ${artistaFiltro === a.id
                                        ? 'bg-complementary text-white shadow-md shadow-complementary/20'
                                        : 'border border-card-border text-text-muted hover:border-complementary/40 hover:text-text'
                                    }`}
                            >
                                {a.nombre}
                            </button>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* ── GRID ──────────────────────────────── */}
            <section className="relative z-10 px-8 md:px-16 lg:px-24 pb-32">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="glass-card overflow-hidden animate-pulse">
                                    <div className="aspect-square bg-surface-alt" />
                                    <div className="p-5 space-y-2">
                                        <div className="h-3 bg-surface-alt rounded-full w-1/2" />
                                        <div className="h-4 bg-surface-alt rounded-full w-3/4" />
                                        <div className="h-3 bg-surface-alt rounded-full w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <p className="font-display font-700 text-2xl text-text mb-2">
                                {search || artistaFiltro ? 'Ninguna canción encontrada' : 'Nada por aquí aún'}
                            </p>
                            <p className="text-text-muted">
                                {search ? `No hay resultados para "${search}"` : 'Vuelve pronto.'}
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {(search || artistaFiltro) && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-text-muted/70 text-sm mb-8"
                                >
                                    {filtered.length} canción{filtered.length !== 1 && 'es'}
                                    {search && ` para "${search}"`}
                                </motion.p>
                            )}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filtered.map((c, i) => (
                                    <CardSong key={c.id} cancion={c} index={i} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    )
}
