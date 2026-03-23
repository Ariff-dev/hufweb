import { motion } from 'motion/react'

const steps = [
    { num: '01', title: 'Menos de 500K oyentes', desc: 'El límite no es arbitrario. Es el punto donde un artista todavía no tiene el empuje suficiente para cruzar fronteras por su cuenta.' },
    { num: '02', title: 'Que no esté llegando', desc: 'No importa si es de México o de cualquier otro país. Lo que importa es que su música merece más alcance del que tiene.' },
    { num: '03', title: 'Que me mueva algo', desc: 'No hay fórmula. Si escucho una canción y siento que tengo que compartirla, eso es suficiente para que entre a HUF.' },
]

const stats = [
    { value: '32', label: 'Países de origen' },
    { value: '< 500K', label: 'Oyentes mensuales máx.' },
    { value: '∞', label: 'Música por descubrir' },
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
                        Un proyecto personal para la comunidad
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
                        Hay artistas increíbles que no llegan a tus oídos. Este es mi intento de cambiar eso,
                        empezando desde México, pero para cualquiera que quiera escucharlos.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a
                            href="#por-que"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-complementary text-white font-semibold text-base
                         hover:bg-complementary-light transition-all duration-300 hover:shadow-lg hover:shadow-complementary/25 hover:-translate-y-0.5"
                        >
                            <span>¿Por qué existe esto?</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </a>
                        <a
                            href="https://instagram.com/huf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-complementary/30 text-text font-semibold text-base
                         hover:border-complementary hover:bg-complementary/10 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Seguir en Instagram
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
                <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
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

            {/* ─── POR QUÉ / ABOUT ──────────────────── */}
            <section id="por-que" className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
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
                            Por qué existe HUF
                        </motion.span>
                        <motion.h2
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="font-display font-800 text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
                        >
                            Mis artistas
                            <span className="gradient-text"> favoritos</span> no llegan a México
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-text-muted text-lg leading-relaxed mb-6"
                        >
                            Me llamo <strong className="text-text">Ariff</strong> y tengo un problema: muchos de los artistas
                            que me mueven son emergentes y, sin importar de dónde vengan,
                            no tienen el empuje suficiente para llegar a México.
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-text-muted text-lg leading-relaxed"
                        >
                            HUF nació de esa frustración. Mi objetivo empieza en México —que más gente de aquí
                            los descubra—, pero la música no tiene fronteras y este proyecto tampoco.
                            No es un negocio, no es una plataforma. Es un proyecto personal, para la comunidad.
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
                                        <h3 className="font-display font-700 text-text text-lg mb-1">No es un algoritmo, soy yo</h3>
                                        <p className="text-text-muted text-sm">Cada artista que aparece aquí lo escuché, lo pensé y decidí compartirlo. No hay métricas de por medio, solo mi criterio.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-10 h-10 rounded-xl bg-primary-light/15 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-700 text-text text-lg mb-1">Hecho desde México, para el mundo</h3>
                                        <p className="text-text-muted text-sm">Nace en México porque es donde vivo, pero la música no tiene pasaporte. Cualquiera puede descubrir algo nuevo aquí, sin importar de dónde sea.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 w-10 h-10 rounded-xl bg-complementary-lightest/15 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-complementary-lightest"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-700 text-text text-lg mb-1">La comunidad lo hace crecer</h3>
                                        <p className="text-text-muted text-sm">Si tú también tienes un artista que sientes que el mundo necesita escuchar, este es tu espacio. HUF lo construimos entre todos.</p>
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


            {/* ─── CRITERIOS / HOW IT WORKS ─────────── */}
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
                        Cómo elijo a los artistas
                    </motion.span>
                    <motion.h2
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="font-display font-800 text-4xl sm:text-5xl md:text-6xl text-center mb-6 leading-tight max-w-4xl mx-auto"
                    >
                        Hay tres reglas,
                        <span className="gradient-text"> nada más</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-text-muted text-lg text-center max-w-3xl mx-auto mb-20 leading-relaxed"
                    >
                        No hay comité, no hay patrocinadores ni artistas que paguen para aparecer.
                        Solo tres criterios que aplico cada vez que pienso en compartir a alguien.
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

            {/* ─── CTA / CONTACTO ───────────────────── */}
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
                        Súmate
                    </span>
                    <h2 className="font-display font-800 text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
                        ¿Tienes un artista que
                        <span className="gradient-text"> debería escuchar?</span>
                    </h2>
                    <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Mándame tu recomendación. Si cumple los criterios y me mueve algo, lo comparto.
                        Este proyecto crece con las personas que lo siguen.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:hola@huf.mx"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-complementary text-white font-semibold text-base
                         hover:bg-complementary-light transition-all duration-300 hover:shadow-lg hover:shadow-complementary/25 hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            <span>Escríbeme</span>
                        </a>
                        <a
                            href="https://instagram.com/huf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-complementary/30 text-text font-semibold text-base
                         hover:border-complementary hover:bg-complementary/10 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            <span>Seguir en Instagram</span>
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
                        Hecho con <span className="text-primary-light">♥</span> desde México por Ariff © {new Date().getFullYear()}
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