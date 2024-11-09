import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";
import { MdLogout } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ className = "" }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        setIsLoggingOut(true);
        authService
            .logout()
            .then(() => {
                dispatch(logout());
                navigate("/");
            })
            .finally(() => setIsLoggingOut(false));
    };
    return (
        <button className={className} onClick={logoutHandler}>
            {!isLoggingOut ? (
                <>
                    <MdLogout className="text-2xl" />
                    Logout
                </>
            ) : (
                <>
                    <CgSpinner className="animate-spin text-2xl md:text-sm" />
                    Logging out...
                </>
            )}
        </button>
    );
}

export default LogoutBtn;
