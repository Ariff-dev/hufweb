import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
// @ts-ignore
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }: any) => {
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-semibold">Cargando sesion...</div>
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute