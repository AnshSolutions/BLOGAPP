import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FaBookReader, FaEdit, FaRegClock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./DeleteModal";

function FlexCard({ title, featuredImage, $id, getNumberOfDays, onDelete }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const numberOfDays = getNumberOfDays();

    return (
        <div
            key={featuredImage}
            className="flex my-4 shadow-md shadow-gray-300 overflow-hidden rounded-lg"
        >
            <div className="w-[30%] h-[120px] overflow-hidden md:h-[150px] md:w-[20%]">
                <img
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    className="block w-full h-full object-cover"
                />
            </div>

            <div className="flex items-center w-[80%] p-4 space-y-1">
                <article>
                    <Link
                        to={`/post/${$id}`}
                        className="font-bold text-slate-800 duration-300 hover:text-[#29ca8e] sm:text-lg md:text-xl"
                    >
                        {title}
                    </Link>

                    <div className="flex items-center gap-1 text-slate-500">
                        {numberOfDays > 0 && (
                            <>
                                <FaRegClock />
                                <h2 className="text-sm">
                                    {numberOfDays > 1
                                        ? `${numberOfDays} days ago`
                                        : `${numberOfDays} day ago`}
                                </h2>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4 font-semibold text-sm">
                        <div className="group">
                            <Link
                                to={`/post/${$id}`}
                                className="flex items-center gap-1 text-[#29ca8e] duration-300 group-hover:text-[#187552]"
                            >
                                <FaBookReader className="text-[#29ca8e] duration-300 group-hover:text-[#187552]" />
                                Read Post
                            </Link>
                        </div>

                        <div className="flex items-center overflow-hidden">
                            <button
                                className="inline-block rounded-md group flex items-center border border-[#ff1000] p-2 duration-300 hover:bg-[#ff1000] hover:text-white"
                                onClick={() => setDeleteModal(true)}
                            >
                                <MdDelete className="text-[#ff1000] text-md group-hover:text-white font-semibold" />
                            </button>
                        </div>

                        <Link to={`/edit-post/${$id}`}>
                            <div className="flex items-center rounded-md border border-green-500 p-2 group duration-300 hover:bg-green-500">
                                <FaEdit className="text-[#29ca8e] text-md duration-300 group-hover:bg-green-500 group-hover:text-white" />
                            </div>
                        </Link>
                    </div>
                </article>
            </div>

            {deleteModal && (
                <DeleteModal
                    onCancel={() => setDeleteModal(false)}
                    onPostDelete={onDelete}
                />
            )}
        </div>
    );
}

export default FlexCard;
