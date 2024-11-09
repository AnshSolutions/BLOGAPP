import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LogoutBtn from "./header/LogoutBtn";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ProfileButton({ className = "" }) {
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state) => state.auth.userData);
    const firstLetter = user.name[0];

    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <div className="flex items-center overflow-hidden h-12 w-12 rounded-lg shadow-md shadow-gray-900 duration-300 hover:-translate-y-[2px]">
                <button
                    className="block w-full h-full font-bold bg-violet-800 text-white"
                    onClick={() => setShowMenu(!showMenu)}
                    data-id
                >
                    {firstLetter}
                </button>
            </div>
            {showMenu && (
                <motion.div
                    className="absolute z-20 bg-white right-0 rounded-lg border min-w-[150px] w-full"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                        },
                    }}
                    exit={{
                        opaciyt: 0,
                    }}
                >
                    <div className="flex items-center gap-4 my-2 group w-full">
                        <Link
                            to="/profile"
                            className="inline-flex w-full p-2 items-center gap-2 text-slate-800 font-semibold duration-150 group-hover:bg-slate-100"
                        >
                            <FaCircleUser />
                            My Profile
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 my-2 group">
                        <LogoutBtn className="flex items-center w-full p-2 gap-2 font-semibold text-slate-800 duration-150 group-hover:bg-slate-100" />
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default ProfileButton;
