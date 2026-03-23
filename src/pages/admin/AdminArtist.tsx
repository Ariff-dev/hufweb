import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
// @ts-ignore
import { supabase } from '../../lib/supabase'
import {
    Plus, X, Pencil, Trash2, Search, ArrowLeft,
    ExternalLink, Instagram
} from 'lucide-react'

/* ── Types ────────────────────────────────────── */
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

type ArtistaForm = Omit<Artista, 'id' | 'created_at'>

const emptyForm: ArtistaForm = {
    nombre: '',
    descripcion: '',
    foto_url: '',
    url_spotify: '',
    url_instagram: '',
    url_facebook: '',
    url_youtube: '',
    url_tiktok: '',
    url_sitio_web: '',
}

/* ── Animations ───────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
}

/* ── Social link helper ───────────────────────── */
const socialFields: { key: keyof ArtistaForm; label: string; placeholder: string }[] = [
    { key: 'url_spotify', label: 'Spotify', placeholder: 'https://open.spotify.com/artist/...' },
    { key: 'url_instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
    { key: 'url_facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
    { key: 'url_youtube', label: 'YouTube', placeholder: 'https://youtube.com/@...' },
    { key: 'url_tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@...' },
    { key: 'url_sitio_web', label: 'Sitio web', placeholder: 'https://...' },
]

/* ── Component ────────────────────────────────── */
export default function AdminArtist() {
    const [artistas, setArtistas] = useState<Artista[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [form, setForm] = useState<ArtistaForm>(emptyForm)
    const [saving, setSaving] = useState(false)

    // Delete confirmation
    const [deleteId, setDeleteId] = useState<number | null>(null)

    /* ── Fetch ─────────────────────────────────── */
    const fetchArtistas = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('artistas')
            .select('*')
            .order('created_at', { ascending: false })
        if (!error && data) setArtistas(data)
        setLoading(false)
    }

    useEffect(() => { fetchArtistas() }, [])

    /* ── Create / Update ──────────────────────── */
    const handleSave = async (formData: FormData) => {
        setSaving(true)
        const payload: Record<string, string> = {}
        for (const [key, value] of formData.entries()) {
            payload[key] = (value as string).trim()
        }

        // Clean empty strings to null
        const clean: Record<string, string | null> = {}
        for (const [k, v] of Object.entries(payload)) {
            clean[k] = v === '' ? null : v
        }

        if (editingId) {
            await supabase.from('artistas').update(clean).eq('id', editingId)
        } else {
            await supabase.from('artistas').insert(clean)
        }

        setSaving(false)
        closeModal()
        fetchArtistas()
    }

    /* ── Delete ────────────────────────────────── */
    const handleDelete = async () => {
        if (!deleteId) return
        await supabase.from('artistas').delete().eq('id', deleteId)
        setDeleteId(null)
        fetchArtistas()
    }

    /* ── Modal helpers ─────────────────────────── */
    const openCreate = () => {
        setForm(emptyForm)
        setEditingId(null)
        setShowModal(true)
    }

    const openEdit = (a: Artista) => {
        setForm({
            nombre: a.nombre,
            descripcion: a.descripcion ?? '',
            foto_url: a.foto_url ?? '',
            url_spotify: a.url_spotify ?? '',
            url_instagram: a.url_instagram ?? '',
            url_facebook: a.url_facebook ?? '',
            url_youtube: a.url_youtube ?? '',
            url_tiktok: a.url_tiktok ?? '',
            url_sitio_web: a.url_sitio_web ?? '',
        })
        setEditingId(a.id)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingId(null)
        setForm(emptyForm)
    }

    /* ── Filtered list ─────────────────────────── */
    const filtered = artistas.filter((a) =>
        a.nombre.toLowerCase().includes(search.toLowerCase())
    )

    /* ── Input class ───────────────────────────── */
    const inputClass =
        'w-full p-3 rounded-xl bg-surface/60 border border-card-border text-text placeholder:text-text-muted/50 focus:outline-none focus:border-complementary/50 focus:ring-2 focus:ring-complementary/15 transition-all duration-300 text-sm'

    return (
        <main className="relative min-h-screen px-8 md:px-16 lg:px-24 py-16 overflow-hidden">
            {/* Floating orbs */}
            <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-complementary/15 dark:bg-complementary/10 blur-3xl animate-float pointer-events-none" />
            <div className="absolute bottom-32 right-[15%] w-96 h-96 rounded-full bg-primary-light/10 dark:bg-primary-light/8 blur-3xl animate-float-delayed pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* ── Header ─────────────────────────── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <Link
                            to="/admin"
                            className="inline-flex items-center gap-1 text-text-muted text-sm hover:text-complementary transition-colors mb-3"
                        >
                            <ArrowLeft size={14} />
                            Dashboard
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="font-display font-800 text-4xl sm:text-5xl leading-tight"
                        >
                            <span className="gradient-text">Artistas</span>
                        </motion.h1>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-complementary text-white font-semibold text-sm
                            hover:bg-complementary-light transition-all duration-300 hover:shadow-lg hover:shadow-complementary/25 hover:-translate-y-0.5"
                    >
                        <Plus size={16} />
                        Agregar artista
                    </motion.button>
                </div>

                {/* ── Search ─────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="relative max-w-md">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50" />
                        <input
                            type="text"
                            placeholder="Buscar artista..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`${inputClass} pl-10`}
                        />
                    </div>
                </motion.div>

                {/* ── Table ──────────────────────────── */}
                {loading ? (
                    <div className="text-center py-20 text-text-muted font-semibold">Cargando artistas...</div>
                ) : filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card p-12 text-center"
                    >
                        <p className="text-text-muted text-lg mb-2">
                            {search ? 'No se encontraron artistas' : 'Aún no hay artistas registrados'}
                        </p>
                        {!search && (
                            <p className="text-text-muted/70 text-sm">
                                Haz clic en "Agregar artista" para empezar.
                            </p>
                        )}
                    </motion.div>
                ) : (
                    <div className="glass-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-card-border">
                                        <th className="px-6 py-4 text-text-muted text-xs font-semibold tracking-wider uppercase">Artista</th>
                                        <th className="px-6 py-4 text-text-muted text-xs font-semibold tracking-wider uppercase hidden md:table-cell">Descripción</th>
                                        <th className="px-6 py-4 text-text-muted text-xs font-semibold tracking-wider uppercase hidden sm:table-cell">Links</th>
                                        <th className="px-6 py-4 text-text-muted text-xs font-semibold tracking-wider uppercase text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((a, i) => (
                                        <motion.tr
                                            key={a.id}
                                            custom={i}
                                            variants={fadeUp}
                                            initial="hidden"
                                            animate="visible"
                                            className="border-b border-card-border/50 last:border-0 hover:bg-surface/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {a.foto_url ? (
                                                        <img
                                                            src={a.foto_url}
                                                            alt={a.nombre}
                                                            className="w-10 h-10 rounded-xl object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-xl bg-complementary/15 flex items-center justify-center text-complementary font-display font-bold text-sm">
                                                            {a.nombre.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="font-semibold text-text">{a.nombre}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <p className="text-text-muted text-sm line-clamp-2 max-w-xs">
                                                    {a.descripcion || '—'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell">
                                                <div className="flex gap-2">
                                                    {a.url_spotify && (
                                                        <a href={a.url_spotify} target="_blank" rel="noopener noreferrer"
                                                            className="text-text-muted hover:text-complementary transition-colors" title="Spotify">
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                    {a.url_instagram && (
                                                        <a href={a.url_instagram} target="_blank" rel="noopener noreferrer"
                                                            className="text-text-muted hover:text-complementary transition-colors" title="Instagram">
                                                            <Instagram size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => openEdit(a)}
                                                        className="p-2 rounded-lg hover:bg-complementary/10 text-text-muted hover:text-complementary transition-all"
                                                        title="Editar"
                                                    >
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(a.id)}
                                                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── Counter ────────────────────────── */}
                {!loading && (
                    <p className="text-text-muted/60 text-xs mt-4 text-right">
                        {filtered.length} artista{filtered.length !== 1 && 's'}
                    </p>
                )}
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* ── ADD / EDIT MODAL ────────────────── */}
            {/* ═══════════════════════════════════════ */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="glass-card p-8 md:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e: any) => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-1">
                                        {editingId ? 'Editar' : 'Nuevo'}
                                    </p>
                                    <h2 className="font-display font-800 text-2xl">
                                        <span className="gradient-text">
                                            {editingId ? 'Editar artista' : 'Agregar artista'}
                                        </span>
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-text"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <form action={handleSave} className="flex flex-col gap-5">
                                {/* Nombre */}
                                <div>
                                    <label className="text-text-muted text-xs font-medium tracking-wide uppercase mb-2 block">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        defaultValue={form.nombre}
                                        placeholder="Nombre del artista"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="text-text-muted text-xs font-medium tracking-wide uppercase mb-2 block">
                                        Descripción
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        defaultValue={form.descripcion ?? ''}
                                        placeholder="Breve descripción del artista..."
                                        rows={3}
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                {/* Foto URL */}
                                <div>
                                    <label className="text-text-muted text-xs font-medium tracking-wide uppercase mb-2 block">
                                        URL de foto
                                    </label>
                                    <input
                                        type="url"
                                        name="foto_url"
                                        defaultValue={form.foto_url ?? ''}
                                        placeholder="https://..."
                                        className={inputClass}
                                    />
                                </div>

                                {/* Divider */}
                                <div className="section-divider my-2" />

                                {/* Social links */}
                                <p className="text-complementary font-medium tracking-[0.25em] uppercase text-xs">
                                    Redes sociales
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {socialFields.map((f) => (
                                        <div key={f.key}>
                                            <label className="text-text-muted text-xs font-medium tracking-wide uppercase mb-2 block">
                                                {f.label}
                                            </label>
                                            <input
                                                type="url"
                                                name={f.key}
                                                defaultValue={(form[f.key] as string) ?? ''}
                                                placeholder={f.placeholder}
                                                className={inputClass}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-6 py-3 rounded-full border-2 border-card-border text-text-muted font-semibold text-sm
                                            hover:border-complementary/30 hover:text-text transition-all duration-300"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-8 py-3 rounded-full bg-complementary text-white font-semibold text-sm
                                            hover:bg-complementary-light transition-all duration-300 hover:shadow-lg hover:shadow-complementary/25
                                            disabled:opacity-50"
                                    >
                                        {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Agregar'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════ */}
            {/* ── DELETE CONFIRMATION ─────────────── */}
            {/* ═══════════════════════════════════════ */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                        onClick={() => setDeleteId(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                            className="glass-card p-8 max-w-sm w-full text-center"
                            onClick={(e: any) => e.stopPropagation()}
                        >
                            <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={22} className="text-red-500" />
                            </div>
                            <h3 className="font-display font-700 text-xl text-text mb-2">¿Eliminar artista?</h3>
                            <p className="text-text-muted text-sm mb-6">
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="px-6 py-3 rounded-full border-2 border-card-border text-text-muted font-semibold text-sm
                                        hover:border-complementary/30 hover:text-text transition-all duration-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold text-sm
                                        hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
