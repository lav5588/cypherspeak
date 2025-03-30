import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { getUserSelf, logoutUser } from "@/services/authService";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux-toolkit/slices/authSlice";

interface IUser {
    name: string;
    email: string;
    avatar: string;
    isOnline: boolean;
}

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user); 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserSelf();
                dispatch(setUser(userData));
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        logoutUser();
        dispatch(setUser(null));
    };

    return (
        <nav className="w-full border-b shadow-sm px-6 py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
                Cypher Speak 🤖
            </Link>

            <div className="flex items-center gap-4">
                <Link to="/chats" className="text-sm font-medium">
                    Chats
                </Link>
                <ModeToggle />

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="focus:outline-none">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-9 h-9 rounded-full object-cover border hover:opacity-90 transition"
                                    />
                                ) : (
                                    <User className="w-8 h-8" />
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem disabled>
                                Signed in as <br />
                                <span className="font-medium">{user.email}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>Change Password (coming soon)</DropdownMenuItem>
                            <DropdownMenuItem disabled>Settings (coming soon)</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button variant="outline" className="hidden md:inline-flex" >
                        <Link to="/login">Login</Link>
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
