import { Outlet } from "react-router-dom"
import Navbar from "./features/Navbar"


const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout
