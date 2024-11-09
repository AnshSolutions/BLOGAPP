import React, { useState } from "react";
import Container from "../container/Container";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "../ProfileButton";

import { FaHome } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { MdAddCircle, MdClose, MdLogin } from "react-icons/md";
import MobileMenu from "../mobile_menu/MobileMenu";

function Header() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: "Home",
            icon: <FaHome />,
            slug: "/",
            active: true,
        },
        {
            name: "All blogs",
            icon: <FaList />,
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add",
            icon: <MdAddCircle />,
            slug: "/add-post",
            active: authStatus,
        },
        {
            name: "Login",
            icon: <MdLogin />,
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Sign Up",
            slug: "/signup",
            active: !authStatus,
        },
    ];

    return (
        <header className="sticky top-0 left-0 w-full shadow-md z-50 bg-white">
            <Container>
                <nav className="flex items-center min-h-[80px] max-w-[1200px] mx-auto">
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    <div
                        className={`fixed top-0 left-0 -translate-x-[200%] w-full h-screen bg-white z-50 duration-500 ease-in-out ${
                            mobileMenu ? "translate-x-0" : ""
                        } md:hidden`}
                    >
                        <button
                            onClick={() => setMobileMenu(false)}
                            className="text-2xl absolute top-7 right-7"
                        >
                            <MdClose />
                        </button>
                        <MobileMenu
                            menuItems={navItems}
                            onClick={setMobileMenu}
                        />
                    </div>

                    <ul className="hidden ml-auto gap-10 items-center md:flex">
                        {navItems.map((item) =>
                            item.active ? (
                                <li
                                    key={item.name}
                                    className="group text-slate-800 font-semibold"
                                >
                                    {item.name !== "Sign Up" ? (
                                        <Link
                                            to={item.slug}
                                            className="group flex items-center gap-1 duration-300 group-hover:text-[#29ca8e]"
                                        >
                                            {item.icon ? item.icon : null}
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={item.slug}
                                            className="px-6 py-4 bg-[#29ca8e] text-white font-normal rounded-lg duration-300 group-hover:bg-[#156748]"
                                        >
                                            Sign Up
                                        </Link>
                                    )}
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li>
                                <ProfileButton />
                            </li>
                        )}
                    </ul>

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="group flex flex-col justify-center items-center ml-auto border duration-300 rounded-full h-10 w-10 active:bg-[#29ca8e] md:hidden"
                    >
                        <span className="block h-[2px] w-5 bg-black duration-300 group-active:bg-white"></span>
                        <span className="block h-[2px] w-5 bg-black duration-300 group-active:bg-white my-1"></span>
                        <span className="block h-[2px] w-5 duration-300 group-active:bg-white bg-black"></span>
                    </button>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
