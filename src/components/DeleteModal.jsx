import React from "react";
import { MdClose } from "react-icons/md";

function DeleteModal({ onCancel, onPostDelete }) {
    const handleDelete = () => {
        onPostDelete();
        onCancel();
    };

    return (
        <div className="fixed inset-0 z-[55] flex items-center justify-center before:absolute before:inset-0 before:z-[60] before:inset-0 before:bg-black before:opacity-80">
            <article className="bg-white absolute z-[100] p-8 rounded-lg">
                <button onClick={onCancel} className="absolute top-2 right-2">
                    <MdClose className="text-2xl font-bolder text-slate-800" />
                </button>
                <h1 className="text-slate-800 text-xl font-bold my-4">
                    This post will be deleted Permanently!
                </h1>
                <div className="space-x-4">
                    <button
                        onClick={handleDelete}
                        className="border border-red-500 duration-300 rounded-lg px-4 py-2 text-red-500 hover:bg-red-500 hover:text-red-100"
                    >
                        Delete Permanently
                    </button>
                    <button
                        onClick={onCancel}
                        className="border border-green-500 duration-300 px-4 py-2 rounded-lg text-green-500 hover:bg-green-500 hover:text-green-100"
                    >
                        Cancel
                    </button>
                </div>
            </article>
        </div>
    );
}

export default DeleteModal;
