import { motion } from 'motion/react'
// @ts-ignore
import { getImage } from '../lib/cloudinary'
import { Users } from 'lucide-react'

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

interface CardArtistProps {
    artista: Artista
    index?: number
}

export default function CardArtist({ artista, index = 0 }: CardArtistProps) {
    const imgUrl = getImage(artista.foto_url, { width: 600, height: 600, mode: 'fill' })

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: (index % 6) * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card group cursor-pointer overflow-hidden"
        >
            {/* Photo */}
            <div className="relative overflow-hidden aspect-square">
                {imgUrl ? (
                    <img
                        src={imgUrl}
                        alt={artista.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-complementary/10 flex items-center justify-center">
                        <Users size={40} className="text-complementary/40" />
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Info */}
            <div className="p-5">
                <h3 className="font-display font-700 text-lg text-text group-hover:text-complementary transition-colors duration-300 leading-tight mb-1">
                    {artista.nombre}
                </h3>
                {artista.descripcion && (
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                        {artista.descripcion}
                    </p>
                )}

                {/* Social dots */}
                {(artista.url_spotify || artista.url_instagram || artista.url_youtube) && (
                    <div className="flex gap-2 mt-3">
                        {artista.url_spotify && (
                            <a
                                href={artista.url_spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-text-muted/60 hover:text-complementary transition-colors font-medium px-2 py-0.5 rounded-full border border-card-border hover:border-complementary/30"
                            >
                                Spotify
                            </a>
                        )}
                        {artista.url_instagram && (
                            <a
                                href={artista.url_instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-text-muted/60 hover:text-complementary transition-colors font-medium px-2 py-0.5 rounded-full border border-card-border hover:border-complementary/30"
                            >
                                IG
                            </a>
                        )}
                        {artista.url_youtube && (
                            <a
                                href={artista.url_youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs text-text-muted/60 hover:text-complementary transition-colors font-medium px-2 py-0.5 rounded-full border border-card-border hover:border-complementary/30"
                            >
                                YT
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    )
}
