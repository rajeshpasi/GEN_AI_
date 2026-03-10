import { useAuth } from "../hooks/useAuth.js"

export default function LogOut() {
    const { handleLogout } = useAuth()

    return (
        <button className=" button_LogOut primary-button " onClick={handleLogout}>
            Logout
        </button>
    )
}
