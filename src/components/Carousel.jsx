import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FaGreaterThan, FaLessThan, FaUser } from "react-icons/fa";

function Carousel({ posts = [], className = "" }) {
    const [index, setIndex] = useState(0);
    const length = posts?.length;
    const post = { ...posts[index] };

    const handlePrevButton = () => {
        if (index !== 0) {
            setIndex((i) => i - 1);
        } else {
            setIndex(posts.length - 1);
        }
    };

    const handleNextButton = () => {
        if (index !== posts.length - 1) {
            setIndex((i) => i + 1);
        } else {
            setIndex(0);
        }
    };

    useEffect(() => {
        let intervalId;
        if (index >= 0 && index < length) {
            intervalId = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % length);
            }, 5000);
        } else {
            setIndex(0);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [index, length]);

    const psuedoElement =
        "after:absolute after:inset-0 after:bg-black after:opacity-75";

    return (
        <div
            className={`relative h-[50vh] mx-auto overflow-hidden p-4 duration-300 ${className} ${psuedoElement} sm:h-[70vh] md:h-[90vh]`}
        >
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="block object-cover w-full h-full"
                />
            </div>

            <div
                className={`absolute z-10 top-[50%] left-[20%] right-[20%] -translate-y-[50%] md:left-[10%]`}
            >
                <h1 className="text-2xl font-semibold text-white my-5 sm:text-4xl lg:text-5xl">
                    {post.title}
                </h1>

                <div className="text-white text-md flex items-center gap-2 md:text-lg">
                    <FaUser />
                    <h2>{post.author}</h2>
                </div>

                <Link
                    to={`/post/${post.$id}`}
                    className="block border border-white text-sm text-white text-center rounded-full py-2 px-4 my-8 max-w-[100px] duration-300 hover:bg-white hover:text-slate-700 md:max-w-[150px] md:py-3"
                >
                    Read Blog
                </Link>
            </div>

            <button
                className="block rounded-md border h-[100px] border-transparent text-slate-200 p-2 absolute z-10 text-white text-xl top-[50%] left-1 -translate-y-[50%] duration-300 active:bg-slate-200 active:text-black hover:border-slate-200 md:text-2xl md:left-5"
                onClick={handlePrevButton}
            >
                <FaLessThan />
            </button>
            <button
                className="block rounded-md border h-[100px] border-transparent text-slate-200 p-2 absolute z-10 text-white text-xl top-[50%] right-1 -translate-y-[50%] duration-300 hover:border-slate-200 active:bg-slate-200 active:text-black md:text-2xl md:right-5"
                onClick={handleNextButton}
            >
                <FaGreaterThan />
            </button>
        </div>
    );
}

export default Carousel;
