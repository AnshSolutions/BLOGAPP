import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();

    const authStatus = useSelector((state) => state.auth.status);

    const footerLinks = [
        {
            name: "Home",
            path: "/",
            active: true,
        },
        {
            name: "All Blogs",
            path: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            path: "/add-post",
            active: authStatus,
        },
        {
            name: "See Profile",
            path: "/profile",
            active: authStatus,
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus,
        },
        {
            name: "Create Account",
            path: "/signup",
            active: !authStatus,
        },
    ];

    const socialLinks = [
        {
            name: "Github",
            path: "https://github.com/AnshSolutions",
            icon: <FaGithub />,
        },
        {
            name: "linkedin",
            path: "https://www.linkedin.com/in/ansh-kumar-5a40a3249/",
            icon: <FaLinkedinIn />,
        },
        {
            name: "twitter",
            path: "https://twitter.com",
            icon: <FaXTwitter />,
        },
    ];
    return (
        <footer className="p-4 bg-[#0c1a33]">
            <section className="w-[95%] max-w-[1200px] mx-auto">
                <div className="space-y-10 md:space-y-0 md:flex md:justify-between md:gap-4 md:my-4">
                    <article>
                        <div className="space-y-3">
                            <Link to="/" className="inline-block">
                                <Logo />
                            </Link>
                            <p className="text-white text-sm font-semibold font-mono">
                                Explore and create amazing blog posts!!!
                            </p>
                        </div>
                    </article>

                    <article>
                        <nav>
                            <h2 className="text-white font-bold text-lg border-l-[4px] border-[#2a59ae] pl-4">
                                Quick Links
                            </h2>
                            <ul className="my-4">
                                {footerLinks.map((item) =>
                                    item.active ? (
                                        <Link key={item.name} to={item.path}>
                                            <li className="text-gray-400 duration-300 px-4 py-2 text-sm hover:text-gray-300 hover:translate-x-2 md:text-md">
                                                {item.name}
                                            </li>
                                        </Link>
                                    ) : null
                                )}
                            </ul>
                        </nav>
                    </article>

                    <article>
                        <nav>
                            <h2 className="text-white font-bold text-lg border-l-[4px] border-[#2a59ae] pl-4">
                                Socials
                            </h2>
                            <h2 className="text-white font-semibold text-sm my-2">
                                Follow on Social Media
                            </h2>
                            <ul className="flex gap-4 my-4">
                                {socialLinks.map((item) => (
                                    <div key={item.name} className="group">
                                        <a
                                            href={item.path}
                                            target="_blank"
                                            className="inline-block border rounded-lg p-2 duration-300 group-hover:bg-white"
                                        >
                                            <i className="text-white duration-300 group-hover:text-[#0c1a33]">
                                                {item.icon}
                                            </i>
                                        </a>
                                    </div>
                                ))}
                            </ul>
                        </nav>
                    </article>
                </div>

                <div>
                    <p className="text-gray-600">
                        <span>&copy;</span>
                        {currentYear} BlissFulBlogger. All rights reserved.
                    </p>
                </div>
            </section>
        </footer>
    );
}

export default Footer;
