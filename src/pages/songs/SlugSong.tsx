import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// @ts-ignore
import { supabase } from '../../lib/supabase'
// @ts-ignore
import { getImage } from '../../lib/cloudinary'
import {
    ArrowLeft, ExternalLink, Music
} from 'lucide-react'

/* ── Types ────────────────────────────────────── */
interface Artista {
    id: number
    nombre: string
    descripcion: string | null
    foto_url: string | null
    url_spotify: string | null
    url_instagram: string | null
    url_youtube: string | null
    url_tiktok: string | null
    url_sitio_web: string | null
}

interface Cancion {
    id: number
    nombre: string
    artista_id: number | null
    descripcion: string | null
    descripcion_corta: string | null
    creditos: string | null
    foto_url: string | null
    url_tiktok: string | null
    url_spotify: string | null
    url_youtube: string | null
    artistas?: Artista | null
}

const platformLinks = (c: Cancion) => [
    { url: c.url_spotify, label: 'Spotify' },
    { url: c.url_youtube, label: 'YouTube' },
    { url: c.url_tiktok, label: 'TikTok' },
].filter((l) => !!l.url)

export default function SlugSong() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [cancion, setCancion] = useState<Cancion | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        const fetch = async () => {
            const { data } = await supabase
                .from('canciones')
                .select('*, artistas(*)')
                .eq('id', id)
                .single()
            if (!data) { navigate('/canciones', { replace: true }); return }
            setCancion(data)
            setLoading(false)
        }
        fetch()
    }, [id, navigate])

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-text-muted font-semibold animate-pulse">Cargando...</div>
            </main>
        )
    }
    if (!cancion) return null

    const imgUrl = getImage(cancion.foto_url, { width: 900, height: 900, mode: 'fill' })
    const artistaImgUrl = getImage(cancion.artistas?.foto_url ?? null, { width: 600, height: 600, mode: 'fill' })
    const platforms = platformLinks(cancion)

    return (
        <main className="relative overflow-x-hidden">
            {/* ── HERO ─────────────────────────────────── */}
            <section className="relative min-h-[80vh] flex items-end px-8 md:px-16 lg:px-24 pb-20 overflow-hidden">
                {/* Full-bleed cover image */}
                {imgUrl && (
                    <>
                        <div
                            className="absolute inset-0 bg-center bg-cover"
                            style={{ backgroundImage: `url(${imgUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20 dark:from-[#11181b] dark:via-[#11181b]/70 dark:to-[#11181b]/25" />
                    </>
                )}

                {/* Fallback orbs */}
                {!imgUrl && (
                    <>
                        <div className="absolute top-20 right-[10%] w-80 h-80 rounded-full bg-primary-light/15 blur-3xl animate-float pointer-events-none" />
                        <div className="absolute bottom-20 left-[15%] w-96 h-96 rounded-full bg-complementary/10 blur-3xl animate-float-delayed pointer-events-none" />
                    </>
                )}

                {/* Back */}
                <Link
                    to="/canciones"
                    className="absolute top-8 left-8 md:left-16 lg:left-24 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors z-10"
                >
                    <ArrowLeft size={15} />
                    Canciones
                </Link>

                {/* Content */}
                <div className="relative z-10 max-w-4xl w-full">
                    {cancion.artistas && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                to={`/artistas/${cancion.artistas.id}`}
                                className="inline-flex items-center gap-2 text-complementary text-xs font-semibold tracking-[0.25em] uppercase mb-3 hover:opacity-80 transition-opacity"
                            >
                                <Music size={13} />
                                {cancion.artistas.nombre}
                            </Link>
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-display font-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
                    >
                        <span className="gradient-text">{cancion.nombre}</span>
                    </motion.h1>

                    {/* Platform links */}
                    {platforms.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex flex-wrap gap-2"
                        >
                            {platforms.map((p) => (
                                <a
                                    key={p.label}
                                    href={p.url!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold
                                        bg-black/30 backdrop-blur-sm text-white border border-white/20
                                        hover:bg-complementary hover:border-complementary transition-all duration-300"
                                >
                                    <ExternalLink size={11} />
                                    {p.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ── SONG INFO ────────────────────────────── */}
            <section className="px-8 md:px-16 lg:px-24 py-16">
                <div className="max-w-3xl mx-auto">
                    {/* Descripción corta */}
                    {cancion.descripcion_corta && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-text text-xl sm:text-2xl leading-relaxed font-medium mb-10"
                        >
                            {cancion.descripcion_corta}
                        </motion.p>
                    )}

                    {/* Descripción larga */}
                    {cancion.descripcion && (
                        <div className="mb-10">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-3 block"
                            >
                                Sobre la canción
                            </motion.span>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-text-muted text-base leading-relaxed"
                            >
                                {cancion.descripcion}
                            </motion.p>
                        </div>
                    )}

                    {/* Créditos */}
                    {cancion.creditos && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="glass-card p-6"
                        >
                            <span className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-3 block">
                                Créditos
                            </span>
                            <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
                                {cancion.creditos}
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ── ARTIST SECTION ───────────────────────── */}
            {cancion.artistas && (
                <>
                    <div className="section-divider mx-8 md:mx-16 lg:mx-24" />

                    <section className="px-8 md:px-16 lg:px-24 py-16 pb-32">
                        <div className="max-w-4xl mx-auto">
                            <motion.span
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-6 block"
                            >
                                El artista
                            </motion.span>

                            <Link to={`/artistas/${cancion.artistas.id}`} className="group block">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="glass-card overflow-hidden md:flex"
                                >
                                    {/* Artist photo */}
                                    <div className="md:w-64 lg:w-80 flex-shrink-0">
                                        {artistaImgUrl ? (
                                            <img
                                                src={artistaImgUrl}
                                                alt={cancion.artistas.nombre}
                                                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-64 bg-complementary/10 flex items-center justify-center">
                                                <span className="font-display font-900 text-6xl text-complementary/30">
                                                    {cancion.artistas.nombre.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Artist info */}
                                    <div className="p-8 md:p-10 flex flex-col justify-center">
                                        <h2 className="font-display font-800 text-3xl sm:text-4xl text-text group-hover:text-complementary transition-colors duration-300 mb-4 leading-tight">
                                            {cancion.artistas.nombre}
                                        </h2>
                                        {cancion.artistas.descripcion && (
                                            <p className="text-text-muted text-base leading-relaxed line-clamp-3 mb-6">
                                                {cancion.artistas.descripcion}
                                            </p>
                                        )}
                                        <span className="inline-flex items-center gap-2 text-complementary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                            Ver perfil completo
                                            <ArrowLeft size={15} className="rotate-180" />
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    </section>
                </>
            )}
        </main>
    )
}
