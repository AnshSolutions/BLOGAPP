import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    { label, type = "text", className = "", ...props },
    ref
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="inline-block font-bold text-slate-800 tracking-wider md:text-lg"
                >
                    {label}
                </label>
            )}
            <input
                className={`px-3 py-2 text-black outline-none bg-gray-100 focus:bg-gray-200 duration-200 w-full ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
