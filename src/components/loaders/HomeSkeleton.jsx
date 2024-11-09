import React from "react";

function HomeSkeleton() {
    return (
        <main className="animate-pulse">
            <div className="h-[50vh] sm:h-[70vh] md:h-screen bg-gray-800 flex items-center">
                <div className="ml-[18%] md:ml-[12%]">
                    <div className="h-6 w-[200px] bg-gray-400 rounded-lg md:h-12 md:w-[300px]"></div>
                    <div className="flex items-center gap-2 my-4 md:my-8">
                        <div className="h-6 w-6 bg-gray-400 rounded-full md:h-8 md:w-8"></div>
                        <div className="h-4 w-[100px] bg-gray-400 rounded-lg md:h-6 md:w-[150px]"></div>
                    </div>
                    <div className="h-8 w-[110px] bg-gray-400 rounded-full md:h-10 md:w-[150px]"></div>
                </div>
            </div>

            <div className="p-4 w-[98%] max-w-[1200px] mx-auto">
                <div className="h-6 w-[180px] bg-gray-800 my-4 rounded-lg"></div>

                <div className="w-full gap-4 md:max-h-[700px] md:grid md:grid-cols-4 md:grid-rows-2">
                    {Array.from({ length: 4 })
                        .fill("")
                        .map((item, index) => (
                            <div
                                key={index}
                                className={`rounded-lg bg-gray-800 h-[180px] first-of-type:col-span-2 first-of-type:row-span-2 ${
                                    index === 1 ? "col-span-2" : ""
                                } my-4 sm:h-[250px] md:my-0 md:min-h-[200px] md:first-of-type:h-full`}
                            ></div>
                        ))}
                </div>
            </div>
        </main>
    );
}

export default HomeSkeleton;
