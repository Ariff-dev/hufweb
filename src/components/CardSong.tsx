import { motion } from 'motion/react'
// @ts-ignore
import { getImage } from '../lib/cloudinary'
import { Music, ExternalLink } from 'lucide-react'

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

interface CardSongProps {
    cancion: Cancion
    index?: number
}

export default function CardSong({ cancion, index = 0 }: CardSongProps) {
    const imgUrl = getImage(cancion.foto_url, { width: 600, height: 600, mode: 'fill' })

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: (index % 6) * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card group cursor-pointer overflow-hidden"
        >
            {/* Cover */}
            <div className="relative overflow-hidden aspect-square">
                {imgUrl ? (
                    <img
                        src={imgUrl}
                        alt={cancion.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-primary-light/10 flex items-center justify-center">
                        <Music size={40} className="text-primary-light/40" />
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Platform links on hover */}
                {(cancion.url_spotify || cancion.url_youtube || cancion.url_tiktok) && (
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                        {cancion.url_spotify && (
                            <a
                                href={cancion.url_spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-xs text-white font-medium px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-complementary transition-colors"
                            >
                                <ExternalLink size={11} />
                                Spotify
                            </a>
                        )}
                        {cancion.url_youtube && (
                            <a
                                href={cancion.url_youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-xs text-white font-medium px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-complementary transition-colors"
                            >
                                <ExternalLink size={11} />
                                YouTube
                            </a>
                        )}
                        {cancion.url_tiktok && (
                            <a
                                href={cancion.url_tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-xs text-white font-medium px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-complementary transition-colors"
                            >
                                <ExternalLink size={11} />
                                TikTok
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-5">
                {cancion.artistas && (
                    <p className="text-complementary text-xs font-semibold tracking-wider uppercase mb-1">
                        {cancion.artistas.nombre}
                    </p>
                )}
                <h3 className="font-display font-700 text-lg text-text group-hover:text-complementary transition-colors duration-300 leading-tight mb-1">
                    {cancion.nombre}
                </h3>
                {cancion.descripcion_corta && (
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                        {cancion.descripcion_corta}
                    </p>
                )}
            </div>
        </motion.article>
    )
}
