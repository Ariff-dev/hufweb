import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/home/HomePage'
import ArtistsPage from './pages/artists/ArtistsPage'
import SongsPage from './pages/songs/SongsPage'
import SlugArtist from './pages/artists/SlugArtist'
import SlugSong from './pages/songs/SlugSong'

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
                    <Route path="/artistas" element={<ArtistsPage />} />
                    <Route path="/artistas/:id" element={<SlugArtist />} />
                    <Route path="/canciones" element={<SongsPage />} />
                    <Route path="/canciones/:id" element={<SlugSong />} />
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

export default App
