import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/home/HomePage'

// Auth Store
import { useAuthStore } from './context/AuthContext'

// Protected Route and Admin Pages
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminArtist from './pages/admin/AdminArtist'
import AdminSongs from './pages/admin/AdminSongs'

function App() {
    const initialize = useAuthStore((s) => s.initialize)

    useEffect(() => {
        const unsubscribe = initialize()
        return unsubscribe
    }, [initialize])

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes with Navbar */}
                <Route element={<><Navbar /><Outlet /></>}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/artistas" element={<PlaceholderPage title="Artistas" />} />
                    <Route path="/redes" element={<PlaceholderPage title="Redes Sociales" />} />
                </Route>

                {/* Admin login without Navbar */}
                <Route path="/admin/login" element={<Login />} />

                {/* Protected Admin routes without public Navbar */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="artistas" element={<AdminArtist />} />
                    <Route path="canciones" element={<AdminSongs />} />
                </Route>
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
