import React from "react";

function ProfileSkeleton() {
    return (
        <main className="w-[95%] max-w-[1200px] mx-auto py-6 animate-pulse">
            <div>
                <div className="flex items-center gap-6 p-4">
                    <div className="h-14 w-14 bg-gray-500 rounded-full"></div>
                    <div className="h-7 w-44 bg-gray-500 rounded-lg"></div>
                </div>

                <div className="flex items-center gap-6 p-4">
                    <div className="h-5 w-6 bg-gray-500 rounded"></div>
                    <div className="h-2 w-44 bg-gray-500 rounded-lg"></div>
                </div>
                <div className="flex items-center gap-6 p-4">
                    <div className="h-5 w-6 bg-gray-500 rounded"></div>
                    <div className="h-2 w-32 bg-gray-500 rounded-lg"></div>
                </div>
                <div className="flex items-center gap-6 p-4">
                    <div className="h-5 w-6 bg-gray-500 rounded"></div>
                    <div className="h-2 w-20 bg-gray-500 rounded-lg"></div>
                </div>
            </div>

            <div className="my-4 space-y-4">
                {Array.from({ length: 4 })
                    .fill("")
                    .map((item, index) => (
                        <div
                            key={index}
                            className="flex rounded-lg overflow-hidden shadow-lg gap-4"
                        >
                            <div className="w-[30%] h-[120px] overflow-hidden md:h-[150px] md:w-[20%] bg-gray-500"></div>
                            <div className="flex items-center">
                                <div className="space-y-2">
                                    <div className="bg-gray-500 h-5 w-32 rounded"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-gray-500 h-3 w-20 rounded"></div>
                                        <div className="bg-gray-500 h-7 w-7 rounded-md"></div>
                                        <div className="bg-gray-500 h-7 w-7 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </main>
    );
}

export default ProfileSkeleton;
