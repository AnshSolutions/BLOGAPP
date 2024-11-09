import React from "react";

function Logo({ className = "" }) {
    return (
        <div
            className={`rounded-tl-2xl rounded-br-2xl p-2 bg-violet-900 ${className}`}
        >
            <h1 className="font-bold text-slate-200">
                <span className="text-[#29ca8e] text-xl md:text-2xl">
                    Blissful
                </span>
                Blogger
            </h1>
        </div>
    );
}

export default Logo;
