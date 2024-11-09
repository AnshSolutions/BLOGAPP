import React from "react";

function Spinner({ className = "h-5 w-5" }) {
    return (
        <div
            className={`animate-spin rounded-full border-t-[#000] border-4 opacity-55 ${className}`}
        ></div>
    );
}

export default Spinner;
