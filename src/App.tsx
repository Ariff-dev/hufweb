import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './Home/HomePage'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artistas" element={<PlaceholderPage title="Artistas" />} />
                <Route path="/redes" element={<PlaceholderPage title="Redes Sociales" />} />
            </Routes>
        </BrowserRouter>
    )
}

/* Placeholder for pages not yet built */
function PlaceholderPage({ title }: { title: string }) {
    return (
        <main className="min-h-screen flex items-center justify-center px-8">
            <div className="text-center">
                <h1 className="font-display font-800 text-5xl md:text-6xl mb-4">
                    <span className="gradient-text">{title}</span>
                </h1>
                <p className="text-text-muted text-lg">Próximamente</p>
            </div>
        </main>
    )
}

export default App
