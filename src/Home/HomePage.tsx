import { motion } from 'motion/react'

/* ── Data ─────────────────────────────────────── */
const artists = [
    { name: 'Lael Neale', genre: 'Indie / Lo-Fi', listeners: '120k', img: '/images/artists/artist_1.png' },
    { name: 'Nana Adjoa', genre: 'Alt R&B / Soul', listeners: '45k', img: '/images/artists/artist_2.png' },
    { name: 'Dijon', genre: 'Indie Soul', listeners: '380k', img: '/images/artists/artist_3.png' },
    { name: 'Say She She', genre: 'Disco / Funk', listeners: '90k', img: '/images/artists/artist_4.png' },
]

const steps = [
    { num: '01', title: 'Descubrimos', desc: 'Buscamos artistas emergentes con menos de 500K oyentes mensuales que merezcan ser escuchados.' },
    { num: '02', title: 'Compartimos', desc: 'Creamos contenido y reseñas para dar visibilidad a su música en la comunidad hispanohablante.' },
    { num: '03', title: 'Conectamos', desc: 'Unimos oyentes mexicanos con artistas internacionales para acelerar su llegada a México.' },
]

const stats = [
    { value: '500+', label: 'Artistas descubiertos' },
    { value: '32', label: 'Países representados' },
    { value: '< 500K', label: 'Oyentes mensuales máx.' },
    { value: '∞', label: 'Música por compartir' },
]

/* ── Animation variants ───────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
}

/* ── Component ────────────────────────────────── */
export default function HomePage() {
    return (
        <main className="overflow-x-hidden">
            {/* ─── HERO ─────────────────────────────── */}
            <section id="inicio" className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-24">
                {/* Floating orbs */}
                <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-complementary/15 dark:bg-complementary/10 blur-3xl animate-float pointer-events-none" />
                <div className="absolute bottom-32 right-[15%] w-96 h-96 rounded-full bg-primary-light/10 dark:bg-primary-light/8 blur-3xl animate-float-delayed pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-complementary-light/8 dark:bg-complementary-light/5 blur-[120px] animate-pulse-glow pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-complementary dark:text-complementary font-medium tracking-[0.3em] uppercase text-sm mb-6"
                    >
                        Música que merece ser escuchada
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="font-display font-900 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-8"
                    >
                        <span className="gradient-text">HAZTE</span>
                        <br />
                        <span className="text-text">UN FAVOR</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Descubre artistas emergentes de todo el mundo con menos de 500K oyentes mensuales.
                        Conecta con la música que aún no encuentras en los algoritmos.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a
                            href="#artistas"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-complementary text-white font-semibold text-base
                         hover:bg-complementary-light transition-all duration-300 hover:shadow-lg hover:shadow-complementary/25 hover:-translate-y-0.5"
                        >
                            <span>Explorar Artistas</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </a>
                        <a
                            href="#mision"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-complementary/30 text-text font-semibold text-base
                         hover:border-complementary hover:bg-complementary/10 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Nuestra Misión
                        </a>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-text-muted/40 flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-1.5 rounded-full bg-complementary" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ─── STATS BAR ────────────────────────── */}
            <div className="section-divider mx-auto max-w-4xl" />
            <section className="py-16 px-8 md:px-16 lg:px-24">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="text-center"
                        >
                            <p className="font-display font-800 text-4xl md:text-5xl gradient-text mb-2">{s.value}</p>
                            <p className="text-text-muted text-sm">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            <div className="section-divider mx-auto max-w-4xl" />

            {/* ─── MISIÓN / ABOUT ───────────────────── */}
            <section id="mision" className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.span
                            variants={fadeUp}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-4 block"
                        >
                            Nuestra Misión
                        </motion.span>
                        <motion.h2
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="font-display font-800 text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
                        >
                            La música no tiene
                            <span className="gradient-text"> fronteras</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-text-muted text-lg leading-relaxed mb-6"
                        >
                            Hay artistas increíbles en todo el mundo que no llegan a tus oídos porque los algoritmos
                            solo impulsan lo masivo. HUF nace para cambiar eso — para que descubras a esos artistas
                            que se convertirán en tus favoritos.
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-text-muted text-lg leading-relaxed"
                        >
                            Soy <strong className="text-text">Ariff Martínez</strong>, y la mayoría de mis artistas
                            favoritos son internacionales. Al ser medianos o emergentes, rara vez vienen a México.
                            Mi sueño es que más mexicanos los conozcan, los escuchen, y juntos aceleremos el día
                            en que digan: <em className="text-primary-light">"México, ¡allá vamos!"</em>
                        </motion.p>
                    </div>

                    <motion.div
                        variants={scaleIn}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="glass-card p-8 md:p-10">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-10 h-10 rounded-xl bg-complementary/15 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-complementary"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-700 text-text text-lg mb-1">Artistas Emergentes</h3>
                                        <p className="text-text-muted text-sm">Curamos artistas con menos de 500K oyentes mensuales que están creando algo especial.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-10 h-10 rounded-xl bg-primary-light/15 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-700 text-text text-lg mb-1">Alcance Global</h3>
                                        <p className="text-text-muted text-sm">Conectamos oyentes mexicanos con artistas de todo el mundo que aún no han cruzado fronteras.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-10 h-10 rounded-xl bg-complementary-lightest/15 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-complementary-lightest"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-700 text-text text-lg mb-1">Comunidad</h3>
                                        <p className="text-text-muted text-sm">Construimos una comunidad de personas que creen que la buena música merece ser escuchada, sin importar las cifras.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-light/20 blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-complementary/15 blur-2xl pointer-events-none" />
                    </motion.div>
                </div>
            </section>

            {/* ─── FEATURED ARTISTS ─────────────────── */}
            <section id="artistas" className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <motion.span
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-4 block text-center"
                    >
                        Artistas Destacados
                    </motion.span>
                    <motion.h2
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="font-display font-800 text-4xl sm:text-5xl md:text-6xl text-center mb-4 leading-tight"
                    >
                        Conoce a quienes
                        <span className="gradient-text"> deberías escuchar</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-text-muted text-lg text-center max-w-2xl mx-auto mb-16"
                    >
                        Una selección curada de artistas emergentes que están redefiniendo la música desde cada rincón del mundo.
                    </motion.p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {artists.map((a, i) => (
                            <motion.div
                                key={a.name}
                                custom={i}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="glass-card overflow-hidden group cursor-pointer"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={a.img}
                                        alt={a.name}
                                        className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                                        <div className="w-14 h-14 rounded-full bg-primary-light/90 flex items-center justify-center shadow-lg shadow-primary-light/30 hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-display font-700 text-text text-lg mb-1">{a.name}</h3>
                                    <p className="text-complementary text-sm font-medium mb-2">{a.genre}</p>
                                    <div className="flex items-center gap-1.5 text-text-muted text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                        <span>{a.listeners} oyentes/mes</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── MANIFIESTO / HOW IT WORKS ────────── */}
            <section id="manifiesto" className="py-24 md:py-32 px-8 md:px-16 lg:px-24 relative">
                {/* Bg glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-complementary/8 blur-[140px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.span
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-4 block text-center"
                    >
                        Manifiesto
                    </motion.span>
                    <motion.h2
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="font-display font-800 text-4xl sm:text-5xl md:text-6xl text-center mb-6 leading-tight max-w-4xl mx-auto"
                    >
                        La falta de presupuesto no define el
                        <span className="gradient-text"> talento</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-text-muted text-lg text-center max-w-3xl mx-auto mb-20 leading-relaxed"
                    >
                        Hay artistas que no tienen el presupuesto, el tiempo, el contenido o el apoyo para darse a conocer.
                        Pero su música habla por sí sola. Nuestro trabajo es asegurarnos de que alguien la escuche.
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.num}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                className="glass-card p-8 text-center relative group"
                            >
                                <div className="font-display font-900 text-6xl gradient-text opacity-30 group-hover:opacity-60 transition-opacity duration-500 mb-4">
                                    {s.num}
                                </div>
                                <h3 className="font-display font-700 text-2xl text-text mb-3">{s.title}</h3>
                                <p className="text-text-muted leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA / CONTACT ────────────────────── */}
            <section id="contacto" className="py-24 md:py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-light/15 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-complementary/10 blur-3xl pointer-events-none" />

                <motion.div
                    variants={scaleIn}
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center relative z-10"
                >
                    <span className="text-complementary font-medium tracking-[0.25em] uppercase text-xs mb-4 block">
                        Únete
                    </span>
                    <h2 className="font-display font-800 text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
                        ¿Conoces a un artista que el mundo
                        <span className="gradient-text"> necesita escuchar?</span>
                    </h2>
                    <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Si tienes una recomendación, quieres colaborar, o simplemente conectar — escríbenos.
                        Este proyecto lo construimos entre todos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:hola@huf.mx"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-complementary text-white font-semibold text-base
                         hover:bg-complementary-light transition-all duration-300 hover:shadow-lg hover:shadow-complementary/25 hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            <span>Escríbenos</span>
                        </a>
                        <a
                            href="https://instagram.com/huf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-complementary/30 text-text font-semibold text-base
                         hover:border-complementary hover:bg-complementary/10 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            <span>Instagram</span>
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* ─── FOOTER ───────────────────────────── */}
            <footer className="py-12 px-8 md:px-16 lg:px-24 border-t border-card-border">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="font-display font-900 text-2xl gradient-text">HUF</span>
                        <span className="text-text-muted text-sm">Hazte un favor</span>
                    </div>
                    <p className="text-text-muted text-sm text-center">
                        Hecho con <span className="text-primary-light">♥</span> desde México © {new Date().getFullYear()}
                    </p>
                    <div className="flex gap-4">
                        <a href="https://instagram.com/huf" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-complementary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                        <a href="https://tiktok.com/@huf" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-complementary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" /><path d="M10 12a3 3 0 1 0 3 3V6c.3 1.8 1.7 3 3.5 3" /></svg>
                        </a>
                        <a href="https://twitter.com/huf" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-complementary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    )
}
