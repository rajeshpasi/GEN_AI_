import { createContext, useEffect, useState } from "react";
import { getProfile } from "./services/auth.api.js";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getProfile()
                setUser(data.user)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUserProfile()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}