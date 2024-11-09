import React from "react";

const PostSkeleton = () => {
    return (
        <div className="animate-pulse py-10 max-w-[1250px] mx-auto md:flex md:flex-wrap grow">
            <div className="grow p-4 md:w-[70%] lg:w-[75%] xl:w-[77%]">
                <div className="h-10 w-[50%] bg-gray-400 rounded-md mb-8"></div>

                <div className="flex gap-4 flex-wrap mb-4">
                    <div className="h-6 w-[100px] bg-gray-400 rounded-md"></div>
                    <div className="flex gap-2">
                        <div className="h-6 w-6 bg-gray-400 rounded-md"></div>
                        <div className="h-6 w-20 bg-gray-400 rounded-md"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-6 w-6 bg-gray-400 rounded-md"></div>
                        <div className="h-6 w-20 bg-gray-400 rounded-md"></div>
                    </div>
                </div>
                <div className="w-full bg-gray-400 mb-6 h-[350px] md:h-[500px] rounded-lg"></div>

                {Array.from({ length: 3 })
                    .fill("")
                    .map((el, index) => (
                        <div key={index} className="my-6">
                            <div className="bg-gray-400 h-4 w-[95%] rounded-md my-4 md:h-6"></div>
                            <div className="bg-gray-400 h-4 w-[95%] rounded-md my-4 md:h-6"></div>
                            <div className="bg-gray-400 h-4 w-[80%] rounded-md my-4 md:h-6"></div>
                        </div>
                    ))}
            </div>

            <div className="px-4 pt-[50px] md:w-[30%] lg:w-[25%] xl:w-[23%]">
                <div className="bg-gray-400 h-4 w-[100px] rounded-md mb-4"></div>
                <div className="flex flex-wrap gap-2 mb-10">
                    <div className="h-6 w-10 bg-gray-400 rounded-full grow"></div>
                    <div className="h-6 w-10 bg-gray-400 rounded-full grow"></div>
                    <div className="h-6 w-20 bg-gray-400 rounded-full grow"></div>
                    <div className="h-6 w-10 bg-gray-400 rounded-full grow"></div>
                    <div className="h-6 w-10 bg-gray-400 rounded-full grow"></div>
                </div>

                <div>
                    <div className="bg-gray-400 h-6 w-[100px] rounded-md"></div>

                    <div className="my-6">
                        {Array.from({ length: 5 })
                            .fill("")
                            .map((el, index) => (
                                <div
                                    key={index}
                                    className="my-6 border overflow-hidden rounded-lg"
                                >
                                    <div className="bg-gray-400 h-[150px] sm:h-[180px] md:my-0"></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostSkeleton;
