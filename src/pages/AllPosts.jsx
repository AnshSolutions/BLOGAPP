import React from "react";
import appwriteService from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "../components/PostCard";
import Animate from "../components/Animate";
import GridSkeleton from "../components/loaders/GridSkeleton";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService
            .getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                    setLoading(false);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return !loading ? (
        <Animate className="w-[95%] max-w-[1200px] mx-auto py-8">
            {posts ? (
                <>
                    <div className="border-l-8 border-[#29ca8e] px-2">
                        <h1 className="text-xl font-bold text-slate-800 my-4 md:text-2xl">
                            All Blog Posts
                        </h1>
                    </div>
                    <div className="sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                {...post}
                                className="rounded-lg my-4 h-[200px] sm:my-0 sm:h-[240px]"
                            />
                        ))}
                    </div>
                </>
            ) : (
                <h1 className="text-slate-800 text-2xl">No Posts</h1>
            )}
        </Animate>
    ) : (
        <GridSkeleton />
    );
}

export default AllPosts;
