import React from "react";

function GridSkeleton() {
    return (
        <main className="animate-pulse w-[95%] max-w-[1200px] mx-auto py-6">
            <div className="h-6 w-[140px] bg-gray-500 rounded-lg my-4"></div>

            <div className="sm:grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
                {Array.from({ length: 6 })
                    .fill("")
                    .map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-500 h-[180px] rounded-lg my-4 sm:my-0 sm:h-[240px]"
                        ></div>
                    ))}
            </div>
        </main>
    );
}

export default GridSkeleton;
