import React, { useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

import { FaCalendar, FaUser } from "react-icons/fa";

import parse from "html-react-parser";

function CustomizableCard({
    $id,
    $createdAt,
    title,
    featuredImage,
    author,
    fontSize,
    flexDirection,
    smallImageHeight = false,
}) {
    const dateObj = new Date($createdAt);
    const addedOn = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;

    return (
        <Link to={`/post/${$id}`}>
            {/* <article
                className={`bg-white shadow-lg overflow-hidden duration-300 hover:shadow-xl ${className}`}
            >
                <div className={`${widthFull ? "md:w-full" : "w-[30%]"}`}>
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="block object-cover w-full h-[110px] md:h-auto"
                    />
                </div>

                <div className={`p-4 ${widthFull ? "md:w-full" : "w-[70%]"}`}>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1 md:text-xl">
                        {title}
                    </h3>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <FaUser />
                        <p>{author}</p>
                        <FaCalendar />
                        <p>{addedOn}</p>
                    </div>
                </div>
            </article> */}

            <article
                className={`flex ${
                    flexDirection === "row"
                        ? "items-center gap-4"
                        : "flex-col justify-center"
                } border border-red-500 my-4`}
            >
                <div
                    className={` ${flexDirection === "row" ? "w-[30%]" : ""} ${
                        smallImageHeight ? "md:h-[150px]" : "md:h-[230px]"
                    }`}
                >
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="block h-full w-full"
                    />
                </div>

                <div
                    className={`grow flex items-center text-slate-800 bg-white border border-blue-500 ${
                        flexDirection === "row" ? "w-[70%]" : ""
                    }`}
                >
                    <div className="p-2">
                        <h2 className="font-semibold">{title}</h2>
                        <div className="flex items-center gap-2 text-[12px] text-slate-600 font-semibold">
                            <FaUser />
                            <p>{author}</p>
                            <FaCalendar />
                            <p>{addedOn}</p>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default CustomizableCard;
