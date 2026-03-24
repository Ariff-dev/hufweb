import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// @ts-ignore
import { supabase } from '../../lib/supabase'
// @ts-ignore
import { getImage } from '../../lib/cloudinary'
import {
    ArrowLeft, ExternalLink, Instagram, Globe,
    Music, Users
} from 'lucide-react'
import CardSong from '../../components/CardSong'

/* ── Types ────────────────────────────────────── */
interface Cancion {
    id: number
    nombre: string
    descripcion_corta: string | null
    foto_url: string | null
    url_spotify: string | null
    url_youtube: string | null
    url_tiktok: string | null
    artistas?: { id: number; nombre: string } | null
}

interface Artista {
    id: number
    nombre: string
    descripcion: string | null
    foto_url: string | null
    url_spotify: string | null
    url_instagram: string | null
    url_facebook: string | null
    url_youtube: string | null
    url_tiktok: string | null
    url_sitio_web: string | null
    created_at: string
}

const socialLinks = (a: Artista) => [
    { url: a.url_spotify, label: 'Spotify', icon: ExternalLink },
    { url: a.url_instagram, label: 'Instagram', icon: Instagram },
    { url: a.url_youtube, label: 'YouTube', icon: ExternalLink },
    { url: a.url_tiktok, label: 'TikTok', icon: ExternalLink },
    { url: a.url_facebook, label: 'Facebook', icon: ExternalLink },
    { url: a.url_sitio_web, label: 'Sitio web', icon: Globe },
].filter((l) => !!l.url)

export default function SlugArtist() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [artista, setArtista] = useState<Artista | null>(null)
    const [canciones, setCanciones] = useState<Cancion[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        const fetchAll = async () => {
            const [{ data: a }, { data: songs }] = await Promise.all([
                supabase.from('artistas').select('*').eq('id', id).single(),
                supabase
                    .from('canciones')
                    .select('*, artistas(id, nombre)')
                    .eq('artista_id', id)
                    .order('nombre', { ascending: true }),
            ])
            if (!a) { navigate('/artistas', { replace: true }); return }
            setArtista(a)
            if (songs) setCanciones(songs)
            setLoading(false)
        }
        fetchAll()
    }, [id, navigate])

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-text-muted font-semibold animate-pulse">Cargando...</div>
            </main>
        )
    }
    if (!artista) return null

    const imgUrl = getImage(artista.foto_url, { width: 900, height: 900, mode: 'fill' })
    const links = socialLinks(artista)

    return (
        <main className="relative overflow-x-hidden">
            {/* ── HERO ─────────────────────────────────── */}
            <section className="relative min-h-[80vh] flex items-end px-8 md:px-16 lg:px-24 pb-20 overflow-hidden">
                {/* Full bleed background image */}
                {imgUrl && (
                    <>
                        <div
                            className="absolute inset-0 bg-center bg-cover"
                            style={{ backgroundImage: `url(${imgUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20 dark:from-[#11181b] dark:via-[#11181b]/70 dark:to-[#11181b]/25" />
                    </>
                )}

                {/* Fallback orbs when no image */}
                {!imgUrl && (
                    <>
                        <div className="absolute top-20 left-[10%] w-80 h-80 rounded-full bg-complementary/15 blur-3xl animate-float pointer-events-none" />
                        <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-primary-light/10 blur-3xl animate-float-delayed pointer-events-none" />
                    </>
                )}

                {/* Back link */}
                <Link
                    to="/artistas"
                    className="absolute top-8 left-8 md:left-16 lg:left-24 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors z-10"
                >
                    <ArrowLeft size={15} />
                    Artistas
                </Link>

                {/* Content */}
                <div className="relative z-10 max-w-4xl w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-complementary font-medium tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-2"
                    >
                        <Users size={13} />
                        Artista
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-display font-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
                    >
                        <span className="gradient-text">{artista.nombre}</span>
                    </motion.h1>

                    {/* Social pills */}
                    {links.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex flex-wrap gap-2"
                        >
                            {links.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.url!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold
                                        bg-black/30 backdrop-blur-sm text-white border border-white/20
                                        hover:bg-complementary hover:border-complementary transition-all duration-300"
                                >
                                    <l.icon size={12} />
                                    {l.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ── BIO ──────────────────────────────────── */}
            {artista.descripcion && (
                <section className="px-8 md:px-16 lg:px-24 py-16">
                    <div className="max-w-3xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-4 block"
                        >
                            Sobre el artista
                        </motion.span>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-text text-lg sm:text-xl leading-relaxed"
                        >
                            {artista.descripcion}
                        </motion.p>
                    </div>
                </section>
            )}

            {/* ── DIVIDER ──────────────────────────────── */}
            {canciones.length > 0 && (
                <div className="section-divider mx-8 md:mx-16 lg:mx-24 my-4" />
            )}

            {/* ── CANCIONES ────────────────────────────── */}
            {canciones.length > 0 && (
                <section className="px-8 md:px-16 lg:px-24 py-16 pb-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-2 block"
                                >
                                    Discografía
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="font-display font-800 text-3xl sm:text-4xl"
                                >
                                    <span className="gradient-text">Canciones</span>{' '}
                                    <span className="text-text">en HUF</span>
                                </motion.h2>
                            </div>
                            <div className="flex items-center gap-2 text-text-muted">
                                <Music size={16} />
                                <span className="text-sm font-medium">{canciones.length}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {canciones.map((c, i) => (
                                <Link key={c.id} to={`/canciones/${c.id}`}>
                                    <CardSong cancion={c} index={i} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
